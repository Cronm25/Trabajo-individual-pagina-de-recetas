import React from "react";
import {useState,useEffect} from "react";
import {useDispatch,useSelector} from "react-redux"
import {getDietas,CrearReceta } from "../actions";
import NavBar from "./NavBar";
import "./Formulario_.css";
function Validator(post){
    let errors={};
    if (!post.nombre) {
        errors.nombre = 'Ingresar nombre de la receta'
    }
    if (!post.summary) {
        errors.summary = 'Escribe un breve resumen'
    }
    if (!post.spoonacularScore || post.spoonacularScore < 0 || post.spoonacularScore > 100) {
        errors.spoonacularScore = 'Ingresa un valor de 0 a 100'
    }
    if (!post.Nivel_saludable || post.Nivel_saludable < 0 || post.Nivel_saludable > 100) {
        errors.Nivel_saludable = 'Ingresa un valor de 0 a 100'
    }
    if (!post.healthScore.length) {
        errors.healthScore = 'Escribe una serie de pasos sobre cómo cocinar la receta'
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
    const diets = useSelector(state => state.Dietas);
    const [errors,setErrors] = useState({});
    useEffect(()=>{
        dispatch(getDietas())
    },[dispatch])
    const[crear,setCrear]=useState({
        nombre:"",
        summary:"",
        spoonacularScore:0,
        healthScore:0,
        image:"",
        analyzedInstructions:[],
        diets:[]
    })
    function handleCrear(e){
        setCrear({
            ...crear,
            [e.target.name]:e.target.value
        });
        setErrors(Validator({
            ...crear,
            [e.target.name]:e.target.value
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
            analyzedInstructions: [e.target.value]
        });
        setErrors(Validator({
            ...crear,
            analyzedInstructions: e.target.value
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
            <div className="bkgcolor">
                <div className="form">
                    <h1>Crear receta</h1>
                <form onSubmit={e => handleComprobar(e)}>
                    <div>
                        <label>Nombre</label>
                        <input type="text" value={crear.nombre} name="nombre" onChange={e => handleCrear(e) }/>
                        {errors.nombre && (
                            <p>{errors.nombre}</p>
                        )}
                    </div>
                    <div>
                        <label>Resumen</label>
                        <textarea value={crear.summary} name="summary" onChange={e => handleCrear(e) }/>
                        {errors.summary && (
                            <p>{errors.summary}</p>
                        )}
                    </div>
                    <div>
                        <label>Puntuacion</label>
                        <input type="number" min="0" max='100' value={crear.spoonacularScore} name="spoonacularScore" onChange={e => handleCrear(e) }/>
                        {errors.spoonacularScore && (
                            <p>{errors.spoonacularScore}</p>
                        )}
                    </div>
                    <div>
                        <label>Nivel_saludable</label>
                        <input type="number" min="0" max='100' value={crear.healthScore} name="healthScore" onChange={e => handleCrear(e) }/>
                        {errors.healthScore && (
                            <p>{errors.healthScore}</p>
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
                        <label>Paso a Paso</label>
                        <textarea type="text" value={crear.Paso_a_paso} name="analyzedInstructions" onChange={e => handle_P_a_P(e) }/>
                        {errors.analyzedInstructions && (
                            <p>{errors.analyzedInstructions}</p>
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
                            (<div key={d.id} className="divdiets">
                                <p  key={d.id} className="selecteddiets">{d}</p>
                                <button key={d.id} onClick={() => handleEliminarDiet(d)}
                                className="buttonclose">X</button>
                            </div>)
                        )}
                    </div>
                    <button type="submit" className="createButton">Crear!</button>
                </form>
                </div>
            </div>
            </div>
        </div>
        </div>
    )
}