const { Router } = require('express');
const axios = require('axios');
const {API_KEY} = process.env;
const { Recipe, Diet } = require('../db')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
const getApiInfo = async()=>{
    const ApiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`);
    const apiInfo = await ApiUrl.data.results.map(receta => {
        return {
            id: receta.id,
            Nombre: receta.title,
            Resumen: receta.summary,
            Puntuacion: receta.spoonacularScore,
            Nivel_saludable: receta.healthScore,
            Paso_a_paso: receta.analyzedInstructions[0]?.steps.map(paso => {
                return `<b>${paso.number}</b> ${paso.step}<br>`
            }),
            createdInDb: false,
            image: receta.image,
            dietas: receta.diets.map( d => { return { name: d}}), 
        }
    })
    return apiInfo
}
const getDbInfo = async function(){
    return await Recipe.findAll({
        include: {              
            model: Diet,        
            attibutes: ['name'],
            through: {
                attibutes:[],   
            }
        } 
    })
}; 
const getAllRecipes = async () =>{
    const apiInfo = await getApiInfo();
    const DbInfo = await getDbInfo();
    const infototal = apiInfo.concat(DbInfo);
    return infototal
}
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/recipes',async (req,res)=>{
    const { name } = req.query;
    let recipes= await getAllRecipes();
    if(name){
        let RecipeName = await recipes.filter(el => el.Nombre.toLowerCase().includes(name.toLowerCase()))
        RecipeName.length ?
        res.status(200).send(RecipeName) : 
        res.status(404).send("Receta no encontrada")
    }
    res.status(200).send(recipes)
})
router.get('/recipes/:id',async(req,res)=>{
    const {id}=req.params;
    const recipes= await getAllRecipes();
    if(id){
        const receta= await recipes.filter(r => r.id == id)
        receta.length ?
        res.status(200).send(receta) : 
        res.status(404).send("Receta por id no encontrada")
    }
    res.status(404).send("Ingresa una id")
})
router.get('/types',async(req,res)=>{
    const dietList = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`);
    const dietas = await dietList.data.results.map( d => d.diets);
    const dietas_sin_repetdas=dietas.map(elementos=>{
        for (let i = 0; i < elementos.length; i++)return elementos[i]})
    dietas_sin_repetdas.forEach(element => {
        Diet.findOrCreate({
            where:{name:element}
        })
    });
    const AllDiets= await Diet.findAll();
    res.send(AllDiets);
})
router.post('/recipe', async(req,res)=>{
    let {Nombre, Resumen, Puntuacion, Nivel_saludable, image, Paso_a_Paso,diets,createdInDb}= req.body;
    let Crear_receta = await Recipe.create({
        Nombre, Resumen, Puntuacion, Nivel_saludable, image, Paso_a_Paso,createdInDb
    })
    let DietasDB=await Diet.findAll({where:{name:diets}})
    Crear_receta.addRecipe(DietasDB)
    res.status(201).send("Receta creada")
})
module.exports = router;
