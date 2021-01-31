import random

from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAdminUser
from django.views.generic import ListView

from notes.serializers import HighlightListSerializer
from notes.models import Highlight


class APIHighlightCreate(generics.CreateAPIView):
    queryset = Highlight.objects.all()
    serializer_class = HighlightListSerializer
    permission_classes = [IsAdminUser]


class BookCreate(generics.CreateAPIView):
    pass


class ListHighlights(ListView):
    model = Highlight
    queryset = Highlight.objects.all()
    context_object_name = "highlights_list"
    template_name = "notes/highlights_list.html"


    def get_context_data(self, **kwargs):
        data = super().get_context_data(**kwargs)

        items = Highlight.objects.all()
        random_items = random.sample(list(items), 10)
        data["highlights_list"] = random_items
        return data


