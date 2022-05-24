import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getDetalle } from "../actions";
import NavBar from "./NavBar";
import "./Detalles_.css"

export default function RecipeDetail() {
    const dispatch = useDispatch();
    const { id } = useParams();
    useEffect(() => {
        dispatch(getDetalle(id));
    }, [dispatch, id]);

    const Receta = useSelector(state => state.Detalle)
    console.log(Receta);
    return (
        <div>
        <NavBar/>
        <div className="component">{
            Receta.nombre ?
                    <div>
                        <h1 className="title">{Receta.nombre}</h1>
                        <div className="imgContainer">
                            <img src={Receta.image} alt='img not found'
                                width="500px" height="400px" className="img" />
                        </div>
                        <div className="detailContainer">
                            <h3 className="h3">Puntuacion: {Receta.spoonacularScore} </h3>
                            <h3 className="h3">Nivel saludable: {Receta.healthScore} </h3>
                            <h3 className="h3">Paso_a_paso:</h3>
                            {!Receta.createdInDb?<p className="p" dangerouslySetInnerHTML={{ __html: Receta.analyzedInstructions }}></p>:<p className="p">{Receta.analyzedInstructions}</p>}
                            <h3 className="h3">Resumen:</h3><p className="p" dangerouslySetInnerHTML={{ __html: Receta.summary }}></p>
                            <h3 className="h3">Tipo de dietas:</h3><ul className="p">{!Receta.createdInDb?Receta.diets.map(d => <li className="li">{d}</li>):Receta.diets.map(d => <li className="li">{d.name}</li>)}</ul>
                        </div>
                    </div>: <p>Loading...</p> }       
        </div>
        </div>
    )
};