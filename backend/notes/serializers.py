from rest_framework import serializers

from notes.models import Tag, Book, Highlight


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'


class BookSerializer(serializers.ModelSerializer):

    class Meta:
        model = Book
        fields = ['name', 'author']


class HighlightSerializer(serializers.ModelSerializer):
    book = BookSerializer()

    class Meta:
        model = Highlight
        fields = ['content', 'book']

    def create(self, validated_data):
        # https://www.django-rest-framework.org/api-guide/serializers/#writing-create-methods-for-nested-representations
        book_data = validated_data.pop('book')
        book_object, _ = Book.objects.get_or_create(**book_data)
        highlight = Highlight.objects.create(**validated_data, book=book_object)
        return highlight


class HighlightListSerializer(serializers.ListSerializer):
    child = HighlightSerializer()

    def create(self, validated_data):
        result = [self.child.create(attrs) for attrs in validated_data]
        return result
