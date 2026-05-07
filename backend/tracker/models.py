from django.db import models

# Create your models here.

class Activity(models.Model):
    name = models.CharField(max_length=50)
    activity = models.CharField(max_length=100)
    hours = models.IntegerField()
