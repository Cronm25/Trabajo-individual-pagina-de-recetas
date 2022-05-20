import React from "react";
import {useState,useEffect} from "react";
import {useDispatch,useSelector} from "react-redux"
import { getRecetas,OrdenPorScore,OrdenPorNombre,FiltradoPorDietas} from "../actions";
import Card from "./Card";
import Paginado from "./Paginas_N";
import Buscar from "./Buscador";
import NavBar from "./NavBar";
import "./Home_.css";
export default function Home (){
    const dispatch = useDispatch();
    const recipes = useSelector((state)=>state.recipes)
    const diets = useSelector(state => state.diets);
    const [orden,setOrden]= useState(1)
    const [currentPage,setCurrentPage]= useState(1)
    const [RecetasPorPagina,setRecetasPorPagina]=useState(9)
    const indexDeLaUltimaReceta = currentPage*RecetasPorPagina
    const indexDeLaPrimeraReceta = indexDeLaUltimaReceta - RecetasPorPagina
    const currentRecetas = recipes.slice(indexDeLaPrimeraReceta,indexDeLaUltimaReceta)
    const paginado = (pageNumber)=>{
        setCurrentPage(pageNumber)
    }
    useEffect(()=>{
        dispatch(getRecetas());
    },[dispatch])
    function handleOrdenAlfabetico(e){
        e.preventDefault();
        dispatch(OrdenPorNombre(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }
    function handleOrdenScore(e){
        e.preventDefault();
        dispatch(OrdenPorScore(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }
    function handleFiltroDietas(e){
        e.preventDefault();
        dispatch(FiltradoPorDietas(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }
    function returnToFirstPage() {
        setCurrentPage(1)
    };
    return (
        <div>
            <NavBar/>
            <div className="selecterContainer">
            <Buscar returnToFirstPage={returnToFirstPage}/>
            <select onChange={e=>handleOrdenAlfabetico(e)} defaultValue='default' className="filters">
                    <option value="default" disabled >Orden alfabético</option>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
            </select>
            <select onChange={e=>handleOrdenScore(e)} defaultValue='default' className="filters">
                    <option value="default" disabled >Puntuación</option>
                    <option value="Descendente">Descendente</option>
                    <option value="Ascendente">Ascendente</option>
            </select>
            <select onChange={e=>handleFiltroDietas(e)} defaultValue='default' className="filters">
                    <option value="default" disabled >Filtro de dietas</option>
                    {
                        diets && diets.map(d =>{
                            <option value={d.name} key={d.id}>{d.name}</option>
                        })
                    }
            </select>
            </div>
            <div>
                <div id="lista">
                {
                    currentRecetas && currentRecetas.map(el=>{
                        return (<Card img={el.image} name={el.Nombre} diet={el.dietas} id={el.id}/>)
                    })
                }
                </div>
            <Paginado 
            RecetasPorPagina={RecetasPorPagina}
            recipes={recipes.length}
            paginado={paginado}
            />
            </div>
        </div>
    )
}