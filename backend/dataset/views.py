from django.http import JsonResponse, HttpRequest
from django.core.exceptions import BadRequest
from django.views.decorators.csrf import csrf_exempt
from dataset.dataset_service import DatasetService

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


# TODO: refactor to something functioning
# @csrf_exempt
# def dropDatasetRoute(request: HttpRequest):
#     global TOTO_NIKDY_NEROB_GLOBAL

#     def remove_columns(data, columns_to_remove):
#         return data.drop(columns=columns_to_remove)

#     if (request.method == "POST"):
#         body = json.loads(request.body)
#         columns_to_remove = body.get("columnsToRemove")
#         if not columns_to_remove:
#             return JsonResponse('')
#         data = pd.DataFrame(TOTO_NIKDY_NEROB_GLOBAL)
#         data_dropped = remove_columns(data, columns_to_remove)
#         TOTO_NIKDY_NEROB_GLOBAL = data_dropped.to_dict('list')
#         return JsonResponse(data_dropped)


# @csrf_exempt
# def oheDatasetRoute(request: HttpRequest):
#     def one_hot_encoding(request):
#         columns = request.POST.get('columns')
#         data = request.POST.get('data')
#         df = pd.DataFrame(data)
#         one_hot_encoded_df = pd.get_dummies(df, columns=columns)
#         return JsonResponse({'data': one_hot_encoded_df.to_dict()})

#     if (request.method == "GET"):
#         return one_hot_encoding(request)
#     raise BadRequest("invalid method")

# @csrf_exempt
# def downloadDatasetRoute(request: HttpRequest):
#     def handleDownload(request):
#         body = json.loads(request.body.decode())
#         file_type = body.get('file_type')
#         data = TOTO_NIKDY_NEROB_GLOBAL
#         converted_data = convert_data_format(data, file_type)
#         if converted_data:
#             response = HttpResponse(
#                 converted_data, content_type=f'application/{file_type}')
#             response['Content-Disposition'] = f'attachment; filename="data.{file_type}"'
#             return response
#         else:
#             return JsonResponse({'error': 'Invalid file type'})

#     def convert_data_format(data, file_type):
#         data_json = json.dumps(data)
#         data = pd.read_json(data_json)

#         if file_type == 'csv':
#             return data.to_csv(index=False).encode()
#         elif file_type == 'json':
#             return data.to_json(orient='records', lines=True).encode()
#         elif file_type == 'xlsx':
#             with io.BytesIO() as buffer:
#                 with pd.ExcelWriter(buffer, engine='openpyxl') as writer:
#                     data.to_excel(writer, index=False)
#                 return buffer.getvalue()
#         elif file_type == 'arff':
#             with io.StringIO() as buffer:
#                 savearff(buffer, data)
#                 return buffer.getvalue().encode()
#         else:
#             raise ValueError(f"Invalid file type: {file_type}")

#     if (request.method == "POST"):
#         return handleDownload(request)
