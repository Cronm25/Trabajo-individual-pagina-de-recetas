import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css"
export default function LandingPage(){
    return(
        <div className="landing">
            <h1>Las recetas de Cronm</h1>
            <Link to = "/home">
            <button class="myButton">Ingresar</button>
            </Link>
        </div>
    )
        
    
}