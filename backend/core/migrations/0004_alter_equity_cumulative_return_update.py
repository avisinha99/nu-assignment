# Generated by Django 4.1.1 on 2022-09-16 16:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_alter_equity_cumulative_return_update'),
    ]

    operations = [
        migrations.AlterField(
            model_name='equity',
            name='cumulative_return_update',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]