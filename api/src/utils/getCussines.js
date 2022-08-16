const axios = require('axios').default;
const { Cussines } = require('../db.js');


async function getCussines(){

  let cussines = await Cussines.findAll()
    .then( async(r) => r )
    .catch( e=> console.log(e) );
  // console.log(Cussines);
  return cussines;
}

module.exports = { getCussines };
