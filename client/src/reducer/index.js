import {
    GET_RECETAS,GET_DIETAS,ORDEN_POR_SCORE,
    FILTRADO_POR_DIETAS,ORDEN_POR_NOMBRE,
    BUSCAR_POR_NOMBRE,GET_DETALLE
} from "../actions/index.js"
const initialState = {
    recipes : [],
    TodasRecipes:[],
    Dietas:[],
    Detalle:{} 
}

function rootReducer (state = initialState , action){
    switch(action.type){
        case GET_RECETAS:
            return{
                ...state,
                recipes: action.payload,
                TodasRecipes: action.payload
            }
        case GET_DIETAS:
            return{
                ...state,
                Dietas: action.payload,
            }
        case FILTRADO_POR_DIETAS:
            const allRecetas = state.TodasRecipes
            const dietasFiltered=action==="All"?allRecetas:
            allRecetas.filter(el=>{
                
            })

            return{
                ...state,
                recipes: dietasFiltered,
            }
        case ORDEN_POR_SCORE:
            let arreglo1 = action.payload === "Ascendente" ?
            state.recipes.sort(function(a,b){
                if(a.Puntuacion > b.Puntuacion){
                    return 1;
                }
                if(a.Puntuacion < b.Puntuacion){
                    return -1;
                }
                return 0;
            }): 
            state.recipes.sort(function(a,b){
                if(a.Puntuacion > b.Puntuacion){
                    return -1;
                }
                if(a.Puntuacion < b.Puntuacion){
                    return 1;
                }
                return 0;
            })
        return{
            ...state,
            recipes: arreglo1 
        }
        case ORDEN_POR_NOMBRE:
            let arreglo = action.payload === "A-Z" ?
            state.recipes.sort(function(a,b){
                if(a.Nombre > b.Nombre){
                    return 1;
                }
                if(a.Nombre < b.Nombre){
                    return -1;
                }
                return 0;
            }): 
            state.recipes.sort(function(a,b){
                if(a.Nombre > b.Nombre){
                    return -1;
                }
                if(a.Nombre < b.Nombre){
                    return 1;
                }
                return 0;
            })
        return{
            ...state,
            recipes: arreglo 
        }
        case BUSCAR_POR_NOMBRE:
            return {
                ...state,
                recipes: action.payload
            }
        case GET_DETALLE:
            return {
                ...state,
                Detalle: action.payload
            }
        default:
            return state
    }

}
export default rootReducer;