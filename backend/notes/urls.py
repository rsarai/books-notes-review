from django.urls import path

from . import views

app_name = 'notes'
urlpatterns = [
    path('', views.ListHighlights.as_view(), name='list'),
]
