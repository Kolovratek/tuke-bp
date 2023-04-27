from django.http import HttpResponse, HttpRequest, HttpResponseBadRequest
from django.db import transaction
from dataset.models import Dataset
from dataset.helpers import parse_file_to_DataFrame
from sklearn.preprocessing import OneHotEncoder, MinMaxScaler
from sklearn.manifold import TSNE
from sklearn.decomposition import PCA
from sklearn.model_selection import train_test_split
from sklearn.datasets import make_classification
import pandas as pd
import numpy as np
import json
import random


class DatasetService:
    @staticmethod
    def get_all():
        datasets = Dataset.objects.all().values('id', 'filename')
        return list(datasets)

    @staticmethod
    def get(dataset_id: int) -> Dataset:
        dataset = Dataset.objects.get(id=dataset_id)
        return dataset

    @staticmethod
    def upload(file, filename) -> Dataset:
        df = parse_file_to_DataFrame(file)
        df['XY'] = 'train'
        data = df.replace({np.nan: None}).to_dict('records')
        dataset = Dataset.objects.create(data=data, filename=filename)
        dataset.save()
        return dataset

    @staticmethod
    def generate_dataset(fileName, n_samples, n_features, n_informative, n_redundant, n_repeated, n_classes, n_clustersPerClass) -> Dataset:
        X, y = make_classification(n_samples=n_samples, n_features=n_features, n_informative=n_informative, n_redundant=n_redundant, n_repeated=n_repeated, n_classes=n_classes, n_clusters_per_class=n_clustersPerClass)
        feature_columns = [f'feature_{i+1}' for i in range(n_features)]
        df = pd.DataFrame(X, columns=feature_columns)
        df['target'] = y
        df['XY'] = 'train'
        data = df.to_dict(orient='records')
        dataset = Dataset.objects.create(data=data, filename=fileName)
        dataset.save()
        return dataset


    @staticmethod
    def delete_dataset(dataset_id: int):
        try:
            dataset = Dataset.objects.get(id=dataset_id)
            dataset.delete()
            return { "status": "success" }
        except Dataset.DoesNotExist:
            return { "status": "error", "message": "Dataset not found" }

    @staticmethod
    def drop_columns(dataset_id: int, columnsToRemove):
        try:
            dataset = Dataset.objects.get(id=dataset_id)
            df = pd.DataFrame(dataset.data)
            df = df.fillna('')
            df = df.drop(columnsToRemove, axis=1)
            data = df.to_dict('records')
            dataset.data = data
            dataset.save()
            res = df.to_json(orient='records')
            return res
        except Dataset.DoesNotExist:
            return { "status": "error", "message": "Dataset not found" }

    
    @staticmethod
    def one_hot_encoding_dataset(dataset_id: int, columns_ohe):
        try:
            dataset = Dataset.objects.get(id=dataset_id)
            df = pd.DataFrame(dataset.data)
            df = df.fillna('')
            columns_ohe = [df.columns.get_loc(columns_ohe)]
            encoder = OneHotEncoder(handle_unknown='ignore')
            columns_to_encode = [columns_ohe] if isinstance(columns_ohe, str) else columns_ohe
            encoder.fit(df.iloc[:, columns_to_encode])
            categories = encoder.categories_[0]
            encoder_df = pd.DataFrame(encoder.transform(df.iloc[:, columns_to_encode]).toarray(), columns=categories)
            df = df.drop(df.columns[columns_ohe], axis=1)
            final_df = pd.concat([df, encoder_df], axis=1)
            if 'special_main' in final_df.columns:
                special_main_col = final_df.pop('special_main')
                final_df['special_main'] = special_main_col
            res = final_df.to_json(orient='records')
            data = final_df.to_dict('records')
            dataset.data = data
            dataset.save()
            return res
        except Dataset.DoesNotExist:
            return { "status": "error", "message": "Dataset not found" }

    @staticmethod
    def label_dataset(dataset_id: int, columns_label):
        try:
            dataset = Dataset.objects.get(id=dataset_id)
            df = pd.DataFrame(dataset.data)
            special_main_col = df.pop(columns_label)
            df[columns_label] = special_main_col
            data = df.to_dict('records')
            dataset.data = data
            dataset.save()
            res = df.to_json(orient='records')
            return res
        except Dataset.DoesNotExist:
            return { "status": "error", "message": "Dataset not found" }
    
    @staticmethod
    def normalize_columns(dataset_id: int):
        try:
            dataset = Dataset.objects.get(id=dataset_id)
            df = pd.DataFrame(dataset.data)
            scaler = MinMaxScaler()
            for col_name in df.columns:
                if df[col_name].dtype == np.float64 or df[col_name].dtype == np.int64:
                    df[col_name] = scaler.fit_transform(np.array(df[col_name]).reshape(-1, 1))
            data = df.to_dict('records')
            dataset.data = data
            dataset.save()
            res = df.to_json(orient='records')
            return res
        except Dataset.DoesNotExist:
            return { "status": "error", "message": "Dataset not found" }
    
    @staticmethod
    @transaction.atomic
    def split_data(dataset_id: int, input_value: int):
        try:
            dataset = Dataset.objects.get(id=dataset_id)
            df = pd.DataFrame(dataset.data)
            value = input_value/100
            test_rows = df.sample(frac=value, random_state=None)
            df.loc[test_rows.index, 'XY'] = 'test'
            data = df.replace({np.nan: None}).to_dict('records')
            dataset.data = data
            dataset.save()
            res = df.to_json(orient='records')
            return res
        except Dataset.DoesNotExist:
            return { "status": "error", "message": "Dataset not found" }

    @staticmethod
    def imputation_columns(dataset_id: int, type_of_imputation):
        try:
            dataset = Dataset.objects.get(id=dataset_id)
            df = pd.DataFrame(dataset.data)
            df = df.replace("", np.nan)
            if type_of_imputation == '0':
                df = df.fillna(0)
            elif type_of_imputation == 'mean':
                train_df = df[df['XY'] == 'train']
                train_mean = train_df.select_dtypes(include=np.number).mean()
                df = df.fillna(train_mean)
            elif type_of_imputation == 'median':
                train_df = df[df['XY'] == 'train']
                train_median = train_df.select_dtypes(include=np.number).median()
                df = df.fillna(train_median)
            res = df.to_json(orient='records')
            data = df.to_dict('records')
            dataset.data = data
            dataset.save()
            return res
        except Dataset.DoesNotExist:
            return { "status": "error", "message": "Dataset not found" }

    @staticmethod
    def visualize_Dataset_Tsne(dataset_id: int):
        try:
            dataset = Dataset.objects.get(id=dataset_id)
            df = pd.DataFrame(dataset.data)
            df_without_xy = df.drop(['XY'], axis=1)
            tsne = TSNE(n_components=2, random_state=42, init='random', perplexity=2)
            X_tsne = tsne.fit_transform(df_without_xy)
            df_tsne = pd.DataFrame(X_tsne, columns=['t-SNE_1', 't-SNE_2'])
            df_tsne[df_without_xy.columns] = df_without_xy
            res = json.loads(df_tsne.to_json(orient='records'))
            return res
        except Dataset.DoesNotExist:
            return { "status": "error", "message": "Dataset not found" }
            
    @staticmethod
    def visualize_Dataset_Pca(dataset_id: int):
        try:
            dataset = Dataset.objects.get(id=dataset_id)
            df = pd.DataFrame(dataset.data)
            df_without_xy = df.drop(['XY'], axis=1)
            pca = PCA(n_components=2)
            X_pca = pca.fit_transform(df_without_xy)
            df_pca = pd.DataFrame(X_pca, columns=['t-SNE_1', 't-SNE_2'])
            df_pca[df_without_xy.columns] = df_without_xy
            res = json.loads(df_pca.to_json(orient='records'))
            return res
        except Dataset.DoesNotExist:
            return { "status": "error", "message": "Dataset not found" }

    @staticmethod
    def download_dataset(dataset_id: int, file_type):
        dataset = Dataset.objects.get(id=dataset_id)
        df = pd.DataFrame(dataset.data)
        if file_type == 'csv':
            response = HttpResponse(df.to_csv(index=False), content_type='text/csv')
            response['Content-Disposition'] = 'attachment; filename="dataset_{}.csv"'.format(dataset_id)
            return response
        elif file_type == 'json':
            response = HttpResponse(df.to_json(), content_type='application/json')
            response['Content-Disposition'] = 'attachment; filename="dataset_{}.json"'.format(dataset_id)
            return response
        elif file_type == 'xlsx':
            response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            response['Content-Disposition'] = 'attachment; filename="dataset_{}.xlsx"'.format(dataset_id)
            df.to_excel(response, index=False)
            return response
        else:
            return HttpResponseBadRequest("Unsupported file format")