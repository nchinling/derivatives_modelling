import { useState } from "react";
import axios from 'axios';
import './css/Form.css';
import './css/ModelTitle.css';
import Price from './Price';
import ModelTitle from './ModelTitle';
import ModelDetails from './ModelDetails';


const URL_API = 'http://localhost:8000/api'
function DividendYieldForm({ models }) {
    const [formData, setFormData] = useState({ dividendsPerPeriod: 3, dividendFrequency: 1, sharePrice: 100 });

    const [dividendYield, setDividendYield] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        const selectedFrequency = parseFloat(value, 10);
        setFormData((prevFormData) => ({ ...prevFormData, [name]: selectedFrequency }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`${URL_API}/dividend-yield-form/`, formData);
            setDividendYield(response.data.dividendYield);

            console.log("Received back response: " + response.data.dividendYield);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container" style={{ height: '750px' }}>

            <form onSubmit={handleSubmit}>

                <ModelTitle modelTitle={models.title} />
                <label htmlFor="dividendsPerPeriod">Dividends Per Period ($):</label>
                <input type="number" id="dividendsPerPeriod" name="dividendsPerPeriod" value={formData.dividendsPerPeriod} onChange={handleChange} /><br />


                <label htmlFor="dividendFrequency">Frequency:</label>
                <select id="dividendFrequency" name="dividendFrequency" value={formData.dividendFrequency} onChange={handleChange} style={{ width: '55%', height: '5%' }}>
                    <option value="1">Annual</option>
                    <option value="2">Semi-annual</option>
                    <option value="3">Quarterly</option>
                    <option value="12">Monthly</option>
                </select>
                <br /><br />


                <label htmlFor="sharePrice">Share Price ($):</label>
                <input type="number" id="sharePrice" name="sharePrice" value={formData.sharePrice} onChange={handleChange} /><br />


                <button type="submit">Submit</button>
                <Price price={dividendYield} modelId={models.id} />
            </form>
            <ModelDetails details={models.details} />

        </div>
    );
}

export default DividendYieldForm;
