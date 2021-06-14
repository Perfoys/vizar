from requests import Session
from rest_framework import serializers
from .models import Log, Event, Task, Message, Session
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username', 'email', 'password']


class SessionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Session
        fields = ['id', 'session', 'date']


class LogSerializer(serializers.ModelSerializer):

    class Meta:
        model = Log
        fields = ['id', 'session', 'author_name', 'text', 'date']


class EventSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='username.username')

    class Meta: 
        model = Event
        fields = ['id', 'username', 'event_name', 'date']

    def create(self, validated_data):

        return Event.objects.create(**validated_data)

    def update(self, instance, validated_data):

        instance.event_name = validated_data.get('event_name', instance.event_name)
        instance.date = validated_data.get('date', instance.date)
        instance.save()
        return instance

    
class TaskSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='username.username')

    class Meta: 
        model = Task
        fields = ['id', 'username', 'task_name', 'date', 'is_done']

    def create(self, validated_data):

        return Task.objects.create(**validated_data)

    def update(self, instance, validated_data):

        instance.task_name = validated_data.get('task_name', instance.task_name)
        instance.date = validated_data.get('date', instance.date)
        instance.is_done = validated_data.get('is_done', instance.is_done)
        instance.save()
        return instance

class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.ReadOnlyField(source='sender.username')

    class Meta:
        model = Message
        fields = ['id', 'sender', 'receiver', 'date', 'is_read', 'content']

    def create(self, validated_data):

        return Message.objects.create(**validated_data)

    def update(self, instance, validated_data):

        instance.is_read = validated_data.get('is_read', instance.is_read)
        instance.save()
        return instance

class CreateLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Log
        fields = ('author', 'text')

        