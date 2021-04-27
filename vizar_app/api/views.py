from django.shortcuts import render
from rest_framework import generics, status
from .serializers import LogSerializer, CreateLogSerializer
from .models import Log
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.
class LogView(generics.CreateAPIView):
    queryset = Log.objects.all()
    serializer_class = LogSerializer


class CreateLogView(APIView):
    serializer_class = CreateLogSerializer

    def post(self, request, format=None)
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
        pass