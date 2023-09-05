import { useState } from "react";
import axios from 'axios';
import './css/Form.css';
import './css/ModelTitle.css';
import Price from './Price';
import ModelTitle from './ModelTitle';
import ModelDetails from "./ModelDetails";


const URL_API = 'http://localhost:8000/api'
function BlackScholesForm({ models }) {
    const [formData, setFormData] = useState({ assetPrice: 5, exercisePrice: 5.5, ttExpiry: 3, riskFreeInterestRate: 3.5, volatility: 20, dividendYield: 4.05 });

    const [callOptionPrice, setCallOptionPrice] = useState(null);
    const [putOptionPrice, setPutOptionPrice] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`${URL_API}/black-scholes-form/`, formData);
            setCallOptionPrice(response.data.callOptionPrice);
            setPutOptionPrice(response.data.putOptionPrice);

            console.log("Received back response: " + response.data.callOptionPrice);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container" style={{ height: '750px' }}>

            {/* <ModelTitle modelTitle={models.title} /> */}
            <form onSubmit={handleSubmit}>

                <ModelTitle modelTitle={models.title} />
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
                <Price price={{ callOptionPrice, putOptionPrice }} modelId={models.id} />
            </form>
            <ModelDetails details={models.details} />

        </div>
    );
}

export default BlackScholesForm;
