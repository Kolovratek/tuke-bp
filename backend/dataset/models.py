from django.db import models

class Dataset(models.Model):
    data = models.JSONField()
    # file_name = models.CharField(max_length=255)

    def __str__(self):
        return str(self.id)

    # def __str__(self):
    #     return self.file_name