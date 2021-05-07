from django.shortcuts import render
from rest_framework import generics, status, permissions
from .serializers import LogSerializer, EventSerializer, TaskSerializer, MessageSerializer, CreateLogSerializer
from .models import Log, Event, Task, Message
from .permissions import IsOwnerOrReadOnly, IsReceiver
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User


# Create your views here.
class LogView(generics.CreateAPIView):
    queryset = Log.objects.all()
    serializer_class = LogSerializer


class CreateLogView(APIView):
    serializer_class = CreateLogSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            author = serializer.data.get('author')
            session = self.request.session.session_key
            queryset = Log.objects.filter(author=author)
            if queryset.exists():
                log = queryset[0]
                log.author = author
                log.text = text
                log.save(update_fields=['author', 'text'])
            else: 
                log = Log(author=author, session=session, text=text)
                log.save()

        return Response(LogSerializer(log).data, status=status.HTTP_200_OK)


class EventList(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Event.objects.filter(username=self.request.user)

    def perform_create(self, serializer):
        serializer.save(username=self.request.user)


class EventDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

    def delete_queryset(self):
        return Event.objects.filter(username=self.request.user)

    
class TaskList(generics.ListCreateAPIView):
    quearyset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(username=self.request.user)

    def perform_create(self, serializer):
        serializer.save(username=self.request.user)

    
class TaskDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

    def delete_queryset(self):
        return Task.ojbects.filter(username=self.request.user)
    

class MessageList(generics.ListCreateAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Message.objects.filter(username=self.request.user)

    def perform_create(self, serializer):
        serializer.save(username=self.request.user)

    
class MessageDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated, IsReceiver]

    def delete_queryset(self):
        return Message.objects.filter(username=self.request.user)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def show_inbox(request):
    messages = Message.objects.filter(receiver=request.user)
    serializer = MessageSerializer(messages, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def create_user(request):
    serialized = UserSerializer(data=request.data)
    if serialized.is_valid():
        try:
            User.objects.create_user(serialized.validated_data['username'], serialized.validated_data['email'], serialized.validated_data['password'])
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_409_CONFLICT)
        return Response(serialized.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serialized._errors, status=status.HTTP_400_BAD_REQUEST)