import { useState } from "react";
import axios from 'axios';
import './css/Form.css';
import './css/ModelTitle.css';
import Price from './Price';
import ModelTitle from './ModelTitle';
import ModelDetails from "./ModelDetails";


const URL_API = 'http://localhost:8000/api'
function IntrinsicValueForm({ models }) {
    const [formData, setFormData] = useState({ earningsPerShare: 23, annualGrowthRate: 10, corporateBondYield: 3.7, currentPrice: 500 });

    const [intrinsicValue, setIntrinsicValue] = useState(null);
    const [marginOfSafetyValue, setMarginofSafetyValue] = useState(null)

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`${URL_API}/intrinsic-value-form/`, formData);
            setIntrinsicValue(response.data.intrinsicValue);
            setMarginofSafetyValue(response.data.marginOfSafetyValue);

            console.log("Received back response: " + response.data.intrinsicValue);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container" style={{ height: '750px' }}>

            <form onSubmit={handleSubmit}>

                <ModelTitle modelTitle={models.title} />
                <label htmlFor="earningsPerShare">Earnings Per Share ($):</label>
                <input type="number" id="earningsPerShare" name="earningsPerShare" value={formData.earningsPerShare} onChange={handleChange} /><br />

                <label htmlFor="annualGrowthRate">Annual Growth Rate (%):</label>
                <input type="number" id="annualGrowthRate" name="annualGrowthRate" value={formData.annualGrowthRate} onChange={handleChange} /><br />

                <label htmlFor="corporateBondYield">Corporate Bond Yield (%):</label>
                <input type="number" id="corporateBondYield" name="corporateBondYield" value={formData.corporateBondYield} onChange={handleChange} /><br />


                <label htmlFor="currentPrice">Current Price ($):</label>
                <input type="number" id="currentPrice" name="currentPrice" value={formData.currentPrice} onChange={handleChange} /><br />


                <button type="submit">Submit</button>
                <Price price={{ intrinsicValue, marginOfSafetyValue }} modelId={models.id} />
            </form>
            <ModelDetails details={models.details} />

        </div>
    );
}

export default IntrinsicValueForm;