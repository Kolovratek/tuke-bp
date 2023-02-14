from django.http import JsonResponse, HttpRequest, HttpResponseBadRequest
from django.core.exceptions import BadRequest
from django.views.decorators.csrf import csrf_exempt
from dataset.dataset_service import DatasetService
from django.http import HttpResponse
import json

@csrf_exempt
def handleDatasetRoot(request: HttpRequest):
    if (request.method == "GET"):
        datasets = DatasetService.get_all()
        return JsonResponse({
            "datasets_ids": list(map(lambda x: x.id, datasets))
        })

    if (request.method == "POST"):
        file = request.FILES['file']
        dataset = DatasetService.upload(file)
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
def imputationDatasetRoute(request: HttpRequest, dataset_id: int):
    if (request.method == "POST"):
        json_data = json.loads(request.body)
        columns_imputation = json_data['ImputationColumns']
        res = DatasetService.imputation_columns(dataset_id, columns_imputation)
        return JsonResponse(json.loads(res), safe=False)
    raise BadRequest("invalid method")

@csrf_exempt
def visualizeDatasetRoute(request: HttpRequest, dataset_id: int):
    if (request.method == "POST"):
        res = DatasetService.visualize_Dataset(dataset_id)
        return JsonResponse(res)
    raise BadRequest("invalid method")