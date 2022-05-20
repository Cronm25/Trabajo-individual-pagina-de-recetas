import React from "react";
import "./Card.css"
import { Link } from "react-router-dom";


export default function Card({ img, name, diet, id }) {
    return (
        <div className="container">
            <div className="Card">
                    <h1>{name}</h1>
                    <img src={img} alt="not found" width="300px" height="300px" className="cardMedia" />
                    <ul>{diet.map(d => <li key={d.name}>{d.name}</li>)}</ul>
                    <div >
                        <Link to={'/recipe/' + id} className="Boton">
                        En detalle</Link>
                    </div>
                    <img src={img} alt="not found" width="300px" height="300px" className="cardMedia" />
                    </div>
        </div>
        
    )
}