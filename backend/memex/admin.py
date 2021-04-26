from django.contrib import admin

from memex import models

admin.site.register(models.EventLog)
admin.site.register(models.Provider)
admin.site.register(models.Activity)
