# Generated by Django 3.2 on 2021-05-27 14:23

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_rename_request_text_vizar_audio'),
    ]

    operations = [
        migrations.CreateModel(
            name='Session',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('session', models.CharField(default=api.models.generate_unique_code, max_length=8, unique=True)),
                ('date', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]