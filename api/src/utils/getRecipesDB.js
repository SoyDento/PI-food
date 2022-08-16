const axios = require('axios').default;
const { Recipe } = require('../db.js');

async function getRecipesDB () {

  let recipess = await Recipe.findAll()
      .then( response=> response)
      .catch( e=> console.log(e) );

  return recipess;

};

module.exports =  getRecipesDB;
