from rest_framework import serializers
from .models import *


class EquitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Equity
        fields = ('id', 'name', 'ticker', 'description', 'start_date', 'end_date', 'sector', 'industry', 'employees_count', 'sic_no', 'location', 'exchange_id', 'cik_no', 'cusip', 'currency_id', 'data_source_id',
                  'ckr_log', 'similar_fund_log', 'address', 'company_name', 'phone_no', 'website', 'is_active', 'url_slug', 'delisted_date', 'delisted_reason', 'image_name', 'image_aspect_ratio', 'cumulative_return_update')


class DailyReturnsSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyReturns
        fields = ('date', 'returns', 'equity_id', 'open',
                  'high', 'low', 'close', 'adj_close')
