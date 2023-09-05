from django.shortcuts import render
from django.http import JsonResponse
import json
from django.middleware.csrf import get_token
import math
from scipy.stats import norm
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def process_black_scholes(request):
    if request.method == 'POST':
        try:
            form_data = json.loads(request.body)

            print(f'Form data received: {form_data}')

            # Form data
            asset_price = form_data['assetPrice']
            exercise_price = form_data['exercisePrice']
            time_to_expiry = form_data['ttExpiry']
            risk_free_interest_rate = form_data['riskFreeInterestRate']
            volatility = form_data['volatility']
            dividend_yield = form_data['dividendYield']

            call_option_price, put_option_price = calculate_option_price(
                asset_price, exercise_price, time_to_expiry, risk_free_interest_rate, volatility, dividend_yield)

            print(f'The call option price is: {call_option_price}')

            response_data = {'callOptionPrice': call_option_price,
                             'putOptionPrice': put_option_price}
            # response_data = {'message': "Hi"}
            return JsonResponse(response_data)

        except json.JSONDecodeError as e:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)

    return JsonResponse({'error': 'Method not allowed'}, status=405)


def calculate_option_price(asset_price, exercise_price, time_to_expiry, risk_free_interest_rate, volatility, dividend_yield):

    asset_price = float(asset_price)
    exercise_price = float(exercise_price)
    time_to_expiry = float(time_to_expiry)
    risk_free_interest_rate = float(risk_free_interest_rate)/100
    volatility = float(volatility)/100
    dividend_yield = float(dividend_yield)/100
    # Calculate the components of the Black-Scholes formula
    d1 = (math.log(asset_price / exercise_price) + ((risk_free_interest_rate - dividend_yield) +
          (volatility ** 2) / 2) * time_to_expiry) / (volatility * math.sqrt(time_to_expiry))
    d2 = d1 - volatility * math.sqrt(time_to_expiry)

    # Calculate the call option price. Verify. This seems like put price
    call_option_price = asset_price * math.exp(-dividend_yield * time_to_expiry) * norm.cdf(
        d1) - exercise_price * math.exp(-risk_free_interest_rate * time_to_expiry) * norm.cdf(d2)

    # Calculate the put option price (if needed). Verify -> this seems like call price
    put_option_price = exercise_price * math.exp(-risk_free_interest_rate * time_to_expiry) * \
        norm.cdf(-d2) - asset_price * \
        math.exp(-dividend_yield * time_to_expiry) * norm.cdf(-d1)

    print(f'The put option price is: {put_option_price}')
    return call_option_price, put_option_price


def get_csrf_token(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrf_token': csrf_token})
