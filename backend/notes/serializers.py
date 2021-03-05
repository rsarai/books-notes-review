from rest_framework import serializers

from notes.models import Tag, Book, Highlight


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'


class BookSerializer(serializers.ModelSerializer):

    class Meta:
        model = Book
        fields = ['id', 'name', 'author']


class HighlightSerializer(serializers.ModelSerializer):
    book = BookSerializer()

    class Meta:
        model = Highlight
        fields = ['id', 'content', 'book', 'favorite']

    def create(self, validated_data):
        # https://www.django-rest-framework.org/api-guide/serializers/#writing-create-methods-for-nested-representations
        book_data = validated_data.pop('book')
        book_object, _ = Book.objects.get_or_create(**book_data)
        highlight = Highlight.objects.create(**validated_data, book=book_object)
        return highlight

    def update(self, instance, validated_data):
        #  https://www.django-rest-framework.org/api-guide/serializers/#writing-update-methods-for-nested-representations
        book_data = validated_data.pop('book')
        book_object, _ = Book.objects.get_or_create(**book_data)

        instance.book = book_object
        instance.content = validated_data.get('content', instance.content)
        instance.favorite = validated_data.get('favorite', instance.favorite)
        instance.save()

        return instance


class HighlightListSerializer(serializers.ListSerializer):
    child = HighlightSerializer()

    def create(self, validated_data):
        result = [self.child.create(attrs) for attrs in validated_data]
        return result
