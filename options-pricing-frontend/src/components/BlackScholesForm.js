import { useState } from "react";
import axios from 'axios';
import './css/Form.css';
import './css/ModelTitle.css';
import OptionsPrice from './OptionsPrice';
import ModelTitle from './ModelTitle';


const URL_API = 'http://localhost:8000/api'
function BlackScholesForm() {
    const [formData, setFormData] = useState({ assetPrice: 5, exercisePrice: 5.5, ttExpiry: 3, riskFreeInterestRate: 3.5, volatility: 20, dividendYield: 4.05 });

    const [optionPrice, setOptionPrice] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // alert(`AssetPrice: ${formData.assetPrice}, Exercise Price: ${formData.exercisePrice}, Time to expiry: ${formData.ttExpiry}, Risk-free Interest Rate: ${formData.riskFreeInterestRate}, Volatility: ${formData.volatility}, Dividend Yield: ${formData.dividendYield} `
        // );
        try {
            const response = await axios.post(`${URL_API}/process-form/`, formData);
            setOptionPrice(response.data.optionPrice);

            console.log("Received back response: " + response.data.optionPrice);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <ModelTitle />
            <form onSubmit={handleSubmit}>

                <label htmlFor="assetPrice">Asset Price ($):</label>
                <input type="number" id="assetPrice" name="assetPrice" value={formData.assetPrice} onChange={handleChange} /><br />

                <label htmlFor="exercisePrice">Exercise Price ($):</label>
                <input type="number" id="exercisePrice" name="exercisePrice" value={formData.exercisePrice} onChange={handleChange} /><br />


                <label htmlFor="ttExpiry">Time to Expiry (yrs):</label>
                <input type="number" id="ttExpiry" name="ttExpiry" value={formData.ttExpiry} onChange={handleChange} /><br />


                <label htmlFor="assetPrice">Risk-Free Interest Rate (%):</label>
                <input type="number" id="riskFreeInterestRate" name="riskFreeInterestRate" value={formData.riskFreeInterestRate} onChange={handleChange} /><br />


                <label htmlFor="assetPrice">Volatility:</label>
                <input type="number" id="volatility" name="volatility" value={formData.volatility} onChange={handleChange} /><br />


                <label htmlFor="assetPrice">Dividend Yield (%):</label>
                <input type="number" id="dividendYield" name="dividendYield" value={formData.dividendYield} onChange={handleChange} /><br />


                <button type="submit">Submit</button>
            </form>
            <OptionsPrice optionPrice={optionPrice} />
        </div>
    );
}

export default BlackScholesForm;
