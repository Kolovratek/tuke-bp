from django.db import models

class Dataset(models.Model):
    data = models.JSONField()

    def __str__(self):
        return str(self.id)
