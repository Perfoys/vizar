# Generated by Django 3.2 on 2021-05-27 13:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_vizar'),
    ]

    operations = [
        migrations.RenameField(
            model_name='vizar',
            old_name='request_text',
            new_name='audio',
        ),
    ]
