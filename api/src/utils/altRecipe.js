const { Recipe } = require('../db.js');

async function altRecipe(idRecipe, attribute, value) {

	if (attribute === 'aggregateLikes') {};

	if (attribute === 'title') {
		if (value.includes(' ')) {
			value = value.split(' ').map(p=> p.slice(0,1).toUpperCase().concat(p.slice(1).toLowerCase())).join(' ')
		} else { value = value[0].toUpperCase().concat(value.slice(1).toLowerCase()) };
	};

		let myRecipe = await Recipe.findByPk(idRecipe)
		.then( (r)=>{
			if (attribute === 'aggregateLikes')  value = value + r.aggregateLikes;
			r.update({[attribute]: value})     // 'actulizamos el atributo de la actividad'
		})
		.catch( (e)=> console.log('falló en altRecipe: ', e.message) )

		return myRecipe;
};

module.exports = altRecipe;
