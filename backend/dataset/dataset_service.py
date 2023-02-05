from dataset.models import Dataset
from dataset.helpers import parse_file_to_DataFrame

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
        dataset = Dataset.objects.create(data=data)
        dataset.save()
        return dataset
