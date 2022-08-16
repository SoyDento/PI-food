
const { Recipe, Diet, DishType, Cuisine, Op } = require('../db.js');

let getRecipesQy = async(data)=>{

  let recip = await Recipe.findAll({
                  // logging: console.log,
                  where: { name: { [Op.iLike]:  `%${data}%` } },   // [Op.substring]: data
                  include: [ Diet, DishType, Cuisine ],
                }).then( response=> response)
                  .catch( e=> console.log('Falló en getRecipesQy: ',e.message) );
  return recip;
};

module.exports = { getRecipesQy };
