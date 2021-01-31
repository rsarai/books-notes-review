from django.core import management

from book_notes_review import celery_app


@celery_app.task
def clearsessions():
    management.call_command('clearsessions')
