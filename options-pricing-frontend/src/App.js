import './App.css';
import BlackScholesForm from './components/BlackScholesForm';
import BondPricingForm from './components/BondPricingForm';
import CAPMForm from './components/CAPMForm';
import IntrinsicValueForm from './components/IntrinsicValueForm';
import DividendYieldForm from './components/DividendYieldForm';
import Models from './components/Models';
import Title from './components/Title';
import modelsData from './modelsData';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {

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
            <Route path="/calculator/intrinsic-value" element={<IntrinsicValueForm models={modelsData[3]} />} />
            <Route path="/calculator/dividend-yield" element={<DividendYieldForm models={modelsData[4]} />} />
          </Routes>

        </div>

      </Router>


    </div >
  );
}

export default App;
