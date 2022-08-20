const axios = require('axios').default;
const { Cuisine } = require('../db.js');


async function getCussines(){

  let cussines = await Cuisine.findAll()
    .then( async(r) => r )
    .catch( e=> console.log(e) );
  // console.log(Cussines);
  return cussines;
}

module.exports = { getCussines };
