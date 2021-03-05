from django.urls import path

from . import endpoints

app_name = 'notes_endpoints'
urlpatterns = [
    path('', endpoints.HighlighListCreateAPIView.as_view(), name='list'),
    path('<int:pk>/', endpoints.HighlightRetrieveUpdateDestroyAPIView.as_view(), name='detail'),
]