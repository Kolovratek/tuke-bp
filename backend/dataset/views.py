from django.http import JsonResponse, HttpRequest, HttpResponseBadRequest
from django.core.exceptions import BadRequest
from django.views.decorators.csrf import csrf_exempt
from dataset.dataset_service import DatasetService
import json

@csrf_exempt
def handleDatasetRoot(request: HttpRequest):
    if (request.method == "GET"):
        datasets = DatasetService.get_all()
        return JsonResponse({
            "datasets": list(datasets)
        })

    if (request.method == "POST"):
        file = request.FILES['file']
        filename = request.FILES['file'].name
        dataset = DatasetService.upload(file, filename)
        
        return JsonResponse({ "id": dataset.id })

    raise BadRequest("invalid method")

@csrf_exempt
def generateDataset(request: HttpRequest):
    if (request.method == "POST"):
        json_data = json.loads(request.body)
        fileName = json_data['fileName']
        n_samples = json_data['samples']
        n_features = json_data['features']
        n_informative = json_data['informative']
        n_redundant = json_data['redundant']
        n_repeated = json_data['repeated']
        n_classes = json_data['classes']
        n_clustersPerClass = json_data['clustersPerClass']
        dataset = DatasetService.generate_dataset(fileName,n_samples,n_features,n_informative,n_redundant,n_repeated,n_classes,n_clustersPerClass)
        return JsonResponse({ "id": dataset.id })

    raise BadRequest("invalid method")

@csrf_exempt
def handleDatasetWithId(request: HttpRequest, dataset_id: int):
    if (request.method == "GET"):
        dataset = DatasetService.get(dataset_id)
        return JsonResponse({
            "id": dataset.id,
            "data": dataset.data
        })
    raise BadRequest("invalid method")

@csrf_exempt
def deleteDataset(request: HttpRequest, dataset_id: int):
    if (request.method == "DELETE"):
        res = DatasetService.delete_dataset(dataset_id)
        return JsonResponse(res)
    raise BadRequest("invalid method")

@csrf_exempt
def downloadDatasetRoute(request: HttpRequest, dataset_id: int):
    if (request.method == "POST"):
        json_data = json.loads(request.body)
        file_type = json_data['file_type']
        res = DatasetService.download_dataset(dataset_id, file_type)
        return res
    else:
        raise HttpResponseBadRequest("Invalid method")

@csrf_exempt
def dropDatasetRoute(request: HttpRequest, dataset_id: int):
    if (request.method == "POST"):
        json_data = json.loads(request.body)
        columns_to_remove = json_data['columnsToRemove']
        res = DatasetService.drop_columns(dataset_id, columns_to_remove)
        return JsonResponse(json.loads(res), safe=False)
    raise BadRequest("invalid method")

@csrf_exempt
def oheDatasetRoute(request: HttpRequest, dataset_id: int):
    if (request.method == "POST"):
        json_data = json.loads(request.body)
        columns_ohe = json_data['columns']
        res = DatasetService.one_hot_encoding_dataset(dataset_id, columns_ohe)
        return JsonResponse(json.loads(res), safe=False)
    raise BadRequest("invalid method")

@csrf_exempt
def labelRoute(request: HttpRequest, dataset_id: int):
    if (request.method == "POST"):
        json_data = json.loads(request.body)
        columns_label = json_data['columns']
        res = DatasetService.label_dataset(dataset_id, columns_label)
        return JsonResponse(json.loads(res), safe=False)
    raise BadRequest("invalid method")

@csrf_exempt
def normalizeDatasetRoute(request: HttpRequest, dataset_id: int):
    if (request.method == "POST"):
        res = DatasetService.normalize_columns(dataset_id)
        return JsonResponse(json.loads(res), safe=False)
    raise BadRequest("invalid method")

@csrf_exempt
def splitDatasetRoute(request: HttpRequest, dataset_id: int):
    if (request.method == "POST"):
        json_data = json.loads(request.body)
        input_value = json_data['value']
        input_value = int(input_value)
        res = DatasetService.split_data(dataset_id, input_value)
        return JsonResponse(json.loads(res), safe=False)
    raise BadRequest("invalid method")

@csrf_exempt
def imputationDatasetRoute(request: HttpRequest, dataset_id: int):
    if (request.method == "POST"):
        json_data = json.loads(request.body)
        type_of_imputation = json_data['type']
        res = DatasetService.imputation_columns(dataset_id, type_of_imputation)
        return JsonResponse(json.loads(res), safe=False)
    raise BadRequest("invalid method")

@csrf_exempt
def visualizeDatasetRoutePca(request: HttpRequest, dataset_id: int):
    if (request.method == "POST"):
        res = DatasetService.visualize_Dataset_Pca(dataset_id)
        return JsonResponse(res, safe=False)
    raise BadRequest("invalid method")

@csrf_exempt
def visualizeDatasetRouteTsne(request: HttpRequest, dataset_id: int):
    if (request.method == "POST"):
        res = DatasetService.visualize_Dataset_Tsne(dataset_id)
        return JsonResponse(res, safe=False)
    raise BadRequest("invalid method")