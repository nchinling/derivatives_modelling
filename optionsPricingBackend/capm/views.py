from django.shortcuts import render

from django.shortcuts import render
from django.http import JsonResponse
import json
from django.middleware.csrf import get_token
import math
from scipy.stats import norm
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def process_capm(request):
    if request.method == 'POST':
        try:
            form_data = json.loads(request.body)
            print(f'Form data received: {form_data}')

            # Form data
            risk_free_interest_rate = float(
                form_data['riskFreeInterestRate'])/100
            broad_market_return = float(form_data['marketReturn']) / 100
            beta = float(form_data['beta'])

            # Calculate expected rate of return
            # risk premium = beta × (market risk premium)
            # market risk premium = Rm - Rf
            # R = Rf + beta × (Rm - Rf)

            expected_rate_of_return = (risk_free_interest_rate +
                                       beta*(broad_market_return-risk_free_interest_rate))*100

            market_risk_premium = broad_market_return - risk_free_interest_rate

            risk_premium = (beta*market_risk_premium)*100

            response_data = {
                'expectedRateOfReturn': expected_rate_of_return, 'riskPremium': risk_premium}

            return JsonResponse(response_data)

        except json.JSONDecodeError as e:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)

    return JsonResponse({'error': 'Method not allowed'}, status=405)
