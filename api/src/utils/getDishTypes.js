const axios = require('axios').default;
const { DishType } = require('../db.js');


async function getDishTypes(){

  let dt = await DishType.findAll()
    .then( async(r) => r )
    .catch( e=> console.log(e) );
  // console.log(DishTypes);
  return dt;
}

module.exports = { getDishTypes };
