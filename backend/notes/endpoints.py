from rest_framework import generics
from rest_framework.permissions import IsAdminUser
from rest_framework.pagination import LimitOffsetPagination

from notes.models import Highlight
from notes.serializers import HighlightListSerializer, HighlightSerializer


class HightlightsPagination(LimitOffsetPagination):
    default_limit = 10
    max_limit = 500


class APIHighlightCreate(generics.CreateAPIView):
    queryset = Highlight.objects.all()
    serializer_class = HighlightListSerializer
    permission_classes = [IsAdminUser]


class HighlighListCreateAPIView(generics.ListAPIView):
    queryset = Highlight.objects.all()
    serializer_class = HighlightSerializer
    pagination_class = HightlightsPagination


class HighlightRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Highlight.objects.all()
    serializer_class = HighlightSerializer
    permission_classes = [IsAdminUser]
