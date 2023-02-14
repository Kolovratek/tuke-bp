from django.urls import path

from . import views

urlpatterns = [
    path('visualize_data/<int:dataset_id>', views.visualizeDatasetRoute, name="visualize data"),
    path('drop/<int:dataset_id>', views.dropDatasetRoute, name="drop column"),
    path('one_hot_encoding/<int:dataset_id>', views.oheDatasetRoute, name="OHE dataset"),
    path('imputation/<int:dataset_id>', views.imputationDatasetRoute, name="imputation column"),
    path('download/<int:dataset_id>', views.downloadDatasetRoute, name="download dataset"),
    path('delete/<int:dataset_id>', views.deleteDataset, name='delete_dataset'),
    path('', views.handleDatasetRoot, name="dataset"),
    path('<int:dataset_id>/', views.handleDatasetWithId, name="dataset"),
]
