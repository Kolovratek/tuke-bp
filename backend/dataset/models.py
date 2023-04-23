from django.db import models

class Dataset(models.Model):
    data = models.JSONField()
    filename = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return str(self.id)