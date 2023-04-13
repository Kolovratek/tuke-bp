from django.urls import path

from . import views

urlpatterns = [
    path('visualize_data_tsne/<int:dataset_id>', views.visualizeDatasetRouteTsne, name="visualize data"),
    path('visualize_data_pca/<int:dataset_id>', views.visualizeDatasetRoutePca, name="visualize data"),
    path('drop/<int:dataset_id>', views.dropDatasetRoute, name="drop column"),
    path('split/<int:dataset_id>', views.splitDatasetRoute, name="split data"),
    path('normalize/<int:dataset_id>', views.normalizeDatasetRoute, name="normalize column"),
    path('one_hot_encoding/<int:dataset_id>', views.oheDatasetRoute, name="OHE dataset"),
    path('Y/<int:dataset_id>', views.YRoute, name="Y dataset"),
    path('imputation/<int:dataset_id>', views.imputationDatasetRoute, name="imputation column"),
    path('download/<int:dataset_id>', views.downloadDatasetRoute, name="download dataset"),
    path('delete/<int:dataset_id>', views.deleteDataset, name='delete_dataset'),
    path('', views.handleDatasetRoot, name="dataset"),
    path('<int:dataset_id>/', views.handleDatasetWithId, name="dataset"),
]
