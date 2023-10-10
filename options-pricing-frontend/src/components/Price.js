import './css/Price.css';

function Price({ price, modelId }) {

    let optionPriceInfo, bondPriceInfo, capmInfo, intrinsicValueInfo, dividendYieldInfo

    if (modelId === 1) {
        const { callOptionPrice, putOptionPrice } = price;
        if (callOptionPrice !== null) {
            const formattedCallOptionPrice = callOptionPrice ? callOptionPrice.toFixed(2) : 'N/A';
            const formattedPutOptionPrice = putOptionPrice ? putOptionPrice.toFixed(2) : 'N/A';
            optionPriceInfo = (
                <div>
                    <h1>The call option price is valued at <span>${formattedCallOptionPrice}</span></h1>
                    <h1>The put option price is valued at <span>${formattedPutOptionPrice}</span></h1>
                </div>
            );
        }
    } else if (modelId === 2) {
        const { expectedRateOfReturn, riskPremium } = price;
        if (expectedRateOfReturn !== null && riskPremium !== null) {
            const formattedExpectedRateOfReturn = expectedRateOfReturn ? expectedRateOfReturn.toFixed(2) : 'N/A';
            const formattedRiskPremium = riskPremium ? riskPremium.toFixed(2) : 'N/A';
            capmInfo = (
                <div>
                    <h1>The risk premium of the asset is  <span>{formattedRiskPremium} %</span></h1>
                    <h1>The expected rate of return is  <span>{formattedExpectedRateOfReturn} %</span></h1>
                </div>
            );
        }
    } else if (modelId === 3) {
        const bondPrice = price;
        if (bondPrice !== null) {
            const formattedBondPrice = bondPrice ? bondPrice.toFixed(2) : 'N/A';
            bondPriceInfo = (
                <div>
                    <h1>The bond price is <span>${formattedBondPrice}</span></h1>
                </div>
            )
        }
    } else if (modelId === 4) {
        const { intrinsicValue, marginOfSafetyValue } = price;
        if (intrinsicValue !== null && marginOfSafetyValue !== null) {
            const formattedIntrinsicValue = intrinsicValue ? intrinsicValue.toFixed(2) : 'N/A';
            const formattedMarginOfSafety = marginOfSafetyValue ? marginOfSafetyValue.toFixed(2) : 'N/A';
            intrinsicValueInfo = (
                <div>
                    <h1>The intrinsic value is  <span>${formattedIntrinsicValue}</span></h1>
                    <h1>The margin of safety is  <span>{formattedMarginOfSafety} %</span></h1>
                </div>
            );
        }
    } else if (modelId === 5) {
        const dividendYield = price;
        if (dividendYield !== null) {
            const formattedDividendYield = dividendYield ? dividendYield.toFixed(2) : 'N/A';
            dividendYieldInfo = (
                <div>
                    <h1>The dividend yield is <span>{formattedDividendYield}%</span></h1>
                </div>
            )
        }
    } else {
        <h1>This is Model C</h1>
    }

    return (
        <div className="options-price">
            {optionPriceInfo}
            {bondPriceInfo}
            {capmInfo}
            {intrinsicValueInfo}
            {dividendYieldInfo}
        </div>

    );
}

export default Price;