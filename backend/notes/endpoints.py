import random

from rest_framework import generics
from rest_framework.permissions import IsAdminUser
from rest_framework.pagination import LimitOffsetPagination

from django.db import models, transaction
from django.db.models import Count, Max, Min
from django_random_queryset import strategies

from notes.models import Highlight, Book
from notes.serializers import HighlightListSerializer, HighlightSerializer, BookSerializer, BookDetailSerializer


class HighlightsPagination(LimitOffsetPagination):
    default_limit = 10
    max_limit = 500


class APIHighlightCreate(generics.CreateAPIView):
    queryset = Highlight.objects.all()
    serializer_class = HighlightListSerializer
    permission_classes = [IsAdminUser]


class HighlighListCreateAPIView(generics.ListAPIView):
    queryset = Highlight.objects.all()
    serializer_class = HighlightSerializer
    pagination_class = HighlightsPagination


class HighlightRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Highlight.objects.all()
    serializer_class = HighlightSerializer
    permission_classes = [IsAdminUser]


class BookListAPIView(generics.ListAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer


class BookDetailAPIView(generics.RetrieveAPIView):
    queryset = Book.objects.all()
    serializer_class = BookDetailSerializer

class HighlightRandomRetrieveAPIView(generics.ListAPIView):
    serializer_class = HighlightSerializer

    def get_queryset(self):
        amount = 1
        with transaction.atomic():
            selected_ids = Highlight.objects.all().values_list("id", flat=True)
            random_id = random.sample(list(selected_ids), amount)[0]
            return [Highlight.objects.get(id=random_id)]
