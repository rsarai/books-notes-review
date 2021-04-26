from django.conf.urls import include, url  # noqa
from django.urls import path
from django.contrib import admin
from django.shortcuts import redirect

from notes import endpoints
from memex import views

import django_js_reverse.views


urlpatterns = [
    path("", lambda request : redirect("/highlights/")),
    path("admin/", admin.site.urls, name="admin"),
    path("jsreverse/", django_js_reverse.views.urls_js, name="js_reverse"),
    path('api-auth/', include('rest_framework.urls')),
    path("highlights/", include("notes.urls"), name="notes"),
    path("memex/", views.ActiveDetailView.as_view(), name='memex'),

    path('api/highlights/', include("notes.endpoints_urls")),
    path('api/nodes/', include("memex.endpoints_urls")),

    # importer only available to me
    path('api/importer/', endpoints.APIHighlightCreate.as_view()),
]
