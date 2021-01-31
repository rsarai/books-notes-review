from django.conf.urls import include, url  # noqa
from django.urls import path
from django.contrib import admin
from django.shortcuts import redirect
from notes.views import APIHighlightCreate

import django_js_reverse.views


urlpatterns = [
    path("", lambda request : redirect("/highlights/")),
    path("admin/", admin.site.urls, name="admin"),
    path("jsreverse/", django_js_reverse.views.urls_js, name="js_reverse"),
    path('api-auth/', include('rest_framework.urls')),
    path('api/importer/', APIHighlightCreate.as_view()),
    # path('api/', include((router.urls, 'notes'))),
    path("highlights/", include("notes.urls"), name="notes"),
]
