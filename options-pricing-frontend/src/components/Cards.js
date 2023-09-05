import './css/Cards.css';


function Cards({ model }) {

    return (

        <div className="card-container">
            <div className="flip-card">
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <h3>{model.title}</h3>
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