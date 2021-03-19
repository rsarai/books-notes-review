from django.db import models
from django.utils import timezone
from common.models import IndexedTimeStampedModel
from model_utils import Choices
from django_random_queryset import RandomManager

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


RETRIEVAL_FREQUENCY = Choices(
    ('initial', 'Unset'),
    ('never', 'Never'),
    ('soon', 'Soon'),
    ('later', 'Later'),
    ('someday', 'Someday'),
    ('random', 'Surprise Me'),
)


class Highlight(IndexedTimeStampedModel):
    objects = RandomManager()
    book = models.ForeignKey(
        Book, related_name="highlights", on_delete=models.CASCADE
    )
    content = models.TextField()
    tags = models.ManyToManyField(Tag, related_name="highlights", blank=True)
    favorite = models.BooleanField(default=False)
    should_be_reviewed = models.BooleanField(null=True)
    frequency = models.CharField(
        max_length=255,
        choices=RETRIEVAL_FREQUENCY,
        default=RETRIEVAL_FREQUENCY.initial,
    )
    last_reviewed_date = models.DateTimeField(auto_now_add=True, null=True)
    reviews_count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.book.name}: {self.content}"


class Note(IndexedTimeStampedModel):
    content = models.TextField()
    book = models.ForeignKey(
        Book, related_name="notes", on_delete=models.CASCADE, blank=True, null=True
    )
    highlight = models.ForeignKey(
        Highlight, related_name="notes", on_delete=models.CASCADE, blank=True, null=True
    )

    def __str__(self):
        return f"{self.content}"


class Quiz(IndexedTimeStampedModel):
    question = models.CharField(max_length=255, blank=False, null=False)
    answer = models.TextField(blank=False, null=False)
    highlight = models.ForeignKey(Highlight, related_name="quizzes", on_delete=models.CASCADE)
