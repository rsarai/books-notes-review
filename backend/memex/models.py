from django.db import models

from common.models import IndexedTimeStampedModel


class Provider(IndexedTimeStampedModel):
    name = models.CharField(max_length=255, unique=True, blank=False)


class Activity(IndexedTimeStampedModel):
    name = models.CharField(max_length=255, unique=True, blank=False)


class EventLog(IndexedTimeStampedModel):
    provider = models.ForeignKey(Provider, related_name="logs", on_delete=models.CASCADE)
    acitvity = models.ForeignKey(Activity, related_name="logs", on_delete=models.CASCADE)
    date = models.DateTimeField(null=False, blank=False)
    timestamp_utc = models.CharField(max_length=255, null=False, blank=False)
    timezone = models.CharField(max_length=255, null=False, blank=False)
    all_day = models.BooleanField(default=False)

    person_name = models.CharField(max_length=255, blank=True)
    device_name = models.CharField(max_length=255, blank=True)
    command = models.TextField(blank=True)
    website_title = models.TextField(blank=True)
    website_url = models.TextField(blank=True)
