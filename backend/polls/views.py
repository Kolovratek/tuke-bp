from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def uploadDataset(request):
    print("data", request.FILES)
    file = request.FILES['file']
    return HttpResponse(len(file))
    
@csrf_exempt
def getDataset(request):
    return HttpResponse("JE TAM")

@csrf_exempt
def getRandomRows(request):
    return HttpResponse(["123", "123"])
