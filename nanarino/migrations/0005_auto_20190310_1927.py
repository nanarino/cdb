# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2019-03-10 11:27
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('nanarino', '0004_auto_20190310_1924'),
    ]

    operations = [
        migrations.RenameField(
            model_name='article',
            old_name='text',
            new_name='content',
        ),
    ]