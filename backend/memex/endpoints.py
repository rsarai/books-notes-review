from rest_framework import generics
from rest_framework.permissions import IsAdminUser
from rest_framework import filters

from memex import models
from memex import serializers


class LogCreateViewAPI(generics.CreateAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = serializers.EventLogSerializer


class LogRetrieveViewAPI(generics.RetrieveAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = serializers.EventLogSerializer
    queryset = models.EventLog
    filter_backends = [filters.SearchFilter]
    search_fields = ['provider__name', 'acitvity__name', 'date']
