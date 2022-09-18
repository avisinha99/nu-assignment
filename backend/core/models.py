from django.db import models

# Create your models here.


class Equity(models.Model):
    id = models.IntegerField(primary_key=True, unique=True)
    name = models.CharField(max_length=255, help_text="Enter equity name")
    ticker = models.CharField(max_length=255, help_text="Enter ticker name")
    description = models.TextField(null=True)
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    sector = models.CharField(max_length=255)
    industry = models.CharField(max_length=255)
    employees_count = models.IntegerField(null=True, default=0)
    sic_no = models.IntegerField(null=True)
    location = models.CharField(max_length=255, null=True)
    exchange_id = models.IntegerField(null=True)
    cik_no = models.IntegerField(null=True)
    cusip = models.IntegerField(null=True)
    currency_id = models.IntegerField(null=True)
    data_source_id = models.IntegerField(null=True)
    ckr_log = models.CharField(max_length=255)
    similar_fund_log = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    company_name = models.CharField(max_length=255)
    phone_no = models.CharField(max_length=13)
    website = models.CharField(max_length=255)
    is_active = models.BooleanField(choices=[(True, 't'), (False, 'f')])
    url_slug = models.SlugField(max_length=128)
    delisted_date = models.DateField(null=True)
    delisted_reason = models.TextField(blank=True, null=True)
    image_name = models.CharField(max_length=255)
    image_aspect_ratio = models.FloatField(default=1)
    cumulative_return_update = models.DateTimeField(null=True, blank=True)


class DailyReturns(models.Model):
    equity_id = models.ForeignKey(
        Equity, to_field='id', on_delete=models.CASCADE)
    date = models.DateField()
    returns = models.FloatField(default=0.0)
    open = models.FloatField(default=0.0)
    high = models.FloatField(default=0.0)
    low = models.FloatField(default=0.0)
    close = models.FloatField(default=0.0)
    adj_close = models.FloatField(default=0.0)
