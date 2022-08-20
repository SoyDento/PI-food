const { Cuisine } = require('../db.js');

async function cuisineChange(id, attribute, value) {
	
	if (attribute === 'name') {
		if (value.includes(' ')) {
			value = value.split(' ').map(p=> p.slice(0,1).toUpperCase().concat(p.slice(1).toLowerCase())).join(' ')
		} else { value = value[0].toUpperCase().concat(value.slice(1).toLowerCase()) };
	};

	let myCuisine = await Cuisine.findByPk(id)
		.then( (r)=>{ // console.log(r);			
			r.update({[attribute]: value})     // 'actulizamos el atributo de la actividad'
			return r;
		})
		.catch( (e)=> console.log('falló en el cambio de atributo en cuisineChange: ', e.message) );


	return myCuisine;
	
};

module.exports = cuisineChange;
