from django.urls import path

from . import views

app_name = 'notes'
urlpatterns = [
    path('', views.ListHighlights.as_view(), name='list'),
    path("review/", views.ActiveReview.as_view(), name="active_review"),
    path("review/<int:pk>/", views.ActiveDetailView.as_view(), name="active_detail"),
    path("books/", views.BookListView.as_view(), name="books_list"),
    path("books/<int:pk>/", views.BookDetailView.as_view(), name="books_detail"),
]
