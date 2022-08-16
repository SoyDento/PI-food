const { YOUR_API_KEY, Recipe } = require('../../db.js');
const axios = require('axios').default;

function pushDiets () {

  axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&number=100&addRecipeInformation=true`)
      .then( r=>{
        let promRecipes =  Recipe.bulkCreate(r.data.results)
        // console.log(r);
        return r;
      })
      .then(r=> r.forEach((o) => Occupation.create({name:o}) ) )
      .then(r=> console.log('ocupaciones creadas en DB') )
      .catch(e=> console.log(e) )

};

module.exports  = pushDiets;
