import csv
from datetime import datetime
from django.utils import dateparse
from symbol import except_clause
from core.models import Equity, DailyReturns


def convert(val, type):
    '''Use only for primitive datatypes like int, char, float. Not for Date or other objects'''
    try:
        return eval(f"{type}({val})")
    except:
        return None


def run():
    with open('../../equities.csv') as file:
        reader = csv.DictReader(file)
        next(reader)  # Advance past the header

        Equity.objects.all().delete()

        for row in reader:
            equity = Equity(id=row['id'],
                            name=row['name'],
                            ticker=row['ticker'],
                            description=row['description'],
                            start_date=datetime.strptime(
                                row['start_date'], "%Y-%m-%d").date() if row['start_date'] else None,
                            end_date=datetime.strptime(
                                row['end_date'], "%Y-%m-%d").date() if row['end_date'] else None,
                            sector=row['sector'],
                            industry=row['industry'],
                            employees_count=convert(
                                row['employees_count'], 'int'),
                            sic_no=convert(row['sic_no'], 'int'),
                            location=row['location'],
                            exchange_id=row['exchange_id'],
                            cik_no=convert(row['cik_no'], 'int'),
                            cusip=convert(row['cusip'], 'int'),
                            currency_id=convert(row['currency_id'], int),
                            data_source_id=convert(row['data_source_id'], int),
                            ckr_log=row['ckr_log'],
                            similar_fund_log=row['similar_fund_log'],
                            address=row['address'],
                            company_name=row['company_name'],
                            phone_no=row['phone_no'],
                            website=row['website'],
                            is_active=row['is_active'],
                            url_slug=row['url_slug'],
                            delisted_date=datetime.strptime(
                                row['delisted_date'], "%Y-%m-%d").date() if row['delisted_date'] else None,
                            delisted_reason=row['delisted_reason'],
                            image_name=row['image_name'],
                            image_aspect_ratio=row['image_aspect_ratio'],
                            cumulative_return_update=dateparse.parse_datetime(
                                row['cumulative_return_update']) if row['cumulative_return_update'] else None
                            # cumulative_return_update=datetime.strptime(
                            #     row['cumulative_return_update'][:-3], "%Y-%m-%d %H-%M-%S.%f").date() if row['cumulative_return_update'] else None
                            # 2019-01-21 07:49:35.965767+00
                            )
            equity.save()

    with open('../../daily_returns.csv') as file:
        reader = csv.DictReader(file)
        next(reader)  # Advance past the header

        DailyReturns.objects.all().delete()

        for row in reader:
            e_obj, truth = Equity.objects.get_or_create(
                id=row['equity_id'])
            daily_return = DailyReturns(
                date=row['date'],
                returns=row['returns'],
                equity_id=e_obj,
                open=row['open'],
                high=row['high'],
                low=row['low'],
                close=row['close'],
                adj_close=row['adj_close']
            )
            daily_return.save()
