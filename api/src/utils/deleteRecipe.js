const { Recipe } = require('../db.js');

async function deleteRecipe(id) {

		let recipeOver = await Recipe.findByPk(id)

		Recipe.destroy({
      where: { id: id },
      force: true
    })
		.then( (r)=> console.log(' borro la receta') )
		.catch( (e)=> console.log('deleteRecipe: ', e.message) );

		return recipeOver;

};

module.exports = deleteRecipe;
