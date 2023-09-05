import { useState } from "react";
import axios from 'axios';
import './css/Form.css';
import './css/ModelTitle.css';
import Price from './Price';
import ModelTitle from './ModelTitle';
import ModelDetails from './ModelDetails';


const URL_API = 'http://localhost:8000/api'
function CAPMForm({ models }) {

    // const [formData, setFormData] = useState({ assetPrice: 5, exercisePrice: 5.5, ttExpiry: 3, riskFreeInterestRate: 3.5, volatility: 20, dividendYield: 4.05 });

    // const [callOptionPrice, setCallOptionPrice] = useState(null);
    // const [putOptionPrice, setPutOptionPrice] = useState(null);

    // const handleChange = (event) => {
    //     const { name, value } = event.target;
    //     setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    // };

    const [formData, setFormData] = useState({ riskFreeInterestRate: 4, marketReturn: 10, beta: 0.75 });

    const [expectedRateOfReturn, setExpectedRateOfReturn] = useState(null);
    const [riskPremium, setRiskPremium] = useState(null);


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`${URL_API}/capm-form/`, formData);
            setExpectedRateOfReturn(response.data.expectedRateOfReturn);
            setRiskPremium(response.data.riskPremium);

            console.log("Received back response: " + response.data.expectedRateOfReturn);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container" style={{ height: '750px' }}>
            <form onSubmit={handleSubmit}>

                <ModelTitle modelTitle={models.title} />
                <label htmlFor="riskFreeInterestRate">Risk-free Interest Rate (%):</label>
                <input type="number" id="riskFreeInterestRate" name="riskFreeInterestRate" value={formData.riskFreeInterestRate} onChange={handleChange} /><br />

                <label htmlFor="marketReturn">Broad market return (%):</label>
                <input type="number" id="marketReturn" name="marketReturn" value={formData.marketReturn} onChange={handleChange} /><br />


                <label htmlFor="beta">Beta (&beta;) (%):</label>
                <input type="number" id="beta" name="beta" value={formData.beta} onChange={handleChange} /><br />



                <button type="submit">Submit</button>
                <Price price={{ expectedRateOfReturn, riskPremium }} modelId={models.id} />
            </form>
            <ModelDetails details={models.details} />

        </div>
    );
}

export default CAPMForm;
