from django.db.models import Count
from rest_framework import filters
from rest_framework import generics
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response

from memex import models
from memex import serializers


class LogsPagination(LimitOffsetPagination):
    default_limit = 10
    max_limit = 100


class LogCreateViewAPI(generics.CreateAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = serializers.EventLogSerializer


class LogRetrieveViewAPI(generics.ListAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = serializers.EventLogSerializer
    queryset = models.EventLog.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ['provider__name', 'acitvity__name', 'date']
    pagination_class = LogsPagination


class TimelineResume(generics.GenericAPIView):
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        return models.EventLog.objects.values("date__date").annotate(count=Count('date'))

    def get(self, request, *args, **kwargs):
        return Response(self.get_queryset())
