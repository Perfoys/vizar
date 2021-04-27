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
    id models.AutoField(primary_key=True)
    session = models.CharField(max_length=8, default=generate_unique_code, unique=True)
    author = models.CharField(max_length=50, unique=True)
    text = models.CharField(max_length=256)
    audio_num = models.CharField(max_length=256)
    date = models.DateTimeField(auto_now_add=True)

class Event(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.ForeignKey('auth.User', on_delete=models.CASCADE, related_name='events')
    event_name = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now_add=True)

class Task(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.ForeignKey('auth.User', on_delete=models.CASCADE, related_name='tasks')
    task_name = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now_add=True)
    is_done = models.BooleanField(default=False)

class Message(models.Model):
    id = models.AutoField(primary_key=True)
    sender = models.ForeignKey('auth.User', on_delete=models.CASCADE, related_name='messages')
    receiver = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now_add=True)
    content = models.CharField(max_length=256)
    is_read = models.BooleanField(default=False)
