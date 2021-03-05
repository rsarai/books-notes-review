# Generated by Django 2.2.17 on 2021-02-27 00:19

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import model_utils.fields


class Migration(migrations.Migration):

    dependencies = [
        ('notes', '0003_auto_20210221_1808'),
    ]

    operations = [
        migrations.AddField(
            model_name='highlight',
            name='frequency',
            field=models.CharField(choices=[('initial', 'Unset'), ('never', 'Never'), ('soon', 'Soon'), ('later', 'Later'), ('someday', 'Someday'), ('random', 'Surprise Me')], default='initial', max_length=255),
        ),
        migrations.AddField(
            model_name='highlight',
            name='last_reviewed_date',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AddField(
            model_name='highlight',
            name='reviews_count',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='highlight',
            name='should_be_reviewed',
            field=models.BooleanField(null=True),
        ),
        migrations.CreateModel(
            name='Quiz',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(db_index=True, default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(db_index=True, default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('question', models.CharField(max_length=255)),
                ('answer', models.TextField()),
                ('highlight', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='quizzes', to='notes.Highlight')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]