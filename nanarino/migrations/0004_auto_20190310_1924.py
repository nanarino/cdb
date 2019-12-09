# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2019-03-10 11:24
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('nanarino', '0003_auto_20190310_1824'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='motif',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='nanarino.Motif'),
        ),
        migrations.AddField(
            model_name='article',
            name='writer',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='article',
            name='title',
            field=models.CharField(default='无题', max_length=20),
        ),
        migrations.AlterField(
            model_name='motif',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='motif',
            name='motif',
            field=models.CharField(default='杂谈', max_length=20, unique=True),
        ),
    ]