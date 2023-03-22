from django.http import HttpResponse, HttpRequest, HttpResponseBadRequest
from dataset.models import Dataset
from dataset.helpers import parse_file_to_DataFrame
from sklearn.preprocessing import OneHotEncoder, MinMaxScaler
from sklearn.manifold import TSNE
import pandas as pd
import numpy as np
import json

class DatasetService:
    @staticmethod
    def get_all():
        datasets = Dataset.objects.all()
        return datasets

    @staticmethod
    def get(dataset_id: int) -> Dataset:
        dataset = Dataset.objects.get(id=dataset_id)
        return dataset

    @staticmethod
    def upload(file) -> Dataset:
        print("Received new data")
        df = parse_file_to_DataFrame(file)
        data = df.replace({np.nan: None}).to_dict('records')
        dataset = Dataset.objects.create(data=data)
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
            # dataset = Dataset.objects.get(id=dataset_id)
            # df = pd.DataFrame(dataset.data)
            # df = df.drop(columnsToRemove, axis=1)
            # res = df.to_json(orient='records')
            # data = df.to_dict('records')
            # dataset.data = data
            # dataset.save()
            # return res
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
            columns_ohe = [df.columns.get_loc(columns_ohe)]
            encoder = OneHotEncoder(handle_unknown='ignore')
            print(columns_ohe)
            columns_to_encode = [columns_ohe] if isinstance(columns_ohe, str) else columns_ohe
            encoder.fit(df.iloc[:, columns_to_encode])
            categories = encoder.categories_[0]
            encoder_df = pd.DataFrame(encoder.transform(df.iloc[:, columns_to_encode]).toarray(), columns=categories)
            df = df.drop(df.columns[columns_ohe], axis=1)
            final_df = pd.concat([df, encoder_df], axis=1)
            res = final_df.to_json(orient='records')
            data = final_df.to_dict('records')
            dataset.data = data
            dataset.save()
            return res
        except Dataset.DoesNotExist:
            return { "status": "error", "message": "Dataset not found" }

    @staticmethod
    def normalize_columns(dataset_id: int):
        try:
            dataset = Dataset.objects.get(id=dataset_id)
            df = pd.DataFrame(dataset.data)
            # scaler = MinMaxScaler()
            # df_normalized = pd.DataFrame(scaler.fit_transform(df), columns=df.columns)
            # STARE
            # column_name = df.columns[columns_normalize]
            # df[column_name] = MinMaxScaler().fit_transform(np.array(df[column_name]).reshape(-1,1))
            scaler = MinMaxScaler()
            for col_name in df.columns:
                if df[col_name].dtype == np.float64 or df[col_name].dtype == np.int64:
                    df[col_name] = scaler.fit_transform(np.array(df[col_name]).reshape(-1, 1))
            res = df.to_json(orient='records')
            data = df.to_dict('records')
            dataset.data = data
            dataset.save()
            return res
        except Dataset.DoesNotExist:
            return { "status": "error", "message": "Dataset not found" }
        
    
    @staticmethod
    def imputation_columns(dataset_id: int, type_of_imputation):
        try:
            dataset = Dataset.objects.get(id=dataset_id)
            df = pd.DataFrame(dataset.data)
            # if type_of_imputation == '0':
            #     df[column_name] = df[column_name].fillna(0)
            # elif type_of_imputation == 'mean':
            #     df[column_name] = df[column_name].fillna(df[column_name].mean())
            # elif type_of_imputation == 'median':
            #     df[column_name] = df[column_name].fillna(df[column_name].median())
            if type_of_imputation == '0':
                df = df.fillna(0)
            elif type_of_imputation == 'mean':
                df = df.fillna(df.mean())
            elif type_of_imputation == 'median':
                df = df.fillna(df.median())
            res = df.to_json(orient='records')
            data = df.to_dict('records')
            dataset.data = data
            dataset.save()
            return res
        except Dataset.DoesNotExist:
            return { "status": "error", "message": "Dataset not found" }

    @staticmethod
    def visualize_Dataset(dataset_id: int):
        try:
            dataset = Dataset.objects.get(id=dataset_id)
            df = pd.DataFrame(dataset.data)
            # column_name = df.columns[columns_visualize].tolist()
            # X = df.loc[:, column_name]
            tsne = TSNE(n_components=2, random_state=42, init='random', perplexity=2)
            X_tsne = tsne.fit_transform(df)
            df_tsne = pd.DataFrame(X_tsne, columns=['t-SNE_1', 't-SNE_2'])
            df_tsne[df.columns] = df[df.columns]
            res = json.loads(df_tsne.to_json(orient='records'))
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