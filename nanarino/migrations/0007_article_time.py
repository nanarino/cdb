# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2019-03-10 15:28
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('nanarino', '0006_auto_20190310_2226'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='time',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]