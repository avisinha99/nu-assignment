# Generated by Django 4.1.1 on 2022-09-16 16:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_alter_equity_end_date_alter_equity_start_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='equity',
            name='end_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='equity',
            name='start_date',
            field=models.DateField(blank=True, null=True),
        ),
    ]
