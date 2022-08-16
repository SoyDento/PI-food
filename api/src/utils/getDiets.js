const axios = require('axios').default;
const { Diet } = require('../db.js');


async function getDiets(){

  let diets = await Diet.findAll()
    .then( async(r) => r )
    .catch( e=> console.log(e) );
  // console.log(occupations);
  return diets;
}

module.exports = { getDiets };
