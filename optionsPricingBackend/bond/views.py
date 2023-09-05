from django.shortcuts import render
from django.http import JsonResponse
import json
from django.middleware.csrf import get_token
import math
from scipy.stats import norm
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def process_bond_price(request):
    if request.method == 'POST':
        try:
            form_data = json.loads(request.body)

            print(f'Form data received: {form_data}')
            print(f'Form data received: {form_data}')

            # Form data
            face_value = form_data['faceValue']
            annual_coupon_rate = float(form_data['couponRate']) / 100
            coupon_frequency = int(form_data['frequency'])
            years_to_maturity = int(form_data['yearsToMaturity'])
            yield_to_maturity = float(form_data['yieldToMaturity']) / 100

            # Calculate bond price
            coupon_payment = (
                face_value * annual_coupon_rate) / coupon_frequency
            total_periods = years_to_maturity * coupon_frequency
            discount_factor = sum([(1 + (yield_to_maturity / coupon_frequency)) ** (-n)
                                   for n in range(1, total_periods + 1)])
            bond_price = (coupon_payment * (1 - (1 + (yield_to_maturity / coupon_frequency)) ** (-total_periods))) / (
                yield_to_maturity / coupon_frequency) + (face_value / (1 + (yield_to_maturity / coupon_frequency)) ** total_periods)

            response_data = {'bondPrice': bond_price}

            return JsonResponse(response_data)

        except json.JSONDecodeError as e:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)

    return JsonResponse({'error': 'Method not allowed'}, status=405)
