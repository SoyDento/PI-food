const axios = require('axios').default;
const { Recipe } = require('../db.js');
const { Diet, DishType, Cuisine } = require('../db.js');

async function getRecipesDB () {

  let recipess = await Recipe.findAll({include: [ Diet, DishType, Cuisine ]})  // {include: [ Diet, DishType, Cuisine ]}
      .then( response=> response)
      .catch( e=> console.log(e) );

  return recipess;

};

module.exports =  getRecipesDB;
