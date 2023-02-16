from django.http import HttpResponse, HttpResponseBadRequest
from dataset.models import Dataset
from dataset.helpers import parse_file_to_DataFrame
from sklearn.preprocessing import OneHotEncoder, MinMaxScaler
import pandas as pd
import numpy as np

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
        data = parse_file_to_DataFrame(file).values.tolist()
        dataset = Dataset.objects.create( data=data)
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
            df = df.drop(df.columns[columnsToRemove], axis=1)
            res = df.to_json(orient='records')
            data = df.to_dict('records')
            dataset.data = data
            dataset.save()
            return res
        except Dataset.DoesNotExist:
            return { "status": "error", "message": "Dataset not found" }

    
    @staticmethod
    def one_hot_encoding_dataset(dataset_id: int, columns_ohe):
        try:
            dataset = Dataset.objects.get(id=dataset_id)
            df = pd.DataFrame(dataset.data)
            encoder = OneHotEncoder(handle_unknown='ignore')
            column_name = df.columns[columns_ohe]
            encoder.fit(df[[column_name]])
            categories = encoder.categories_[0]
            encoder_df = pd.DataFrame(encoder.fit_transform(df[[column_name]]).toarray(), columns=categories)
            df = df.drop(df.columns[columns_ohe], axis=1)
            final_df = pd.concat([df, encoder_df], axis=1)
            print(final_df)
            res = final_df.to_json(orient='records')
            data = final_df.to_dict('records')
            dataset.data = data
            dataset.save()
            return res
        except Dataset.DoesNotExist:
            return { "status": "error", "message": "Dataset not found" }

    @staticmethod
    def normalize_columns(dataset_id: int, columns_normalize):
        try:
            dataset = Dataset.objects.get(id=dataset_id)
            df = pd.DataFrame(dataset.data)
            column_name = df.columns[columns_normalize]
            df[column_name] = MinMaxScaler().fit_transform(np.array(df[column_name]).reshape(-1,1))
            res = df.to_json(orient='records')
            data = df.to_dict('records')
            dataset.data = data
            dataset.save()
            return res
        except Dataset.DoesNotExist:
            return { "status": "error", "message": "Dataset not found" }
        
    #TODO:
    @staticmethod
    def imputation_columns(dataset_id: int, columns_imputation, type_of_imputation):
        try:
            dataset = Dataset.objects.get(id=dataset_id)
            df = pd.DataFrame(dataset.data)
            column_name = df.columns[columns_imputation]
            if type_of_imputation == '0':
                df[column_name] = df[column_name].fillna(0)
            elif type_of_imputation == 'mean':
                df[column_name] = df[column_name].fillna(df[column_name].mean())
            elif type_of_imputation == 'median':
                df[column_name] = df[column_name].fillna(df[column_name].median())
            res = df.to_json(orient='records')
            data = df.to_dict('records')
            dataset.data = data
            dataset.save()
            return res
        except Dataset.DoesNotExist:
            return { "status": "error", "message": "Dataset not found" }

    #TODO:
    @staticmethod
    def visualize_Dataset(dataset_id: int):
        try:
            dataset = Dataset.objects.get(id=dataset_id)
            return { "status": "success" }
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