from django.urls import path

from memex import endpoints

app_name = 'memex_endpoints'
urlpatterns = [
    path('', endpoints.LogRetrieveViewAPI.as_view(), name='list'),
    path('create/', endpoints.LogCreateViewAPI.as_view(), name='create'),
    path('resume/', endpoints.TimelineResume.as_view(), name='resume'),
]
