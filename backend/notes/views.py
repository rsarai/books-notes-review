import random

from django.shortcuts import render
from django.views import generic
from notes.models import Highlight


class ListHighlights(generic.ListView):
    model = Highlight
    queryset = Highlight.objects.all()
    context_object_name = "highlights_list"
    template_name = "notes/highlights_list.html"


    def get_context_data(self, **kwargs):
        data = super().get_context_data(**kwargs)

        items = Highlight.objects.all()
        random_items = random.sample(list(items), 10)
        data["highlights_list"] = random_items
        # data["highlights_list"] = []
        return data


class ActiveReview(generic.TemplateView):
    template_name = "spa.html"


class ActiveDetailView(generic.TemplateView):
    template_name = "spa.html"


class BookListView(generic.TemplateView):
    template_name = "notes/books_list.html"


class BookDetailView(generic.TemplateView):
    template_name = "notes/books_list.html"
