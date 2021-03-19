from rest_framework import serializers

from notes.models import Tag, Book, Highlight, Note


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'


class BookSerializer(serializers.ModelSerializer):
    highlights_count = serializers.SerializerMethodField(read_only=True)
    created = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Book
        fields = ['id', 'name', 'author', 'highlights_count', 'created']

    def get_highlights_count(self, obj):
        return obj.highlights.count()

    def get_created(self, obj):
        return obj.created


class NoteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Note
        fields = ['id', 'content']


class HighlightSerializer(serializers.ModelSerializer):
    book = BookSerializer()
    notes = NoteSerializer(many=True, required=False)

    class Meta:
        model = Highlight
        fields = ['id', 'content', 'book', 'favorite', 'notes']

    def create(self, validated_data):
        # https://www.django-rest-framework.org/api-guide/serializers/#writing-create-methods-for-nested-representations
        book_data = validated_data.pop('book')
        book_object, _ = Book.objects.get_or_create(**book_data)

        note_data = validated_data.pop('notes')
        highlight = Highlight.objects.create(**validated_data, book=book_object)

        if note_data:
            _ = [
                Note.objects.get_or_create(
                    **note_data, highlight=highlight
                )
                for attrs in note_data
            ]

        return highlight

    def update(self, instance, validated_data):
        #  https://www.django-rest-framework.org/api-guide/serializers/#writing-update-methods-for-nested-representations
        book_data = validated_data.pop('book', None)
        if book_data:
            book_object, _ = Book.objects.get_or_create(**book_data)
            instance.book = book_object

        instance.content = validated_data.get('content', instance.content)
        instance.favorite = validated_data.get('favorite', instance.favorite)
        instance.save()

        note_data = validated_data.get('notes')
        if note_data:
            for attrs in note_data:
                note_object, created = Note.objects.get_or_create(**attrs, highlight=instance)
                if not created:
                    note_object.content = attrs.get("content")
                    note_object.save()

        return instance


class HighlightListSerializer(serializers.ListSerializer):
    child = HighlightSerializer()

    def create(self, validated_data):
        result = [self.child.create(attrs) for attrs in validated_data]
        return result


class BookDetailSerializer(serializers.ModelSerializer):
    highlights = HighlightListSerializer()

    class Meta:
        model = Book
        fields = ['id', 'name', 'author', 'highlights']
