# Generated by Django 3.2 on 2021-05-27 13:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20210526_2018'),
    ]

    operations = [
        migrations.CreateModel(
            name='Vizar',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('author_name', models.CharField(max_length=100)),
                ('request_text', models.BinaryField()),
            ],
        ),
    ]
