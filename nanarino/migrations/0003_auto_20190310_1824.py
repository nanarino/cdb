# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2019-03-10 10:24
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('nanarino', '0002_auto_20190310_1820'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='article',
            name='motif',
        ),
        migrations.RemoveField(
            model_name='article',
            name='writer',
        ),
    ]