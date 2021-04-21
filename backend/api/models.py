from django.db import models
import string
import random

def generate_unique_code():
    length = 6

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Log.objects.filter(code=code).count() == 0:
            break
    
    return code


# Create your models here.
class Log(models.Model):
    session = models.CharField(max_length=8, default="", unique=True)
    author = models.CharField(max_length=50, unique=True)
    text = models.CharField(max_length=256)
    audio_num = models.CharField(max_length=256)
    date = models.DateTimeField(auto_now_add=True)