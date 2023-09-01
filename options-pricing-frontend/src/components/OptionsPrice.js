import './css/OptionsPrice.css';

function OptionsPrice({ optionPrice }) {
    const formattedOptionPrice = optionPrice ? optionPrice.toFixed(2) : 'N/A';
    return (
        <div className="options-price">
            <p>The options price is valued at <span>${formattedOptionPrice}</span></p>
        </div>

    );
}

export default OptionsPrice;