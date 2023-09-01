import Cards from './Cards';
import './css/ModelTitle.css';
import './css/Models.css';

const models = [
    { title: 'Black-Scholes Option Pricing Calculator', isDone: true, id: 1, desc: 'It calculates option price using the Black-Scholes model', image: 'options' },
    { title: 'Fixed-Income Calculator', isDone: false, id: 2, image: 'bonds' },
    { title: 'Loan Calculator', isDone: false, id: 3, image: 'cashflow' },
];

function Models() {
    const cards = models.map((model) => (
        <Cards key={model.id} model={model} />
    ));

    return (
        <div className="cards-container">
            {cards}
        </div>
    );
}

export default Models;