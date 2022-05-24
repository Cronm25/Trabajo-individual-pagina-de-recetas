import {
    GET_RECETAS,GET_DIETAS,ORDEN_POR_SCORE,
    FILTRADO_POR_DIETAS,ORDEN_POR_NOMBRE,
    BUSCAR_POR_NOMBRE,GET_DETALLE,POST_RECIPE
    ,FILTRADO_POR_BD
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
            const dietasFiltered=action.payload==="default"?allRecetas:
            allRecetas.filter(el=>{
                let names = !el.createdInDb?
                el.diets.map(d => d):
                el.diets.map(d => d.name)
                if (names.includes(action.payload)) return el
            })
            return{
                ...state,
                recipes: dietasFiltered,
            }
        case FILTRADO_POR_BD:
            const allRecetas_ = state.TodasRecipes
            const dietasFiltered_=action.payload==="si"?
            allRecetas_.filter(el=>{
                let names = el.createdInDb
                if (names) return el
            }):
            allRecetas_.filter(el=>{
                let names = el.createdInDb
                if (!names) return el
            })
            return{
                ...state,
                recipes: dietasFiltered_,
            }
        case ORDEN_POR_SCORE:
            let arreglo1 = action.payload === "Ascendente" ?
            state.recipes.sort(function(a,b){
                if(a.healthScore > b.healthScore){
                    return 1;
                }
                if(a.healthScore < b.healthScore){
                    return -1;
                }
                return 0;
            }): 
            state.recipes.sort(function(a,b){
                if(a.healthScore > b.healthScore){
                    return -1;
                }
                if(a.healthScore < b.healthScore){
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
                if(a.nombre > b.nombre){
                    return 1;
                }
                if(a.nombre < b.nombre){
                    return -1;
                }
                return 0;
            }): 
            state.recipes.sort(function(a,b){
                if(a.nombre > b.nombre){
                    return -1;
                }
                if(a.nombre < b.nombre){
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
        case POST_RECIPE:
            return {
                ...state
            }
        default:
            return state
    }

}
export default rootReducer;