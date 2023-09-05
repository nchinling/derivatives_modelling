import './App.css';
import { useEffect } from 'react';
import BlackScholesForm from './components/BlackScholesForm';
import BondPricingForm from './components/BondPricingForm';
import CAPMForm from './components/CAPMForm';
import Models from './components/Models';
import Title from './components/Title';
import modelsData from './modelsData';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  useEffect(() => {

    document.title = 'Financial Modelling';

  }, []);

  return (

    <div className="App">

      <Title />

      <Router>
        <div className="container">
          <Models models={modelsData} />
          <Routes>
            <Route path="/calculator/black-scholes" element={<BlackScholesForm models={modelsData[0]} />} />
            <Route path="/calculator/capm" element={<CAPMForm models={modelsData[1]} />} />
            <Route path="/calculator/bond-pricing" element={<BondPricingForm models={modelsData[2]} />} />
          </Routes>

        </div>

      </Router>


    </div >
  );
}

export default App;
