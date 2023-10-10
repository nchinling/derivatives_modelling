from django.shortcuts import render
from django.http import JsonResponse
import json
from django.middleware.csrf import get_token
import math
from scipy.stats import norm
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def process_intrinsic_value(request):
    if request.method == 'POST':
        try:
            form_data = json.loads(request.body)
            print(f'Form data received: {form_data}')

            # Form data
            earnings_pers_share = float(
                form_data['earningsPerShare'])
            annual_growth_rate = float(form_data['annualGrowthRate'])
            corporate_bond_yield = float(form_data['corporateBondYield'])
            current_price = float(form_data['currentPrice'])

            intrinsic_value = earnings_pers_share * \
                (8.5+2*annual_growth_rate)*4.4/corporate_bond_yield

            margin_of_safety = ((
                intrinsic_value - current_price)/intrinsic_value)*100

            response_data = {
                'intrinsicValue': intrinsic_value, 'marginOfSafetyValue': margin_of_safety}

            return JsonResponse(response_data)

        except json.JSONDecodeError as e:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)

    return JsonResponse({'error': 'Method not allowed'}, status=405)
