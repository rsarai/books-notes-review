from rest_framework import serializers

from memex.models import EventLog, Provider, Activity


class ProviderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Provider
        fields = ['name']


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ['name']


class EventLogSerializer(serializers.ModelSerializer):
    provider = ProviderSerializer()
    acitvity = ActivitySerializer()

    class Meta:
        models = EventLog
        fields = [
            "provider",
            "acitvity",
            "date",
            "timestamp_utc",
            "timezone",
            "all_day",
            "person_name",
            "device_name",
            "command",
            "website_title",
            "website_url",
        ]
