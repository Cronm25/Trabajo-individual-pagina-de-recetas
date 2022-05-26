import React from "react";
import {useState,useEffect} from "react";
import {useDispatch,useSelector} from "react-redux"
import {getDietas,postRecipe } from "../actions";
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
    if (!post.healthScore || post.healthScore < 0 || post.healthScore > 100) {
        errors.healthScore = 'Ingresa un valor de 0 a 100'
    }
    if (!post.analyzedInstructions) {
        errors.analyzedInstructions = 'Escribe una serie de pasos sobre cómo cocinar la receta'
    }
    if (!post.image) {
        errors.image = 'Ingresar URL de alguna imagen representativa'
    }
    if (post.diets.length>0) {
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
        image:"",
        analyzedInstructions:"",
        spoonacularScore:0,
        healthScore:0,
        diets:[],
    })
    function handleCrear(e){ 
        e.preventDefault()  
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
        e.preventDefault();
        console.log(errors)
        console.log(crear)
        if(!crear.nombre||Object.keys(errors).length > 0){
            alert ("Campos incompletos")
        }else{
            dispatch(postRecipe(crear));
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

    function handleEliminarDiet(d) {
        setCrear({
            ...crear,
            diets: crear.diets.filter(elemet => elemet !== d)
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
                        <textarea type="text" value={crear.analyzedInstructions} name="analyzedInstructions" onChange={e => handleCrear(e) }/>
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
                            (<div key={d} className="divdiets">
                                <p  className="selecteddiets">{d}</p>
                                <button  onClick={() => handleEliminarDiet(d)}
                                className="buttonclose">X</button>
                            </div>)
                        )}
                    </div>
                    <div className="ContainerButton">
                        <button type="submit" className="createButton">Crear!</button>
                    </div>
                </form>
                </div>
            </div>
            </div>
        </div>
        </div>
    )
}