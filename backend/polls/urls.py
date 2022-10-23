from django.urls import path

from . import views

urlpatterns = [
    path('upload', views.uploadDataset, name="upload dataset"),
    path('random-rows', views.getRandomRows, name="get random rows"),
    path('', views.getDataset, name="upload dataset"),
]
