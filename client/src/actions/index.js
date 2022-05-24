import axios from "axios";
export const GET_RECETAS="GET_RECETAS"
export const GET_DIETAS="GET_DIETAS"
export const FILTRADO_POR_DIETAS="FILTRADO_POR_DIETAS"
export const FILTRADO_POR_BD="FILTRADO_POR_BD"
export const ORDEN_POR_SCORE="ORDEN_POR_SCORE"
export const ORDEN_POR_NOMBRE="ORDEN_POR_NOMBRE"
export const BUSCAR_POR_NOMBRE="BUSCAR_POR_NOMBRE"
export const GET_DETALLE="GET_DETALLE"
export const POST_RECIPE = 'POST_RECIPE'

export function getRecetas(){
    return async function(dispatch){
        var json = await axios ("http://localhost:3001/recipes");
        return dispatch({
        type:GET_RECETAS,
        payload: json.data
        })
    }
}
export function postRecipe(payload){
    return async function (){
        try {
            let json = await axios.post('http://localhost:3001/recipe',payload)
            console.log(json)
            return json;
        } catch (error) {
            console.log(error.message)
        } 
    }
}
export function getDietas() {
    return async function (dispatch) {
        let json = await axios.get('http://localhost:3001/types');
        return dispatch({ type: GET_DIETAS, payload: json.data })
    }
};
export function FiltradoPorDietas(payload){
    return{
        type: FILTRADO_POR_DIETAS,
        payload
    }
}
export function FiltradoPorBD(payload){
    return{
        type: FILTRADO_POR_BD,
        payload
    }
}

export function OrdenPorScore(payload){
    return{
        type: ORDEN_POR_SCORE,
        payload
    }
}
export function OrdenPorNombre(payload){
    return{
        type: ORDEN_POR_NOMBRE,
        payload
    }
}
export function buscarpornombre(name) {
    return async function (dispatch) {
        let json = await axios.get('http://localhost:3001/recipes?name=' + name);
        return dispatch({ type: BUSCAR_POR_NOMBRE, payload: json.data })
    }
};
export function getDetalle(id){
    return async function (dispatch) {
        let json = await axios.get('http://localhost:3001/recipes/' + id);
        return dispatch({ type: GET_DETALLE, payload: json.data })
    }
}