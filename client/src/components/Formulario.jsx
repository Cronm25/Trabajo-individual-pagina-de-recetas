import React from "react";
import {useState,useEffect} from "react";
import {useDispatch,useSelector} from "react-redux"
import {getDietas,CrearReceta } from "../actions";
import NavBar from "./NavBar";
import "./Formulario_.css";
function Validator(post){
    let errors={};
    if (!post.Nombre) {
        errors.Nombre = 'Ingresar nombre de la receta'
    }
    if (!post.Resumen) {
        errors.Resumen = 'Escribe un breve resumen'
    }
    if (!post.Puntuacion || post.Puntuacion < 0 || post.Puntuacion > 100) {
        errors.Puntuacion = 'Ingresa un valor de 0 a 100'
    }
    if (!post.Nivel_saludable || post.Nivel_saludable < 0 || post.Nivel_saludable > 100) {
        errors.Nivel_saludable = 'Ingresa un valor de 0 a 100'
    }
    if (!post.Paso_a_paso.length) {
        errors.stepByStep = 'Escribe una serie de pasos sobre cómo cocinar la receta'
    }
    if (!post.image) {
        errors.image = 'Ingresar URL de alguna imagen representativa'
    }
    if (!post.diets.length) {
        errors.diets = 'Elige al menos un tipo de dieta'
    }
    return errors
}

export default function Formulario(){
    const dispatch = useDispatch();
    const diets = useSelector(state => state.diets);
    const [errors,setErrors] = useState({});
    useEffect(()=>{
        dispatch(getDietas())
    },[dispatch])
    const[crear,setCrear]=useState({
        Nombre:"",
        Resumen:"",
        Puntuacion:0,
        Nivel_saludable:0,
        image:"",
        Paso_a_paso:[],
        diets:[]
    })
    function handleCrear(e){
        setCrear({
            ...crear,
            [e.target.Nombre]:e.target.value
        });
        setErrors(Validator({
            ...crear,
            [e.target.Nombre]:e.target.value
        }))
    }
    function handleComprobar(e){
        e.prevenrDefault();
        if(Object.values(errors).length > 0){ alert ('Campos incompletos');
        }else{
            dispatch(CrearReceta(crear));
            alert ('Receta creada');
        }
    };
    function handleSelector(e){
        if(!crear.diets.includes(e.target.value)){
            setCrear({
                ...crear,
                diets:[...crear.diets,e.target.value]
            });
        }else{
            setErrors(Validator({
                ...crear,
                diets:[...crear.diets,e.target.value]
            }))
        }
    }
    function handle_P_a_P(e) {
        setCrear({
            ...crear,
            stepByStep: [e.target.value]
        });
        setErrors(Validator({
            ...crear,
            stepByStep: e.target.value
        }));
    }

    function handleEliminarDiet(diet) {
        setCrear({
            ...crear,
            diets: crear.diets.filter(elemet => elemet !== diet)
        })
        setErrors(Validator({
            ...crear,
            diets: [...crear.diets]
        }));

    };
    return (
        <div>
            <NavBar/>
        <div className="container">
            <div className="bkg">
                <div className="form">
                    <h1>Crear receta</h1>
                <form onSubmit={e => handleComprobar(e)}>
                    <div>
                        <label>Nombre</label>
                        <input type="text" value={crear.Nombre} name="Nombre" onChange={e => handleCrear(e) }/>
                        {errors.Nombre && (
                            <p>{errors.Nombre}</p>
                        )}
                    </div>
                    <div>
                        <label>Resumen</label>
                        <textarea value={crear.Resumen} name="Resumen" onChange={e => handleCrear(e) }/>
                        {errors.Resumen && (
                            <p>{errors.Resumen}</p>
                        )}
                    </div>
                    <div>
                        <label>Puntuacion</label>
                        <input type="number" min="0" max='100' value={crear.Puntuacion} name="Puntuacion" onChange={e => handleCrear(e) }/>
                        {errors.Puntuacion && (
                            <p>{errors.Puntuacion}</p>
                        )}
                    </div>
                    <div>
                        <label>Nivel_saludable</label>
                        <input type="number" min="0" max='100' value={crear.Nivel_saludable} name="Nivel_saludable" onChange={e => handleCrear(e) }/>
                        {errors.Nivel_saludable && (
                            <p>{errors.Nivel_saludable}</p>
                        )}
                    </div>
                    <div>
                        <label>Imagen</label>
                        <input type="text" value={crear.image} name="image" onChange={e => handleCrear(e) }/>
                        {errors.image && (
                            <p>{errors.image}</p>
                        )}
                    </div>
                    <div>
                        <label>Paso_a_paso</label>
                        <textarea type="text" value={crear.Paso_a_paso} name="Paso_a_paso" onChange={e => handle_P_a_P(e) }/>
                        {errors.Paso_a_paso && (
                            <p>{errors.Paso_a_paso}</p>
                        )}
                    </div>
                    <div>
                        <select onChange={e => handleSelector(e)} defaultValue="default">
                            <option value="default" disabled className="dietOption" >Selecciona dieta</option>
                            {diets && diets.map(d=>(
                                <option value={d.name} key={d.id} className="dietOption" >{d.name}</option>
                            ))}
                        </select>
                        {errors.diets && (
                            <p>{errors.diets}</p>
                        )}
                        {crear.diets.map(d =>
                            <div key={d.id} className="divdiets">
                                <p className="selecteddiets">{d}</p>
                                <button onClick={() => handleEliminarDiet(d)}
                                className="buttonclose">X</button>
                            </div>
                        )}
                    </div>
                    <button type="submit" className="createButton">Crear!</button>
                </form>
                </div>
            </div>
        </div>
        </div>
    )
}