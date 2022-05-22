require('dotenv').config();
const axios = require('axios');
const { Recipe, Diet} = require('../db')
const {data} = require("../Data.js")
//https://api.spoonacular.com/recipes/complexSearch?apiKey=1145635f236b4e259ee3d744dfd5c6c3&addRecipeInformation=true&number=100
const getApiInfo = async()=>{
    try {
        const ApiUrl = data //await axios.get(DataAll_());
        const apiInfo = await ApiUrl.results.map(receta => { //ApiUrl.data.results.map
        return {
            id: receta.id,
            nombre: receta.title,
            summary: receta.summary,
            spoonacularScore: receta.spoonacularScore,
            healthScore: receta.healthScore,
            analyzedInstructions: receta.analyzedInstructions[0]?.steps.map(paso => {
                return `<b>${paso.number} , ${paso.step}<b/>`
            }),
            createdInDb: false,
            image: receta.image,
            diets: receta.diets
        }
    })
    return apiInfo
    } catch (error) {
        console.log(`${error.message}//4//`)
    }
    
}
const getDbInfo = async function(){
    try {
        return await Recipe.findAll({
            include: {              
                model: Diet,        
                attibutes: ['name'],
                through: {
                    attibutes:[],   
                }
            } 
        })
    } catch (error) {
        console.log(`${error.message}3///`)
    }
}; 
const getAllRecipes = async () =>{
    const apiInfo = await getApiInfo();
    const DbInfo = await getDbInfo();
    const infototal = apiInfo.concat(DbInfo);
    return infototal
}
const getallDiets = async function(){
    const dietList = getAllRecipes;
    const repeated = await dietList.map( d => d.diets).flat(1);
    return [... new Set(repeated)]
};
module.exports={
    getApiInfo,
    getDbInfo,
    getAllRecipes,
    getallDiets

}