# Generated by Django 4.1.1 on 2022-09-16 19:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0010_alter_equity_id_dailyreturns'),
    ]

    operations = [
        migrations.RenameField(
            model_name='equity',
            old_name='ID',
            new_name='id',
        ),
    ]