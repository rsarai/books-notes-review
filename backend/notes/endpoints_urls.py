from django.urls import path

from . import endpoints

app_name = 'notes_endpoints'
urlpatterns = [
    path('', endpoints.HighlighListCreateAPIView.as_view(), name='list'),
    path('<int:pk>/', endpoints.HighlightRetrieveUpdateDestroyAPIView.as_view(), name='detail'),
    path('books/', endpoints.BookListAPIView.as_view(), name='book_list'),
    path('books/<int:pk>/', endpoints.BookDetailAPIView.as_view(), name='book_detail'),
]
