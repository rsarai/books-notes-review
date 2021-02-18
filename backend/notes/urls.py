from django.urls import path

from . import views

app_name = 'notes'
urlpatterns = [
    path('', views.ListHighlights.as_view(), name='list'),
    path("review/", views.ActiveReview.as_view(), name="active_review"),
]
