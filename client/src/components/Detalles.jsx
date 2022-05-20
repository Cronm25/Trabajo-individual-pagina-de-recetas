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

    return (
        <div>
        <NavBar/>
        <div className="component">
            {
                !Receta ?
                    <div>
                        <h1 className="title">{Receta.Nombre}</h1>
                        <div className="imgContainer">
                            <img src={Receta.image} alt='img not found'
                                width="500px" height="400px" className="img" />
                        </div>
                        <div className="detailContainer">
                            <h3 className="h3">Puntuacion: {Receta.Puntuacion} </h3>
                            <h3 className="h3">Nivel saludable: {Receta.Nivel_saludable} </h3>
                            <h3 className="h3">Paso_a_paso:</h3>
                            <p className="p" dangerouslySetInnerHTML={{ __html: Receta.Paso_a_paso }}></p>
                            <h3 className="h3">Resumen:</h3><p className="p" dangerouslySetInnerHTML={{ __html: Receta.Resumen }}></p>
                            <h3 className="h3">Tipo de dietas:</h3><ul className="p">{Receta.diets.map(d => <li className="li">{d.name}</li>)}</ul>
                        </div>
                    </div> :
                    <p>Loading...</p>
            }
        </div>
        </div>
    )
};