from rest_framework import serializers

from memex.models import EventLog, Provider, Activity


class ProviderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Provider
        fields = ['name']
        extra_kwargs = {
            'name': {'validators': []},
        }


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ['name']
        extra_kwargs = {
            'name': {'validators': []},
        }


class EventLogSerializer(serializers.ModelSerializer):
    provider = ProviderSerializer()
    acitvity = ActivitySerializer()

    class Meta:
        model = EventLog
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

    def create(self, validated_data):
        # https://www.django-rest-framework.org/api-guide/serializers/#writing-create-methods-for-nested-representations
        provider_data = validated_data.pop('provider')
        provider_object, _ = Provider.objects.get_or_create(**provider_data)

        acitvity_data = validated_data.pop('acitvity')
        acitvity_object, _ = Activity.objects.get_or_create(**acitvity_data)

        validated_data["provider"] = provider_object
        validated_data["acitvity"] = acitvity_object
        return super().create(validated_data)

    def validate(self, attrs):
        if EventLog.objects.filter(
            provider__name=attrs.get("provider", {}).get("name"),
            acitvity__name=attrs.get("acitvity", {}).get("name"),
            timestamp_utc=attrs.get("timestamp_utc")
        ).exists():
            raise serializers.ValidationError(
                {"acitivity": "Activity with same provider and timestamp already exists"}
            )

        return attrs
