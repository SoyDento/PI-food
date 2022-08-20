const { Recipe } = require('../db.js');

async function altRecipe(id, attribute, value) {
	
	if (attribute === 'title') {
		if (value.includes(' ')) {
			value = value.split(' ').map(p=> p.slice(0,1).toUpperCase().concat(p.slice(1).toLowerCase())).join(' ')
		} else { value = value[0].toUpperCase().concat(value.slice(1).toLowerCase()) };
	};

	let myRecipe = await Recipe.findByPk(id)
		.then( (r)=>{ // console.log(r);
			if (attribute === 'aggregateLikes' && r.aggregateLikes) {  
					value = parseInt(value) + parseInt(r.aggregateLikes);
			};
			r.update({[attribute]: value})     // 'actulizamos el atributo de la actividad'
			return r;
		})
		.catch( (e)=> console.log('falló en el cambio de atributo en altRecipe: ', e.message) );


	return myRecipe;
	
};

module.exports = altRecipe;
