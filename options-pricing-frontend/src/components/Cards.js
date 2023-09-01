import './css/Cards.css';
import bonds from '../images/bonds.png'
import options from '../images/options.png'
import cashflow from '../images/cashflow.png'


function Cards({ model }) {

    let imageSrc;

    if (model.image === 'bonds') {
        imageSrc = bonds;
    } else if (model.image === 'options') {
        imageSrc = options;
    } else if (model.image === 'cashflow') {
        imageSrc = cashflow;
    } else {
        // Provide a default image source or handle this case as needed
        imageSrc = ''; // You can specify a default image source here
    }
    return (

        <div className="card-container">
            <div className="flip-card">
                <div className="flip-card-inner">
                    <div className="flip-card-front">

                        <img src={imageSrc} alt={model.title} style={{ width: '200px', height: '200px' }} />
                    </div>
                    <div className="flip-card-back">
                        <h3>{model.title}</h3>
                        <p>{model.desc}</p>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Cards;