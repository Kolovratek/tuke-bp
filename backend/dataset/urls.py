from django.urls import path

from . import views

urlpatterns = [
    # path('visualize_data/', views.handleDatasetUpload, name="visualize data"),
    # path('one_hot_encoding/', views.oheDatasetRoute, name="OHE dataset"),
    # path('drop/', views.dropDatasetRoute, name="drop column"),
    # path('download/', views.downloadDatasetRoute, name="download dataset"),
    path('', views.handleDatasetRoot, name="dataset"),
    path('<int:dataset_id>/', views.handleDatasetWithId, name="dataset"),
]
