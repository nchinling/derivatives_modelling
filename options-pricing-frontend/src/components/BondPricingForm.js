import { useState } from "react";
import axios from 'axios';
import './css/Form.css';
import './css/ModelTitle.css';
import Price from './Price';
import ModelTitle from './ModelTitle';
import ModelDetails from './ModelDetails';


const URL_API = 'http://localhost:8000/api'
function BondPricingForm({ models }) {
    const [formData, setFormData] = useState({ faceValue: 1000, couponRate: 5.5, frequency: 1, yearsToMaturity: 5, yieldToMaturity: 4 });

    const [bondPrice, setBondPrice] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        // convert frequency to integer
        const selectedFrequency = parseFloat(value, 10);
        setFormData((prevFormData) => ({ ...prevFormData, [name]: selectedFrequency }));
        // const selectedFrequency = parseInt(event.target.value, 10);
        // setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`${URL_API}/bond-price-form/`, formData);
            setBondPrice(response.data.bondPrice);

            console.log("Received back response: " + response.data.bondPrice);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container" style={{ height: '750px' }}>

            {/* <ModelTitle modelTitle={models.title} /> */}
            <form onSubmit={handleSubmit}>

                <ModelTitle modelTitle={models.title} />
                <label htmlFor="faceValue">Face value ($):</label>
                <input type="number" id="faceValue" name="faceValue" value={formData.faceValue} onChange={handleChange} /><br />

                <label htmlFor="couponRate">Coupon rate (%):</label>
                <input type="number" id="couponRate" name="couponRate" value={formData.couponRate} onChange={handleChange} /><br />

                <label htmlFor="frequency">Frequency:</label>
                <select id="frequency" name="frequency" value={formData.frequency} onChange={handleChange} style={{ width: '55%', height: '5%' }}>
                    <option value="1">Annual</option>
                    <option value="2">Semi-annual</option>
                    <option value="3">Quarterly</option>
                    <option value="12">Monthly</option>
                </select>
                <br /><br />


                <label htmlFor="yearsToMaturity">Years to maturity:</label>
                <input type="number" id="yearsToMaturity" name="yearsToMaturity" value={formData.yearsToMaturity} onChange={handleChange} /><br />


                <label htmlFor="yieldToMaturity">Yield to maturity:</label>
                <input type="number" id="yieldToMaturity" name="yieldToMaturity" value={formData.yieldToMaturity} onChange={handleChange} /><br />

                <button type="submit">Submit</button>
                <Price price={bondPrice} modelId={models.id} />
            </form>
            <ModelDetails details={models.details} />

        </div>
    );
}

export default BondPricingForm;
