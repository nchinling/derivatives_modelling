import Cards from './Cards';
import './css/ModelTitle.css';
import './css/Models.css';
import { Link } from 'react-router-dom';

const calculatorRoutePaths = {
    1: 'black-scholes',
    2: 'capm',
    3: 'bond-pricing',

};

function Models({ models }) {
    const cards = models.map((model) => (
        <Link key={model.id} to={`/calculator/${calculatorRoutePaths[model.id]}`}>
            <Cards key={model.id} model={model} />
        </Link>
    ));

    return (
        <div className="cards-container">
            {cards}
        </div>
    );
}

export default Models;