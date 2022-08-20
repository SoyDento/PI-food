const { getDiets } = require('../utils/getDiets.js');
const { getCussines } = require('../utils/getCussines.js');
const { getDishTypes } = require('../utils/getDishTypes.js');
const  getRecipesDB  = require('../utils/getRecipesDB.js');
const  postRecipe  = require('../utils/postRecipe.js');
const { getRecipesQy } = require('../utils/getRecipesQy.js');
const getIDrecipe = require('../utils/getIDrecipe');
const altRecipe = require('../utils/altRecipe');
const cuisineChange = require('../utils/cuisineChange')
const deleteRecipe = require('../utils/deleteRecipe.js');

const recipesGet = async(req, res, next)=>{
  try {
    let { data } = req.query;  console.log(data);
    if (!data) {
      let recipesDB = await getRecipesDB() || [];
      console.log(recipesDB.length);
      return res.send(recipesDB)  //    petición probada !!!!!! --
    };
    let chs = await getRecipesQy(data);
    res.send(chs)              //    petición probada !!!!!! --
  } catch (e) { next(e) }
};

const recIDget = async(req, res, next)=>{
  try {
    let { id } = req.params; console.log(id);
    let c = await getIDrecipe(id) || {};
    res.send(c)              //    petición probada !!!!!! --
  } catch (e) { next(e) }
};

const recPost = async(req, res, next)=>{
  try {
    let c = await postRecipe(req.body) || {};
    res.send(c)   //    petición probada !!!!!! --
  } catch (e) { next(e) }
};

const dietsGet = async(req, res, next)=>{
  try {
    let o = await getDiets() || [];
    res.send(o)            //   petición probada !!!!!! --
  } catch (e) { next(e) }
};

const dishTypesGet = async(req, res, next)=>{
  try {
    let o = await getDishTypes() || [];
    res.send(o)            //     petición probada !!!!!! --
  } catch (e) { next(e) }
};

const cuisinesGet = async(req, res, next)=>{
  try {
    let o = await getCussines() || [];
    res.send(o)            //    petición probada !!!!!! --
  } catch (e) { next(e) }
};

const altAttribute = async (req, res, next)=>{
	try {
		let { attribute } = req.params;
	  let { id, value } = req.query;
    
    console.log(id);  console.log(attribute); console.log(value);
    
		let myAlt = await altRecipe(id, attribute, value) || {};
		res.send(myAlt)            // petición probada !!!!!! --
	} catch (e) { next (e) }
};

const altCuisine = async (req, res, next)=>{
	try {
		let { attribute } = req.params;
	  let { id, value } = req.query;
    
    console.log(id);  console.log(attribute); console.log(value);
    
		let myAlt = await cuisineChange(id, attribute, value) || {};
		res.send(myAlt)            // petición probada !!!!!! --
	} catch (e) { next (e) }
};

const recIDremove = async (req, res, next)=>{
	try {
	  let { id } = req.query;
		let c = await deleteRecipe(id) || {};
		res.send(c)            // petición probada !!!!!! --
	} catch (e) { next (e) }
};

module.exports = {
  recipesGet,
  recIDget,
  recPost,
  dietsGet,
  dishTypesGet,
  cuisinesGet,
  altAttribute,
  altCuisine,
  recIDremove
}
