from django.urls import path

from . import views

urlpatterns = [
    path('visualize_data_tsne/<int:dataset_id>', views.visualizeDatasetRouteTsne, name="visualize_data"),
    path('visualize_data_pca/<int:dataset_id>', views.visualizeDatasetRoutePca, name="visualize_data"),
    path('drop/<int:dataset_id>', views.dropDatasetRoute, name="drop_column"),
    path('split/<int:dataset_id>', views.splitDatasetRoute, name="split_data"),
    path('normalize/<int:dataset_id>', views.normalizeDatasetRoute, name="normalize_column"),
    path('one_hot_encoding/<int:dataset_id>', views.oheDatasetRoute, name="OHE_dataset"),
    path('label/<int:dataset_id>', views.labelRoute, name="label_dataset"),
    path('imputation/<int:dataset_id>', views.imputationDatasetRoute, name="imputation_column"),
    path('download/<int:dataset_id>', views.downloadDatasetRoute, name="download_dataset"),
    path('delete/<int:dataset_id>', views.deleteDataset, name='delete_dataset'),
    path('generate/', views.generateDataset, name='generate_dataset'),
    path('', views.handleDatasetRoot, name="dataset"),
    path('<int:dataset_id>/', views.handleDatasetWithId, name="dataset"),
]
