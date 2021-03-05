from rest_framework import generics
from rest_framework.permissions import IsAdminUser
from rest_framework.pagination import LimitOffsetPagination

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

