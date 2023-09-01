import './App.css';
import BlackScholesForm from './components/BlackScholesForm';
import Models from './components/Models';
import Title from './components/Title';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


function App() {
  return (

    <div className="App">
      {/* <NavBar /> */}
      {/* <Models /> */}
      <Title />
      <Models />
      <BlackScholesForm />

      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/black-scholes">Go to Black-Scholes Form</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/black-scholes" element={<BlackScholesForm />} />
          </Routes>
        </div>
      </Router>


    </div >
  );
}

export default App;
