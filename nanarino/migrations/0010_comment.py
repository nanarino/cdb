# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2019-04-19 03:13
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('nanarino', '0009_album'),
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('time', models.DateTimeField(auto_now_add=True, null=True)),
                ('content', models.TextField(max_length=128)),
                ('album', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='nanarino.Album')),
                ('article', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='nanarino.Article')),
                ('writer', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
