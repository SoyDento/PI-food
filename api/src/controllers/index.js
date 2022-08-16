const { getDiets } = require('../utils/getDiets.js');
const { getCussines } = require('../utils/getCussines.js');
const { getDishTypes } = require('../utils/getDishTypes.js');
const  getRecipesDB  = require('../utils/getRecipesDB.js');
const  postRecipe  = require('../utils/postRecipe.js');
const { getRecipesQy } = require('../utils/getRecipesQy.js');
const getIDrecipe = require('../utils/getIDrecipe');
const altRecipe = require('../utils/altRecipe');
const deleteRecipe = require('../utils/deleteRecipe.js');

const recipesGet = async(req, res, next)=>{
  try {
    let { data } = req.query; // console.log(data);
    if (!data) {
      let recipesDB = await getRecipesDB() || [];
      // console.log(allGames);
      return res.send(recipesDB)  //
    };
    let chs = await getRecipesQy(data);
    res.send(chs)              //
  } catch (e) { next(e) }
};

const recIDget = async(req, res, next)=>{
  try {
    let { id } = req.params; console.log(id);
    let c = await getIDrecipe(id) || {};
    res.send(c)              //
  } catch (e) { next(e) }
};

const recPost = async(req, res, next)=>{
  try {
    let c = await postRecipe(req.body) || {};
    res.send(c)   //
  } catch (e) { next(e) }
};

const dietsGet = async(req, res, next)=>{
  try {
    let o = await getDiets() || [];
    res.send(o)            //
};

const dishTypesGet = async(req, res, next)=>{
  try {
    let o = await getDishTypes() || [];
    res.send(o)            //
  } catch (e) { next(e) }
};

const cuisinesGet = async(req, res, next)=>{
  try {
    let o = await getCussines() || [];
    res.send(o)            //
  } catch (e) { next(e) }
};

const altAttribute = async (req, res, next)=>{
	try {
		let { attribute } = req.params;
	  let { idRecipe, value } = req.query;

		let myAlt = await altRecipe(idRecipe, attribute, value.toString()) || {};
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
  recIDremove
}
