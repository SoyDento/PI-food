const { YOUR_API_KEY, Recipe, Diet, Cuisine, DishType } = require('../../db.js');
const axios = require('axios').default;

async function pushRecipes () {
  // axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&number=100&addRecipeInformation=true`)
  //     .then( (r)=> Recipe.bulkCreate(r.data.results) )
  //     .catch(e=> console.log('error en function pushRecipes:', e) );

  let apiRecipes = await axios(`https://api.spoonacular.com/recipes/random?apiKey=${YOUR_API_KEY}&number=50`)  // 
      .then( (r)=> r.data.recipes )
      .catch(e=> console.log('error en apiRecipes:', e) ); // console.log(apiRecipes);

  apiRecipes.forEach((obj) => {

    Recipe.findOrCreate({ where: { id: obj.id, title: obj.title}, })
    .then(([recipe, created]) => {
      if (created) {
        for (let prop in obj) {
          recipe.update({[prop]: obj[prop]})
        }
      };
      return [recipe, created];
    })
    .then(([recipe, created]) => {
      if (created) {
        // let dts = obj.diets.map(   (d)=> Diet.findOrCreate({   where: {name: d}   })     );
        // let types = obj.dishTypes.map(   (t)=> DishType.findOrCreate({   where: {name: t}   })     );
        let cuis = obj.cuisines.map( async(c)=> await Cuisine.findOrCreate({   where: {name: c}   })     );    
        // await Promise.all( [...dts, ...types, ...cuis] );
      };
      return [recipe, created];
    })
    .then(async([recipe, created]) => {
      if (created) {
        let allDts = await Diet.findAll(), allTypes = await DishType.findAll(), allCuis = await Cuisine.findAll();
        // await Promise.all( [allDts, allTypes, allCuis] );

        let newsDts = allDts.filter(o=> obj.diets.includes(o.name));
        let newsDishTypes = allTypes.filter(o=> obj.dishTypes.includes(o.name));
        let newsCuis = allCuis.filter(o=> obj.cuisines.includes(o.name));

        let incDiets = newsDts.map( (d)=> recipe.addDiet(d.id) );
        let incDT = newsDishTypes.map( (dt)=> recipe.addDishType(dt.id) );
        let incCuis = newsCuis.map( (c)=> recipe.addCuisine(c.id) );
      };
    })
    .catch(e=> console.log(e));


  });


};

module.exports  = pushRecipes;
