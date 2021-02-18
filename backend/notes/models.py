from django.db import models
from common.models import IndexedTimeStampedModel


class Tag(IndexedTimeStampedModel):
    name = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.name}"


class Book(IndexedTimeStampedModel):
    name = models.CharField(max_length=255)
    author = models.CharField(max_length=255, blank=True)
    tags = models.ManyToManyField(Tag, related_name="books", blank=True)

    def __str__(self):
        return f"{self.name}"


class Highlight(IndexedTimeStampedModel):
    book = models.ForeignKey(
        Book, related_name="highlights", on_delete=models.CASCADE
    )
    content = models.TextField()
    tags = models.ManyToManyField(Tag, related_name="highlights", blank=True)

    def __str__(self):
        return f"{self.book.name}: {self.content}"


class Note(IndexedTimeStampedModel):
    content = models.TextField()
    book = models.ForeignKey(
        Book, related_name="notes", on_delete=models.CASCADE, blank=True
    )
    highlight = models.ForeignKey(
        Highlight, related_name="notes", on_delete=models.CASCADE, blank=True
    )

    def __str__(self):
        return f"{self.content}"
