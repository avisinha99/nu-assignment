# Generated by Django 4.1.1 on 2022-09-16 16:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0006_alter_equity_end_date_alter_equity_start_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='equity',
            name='employees_count',
            field=models.IntegerField(default=0, null=True),
        ),
    ]
