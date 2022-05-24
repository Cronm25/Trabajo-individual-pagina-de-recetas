const { Router } = require('express');
const axios = require('axios');
const {API_KEY} = process.env;
const { Recipe, Diet } = require('../db');
const funcion__ = require('../ApiInfo/ApiInfo')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
//https://drive.google.com/file/d/1QU2K1eV_i8D8QRJh6n2Z8x3ccZHkOIB_/view

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/recipes',async (req,res)=>{
    const { name } = req.query;
    if(name){
        try {
                let recipes= await funcion__.getAllRecipes();
                let RecipeName = await recipes.filter(el => el.nombre.toLowerCase().includes(name.toLowerCase()))
                RecipeName.length ?
                res.status(200).json(RecipeName) : 
                res.status(404).send("Receta no encontrada")
                
        } catch (error) {
            console.log(`${error.message}1///`)
        }
    }else{
        try {
            res.status(200).json(await funcion__.getAllRecipes())
        } catch (error) {
            console.log(`${error.message}2///`)
        }
       
    }
})
router.get('/recipes/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const recipes= await funcion__.getAllRecipes();
        if(id){
            const receta= await recipes.filter(r => r.id == id)
            receta.length ?
            res.status(200).json(receta[0]) : 
            res.status(404).send("Receta por id no encontrada")
        }
        res.status(404).send("Ingresa una id")
    } catch (error) {
        console.log(error.message)
    }
    
})
router.get('/types',async(req,res)=>{
    try {
        const diets = await Diet.findAll();
        diets.length ?
            res.send(diets) :
            res.send('error al traer dietas');
    } catch (e) {
        next(e)
    }
    //try {
    //    let dietList= await funcion__.getAllRecipes();
    //    const repeated = await dietList.map( d => d.diets).flat(1);
    //    const dietas_sin_repetidas= [... new Set(repeated)]
    //    dietas_sin_repetidas.forEach(element => {
    //        Diet.findOrCreate({
    //            where:{name:element}
    //        })
    //    });
    //    const AllDiets= await Diet.findAll();
    //    res.status(200).json(AllDiets);
    //} catch (error) {
    //    console.log(error.message)
    //}
    
})
router.post('/recipe', async(req,res)=>{
    try {
        let {nombre, summary, spoonacularScore, healthScore, image, analyzedInstructions,diets,createdInDb}= req.body;
        let Crear_receta = await Recipe.create({
            nombre,
            summary, 
            spoonacularScore, 
            healthScore,
            image,
            analyzedInstructions:analyzedInstructions,
            createdInDb
        })
        diets.map(async d => {
            const dbDiet = await Diet.findOrCreate({
                where: {
                    name: d
                }
            })
            Crear_receta.addDiet(dbDiet[0]);
        })
        //let DietasDB=await Diet.findAll({where:{name:diets}})
        //Crear_receta.addDiet(DietasDB)
        res.status(201).send("Receta creada")
    } catch (error) {
        console.log(error.message)
    }
    
})
module.exports = router;
