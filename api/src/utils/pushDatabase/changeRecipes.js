const { YOUR_API_KEY, Recipe, Diet, Cuisine, DishType } = require('../../db.js');
const axios = require('axios').default;

async function pushRecipes () {
  // axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&number=100&addRecipeInformation=true`)
  //     .then( (r)=> Recipe.bulkCreate(r.data.results) )
  //     .catch(e=> console.log('error en function pushRecipes:', e) );

  let apiRecipes = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&number=100&addRecipeInformation=true`)  // `https://api.spoonacular.com/recipes/random?apiKey=${YOUR_API_KEY}&number=50`
      .then( (r)=> r.data.results )
      .catch(e=> console.log('error en apiRecipes:', e) ); // console.log(apiRecipes);

  apiRecipes.forEach((obj) => {

    Recipe.findOne({ where: { title: obj.title } })
    .then((r)=> {      
        for (let prop in obj) {
          r.update({[prop]: obj[prop]})
        }      
    })
    .catch(e=> console.log(e));

  });
};

module.exports  = pushRecipes;
