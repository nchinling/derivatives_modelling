from django.shortcuts import render
from django.http import JsonResponse
import json
from django.middleware.csrf import get_token
import math
from scipy.stats import norm
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def process_dividend_yield(request):
    if request.method == 'POST':
        try:
            form_data = json.loads(request.body)
            print(f'Form data received: {form_data}')

            # Form data
            dividends_per_period = float(
                form_data['dividendsPerPeriod'])
            dividend_frequency = float(form_data['dividendFrequency'])
            share_price = float(form_data['sharePrice'])

            annual_dividends = dividends_per_period*dividend_frequency
            dividend_yield = (annual_dividends/share_price)*100

            response_data = {
                'dividendYield': dividend_yield}

            return JsonResponse(response_data)

        except json.JSONDecodeError as e:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)

    return JsonResponse({'error': 'Method not allowed'}, status=405)
