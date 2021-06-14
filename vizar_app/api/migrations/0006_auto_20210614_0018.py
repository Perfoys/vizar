# Generated by Django 3.2 on 2021-06-13 21:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_session'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Vizar',
        ),
        migrations.RemoveField(
            model_name='log',
            name='audio_num',
        ),
        migrations.RemoveField(
            model_name='log',
            name='author',
        ),
        migrations.AddField(
            model_name='log',
            name='author_name',
            field=models.CharField(default=' ', max_length=100, unique=True),
        ),
    ]