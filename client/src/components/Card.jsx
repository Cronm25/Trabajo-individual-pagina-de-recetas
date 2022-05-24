import React from "react";
import "./Card.css"
import { Link } from "react-router-dom";


export default function Card({ nombre, id, diets, image, createdInDb}) {

    return (
        //<div className="cardContainer">
        //        <div className="cardBody">
        //            <h1 className="cardTitle">{nombre}</h1> 
        //            <img src={image} alt="not found" width="300px" height="300px" className="cardMedia" />
        //            <ul className="cardDescription subtle">{!createdInDb?diets.map(d => (<li key={d}>{d}</li>)) :diets.map(d => (<li key={d.name}>{d.name}</li>))}</ul>      
        //            <div >
        //                <Link to={'/recipe/' + id} className="Boton">
        //                En detalle</Link>
        //            </div>
        //        </div>
        //</div>
        
                <div className="cardContainer">
                    <h1 className="cardTitle" >{nombre}</h1> 
                    <img src={image} alt="not found" width="200px" height= "210px" className="image" />
                    <ul className="cardDescription">{!createdInDb?diets.map(d => (<li key={d}>{d}</li>)) :diets.map(d => (<li key={d.name}>{d.name}</li>))}</ul>      
                    <div >
                        <Link to={'/recipe/' + id} className="Boton">
                        En detalle</Link>
                    </div>
                </div>
    )
}