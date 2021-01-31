web: gunicorn book_notes_review.wsgi --chdir backend --limit-request-line 8188 --log-file -
worker: celery worker --workdir backend --app=book_notes_review -B --loglevel=info
