from django.contrib import admin

from notes import models

admin.site.register(models.Book)
admin.site.register(models.Tag)
admin.site.register(models.Highlight)
