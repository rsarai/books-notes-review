from django.urls import path

from memex import endpoints

app_name = 'memex_endpoints'
urlpatterns = [
    path('create/', endpoints.LogCreateViewAPI.as_view(), name='create'),
]
