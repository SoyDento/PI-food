const { Recipe, Diet, DishType, Cuisine } = require('../db.js');

let postRecipe = async(obj)=>{

  let {title, image, veryHealthy, cheap, healthScore, creditsText, readyInMinutes, servings,
            sourceUrl, analyzedInstructions, diets, dishTypes, cuisines } = obj;
  // capitalize
  if (title.includes(' ')) {
    title = title.split(' ').map(p=> p.slice(0,1).toUpperCase().concat(p.slice(1).toLowerCase())).join(' ')
  } else { title = title[0].toUpperCase().concat(title.slice(1).toLowerCase()) };

  let recip = Recipe.create({title, image, veryHealthy, cheap, healthScore, creditsText
           readyInMinutes, servings, sourceUrl, analyzedInstructions });
  let dts = diets.map(   (d)=> Diet.findOrCreate({   where: {name: d}   })     );

  let types = dishTypes.map(   (t)=> Diet.findOrCreate({   where: {name: t}   })     );

  let cuis = cuisines.map(   (c)=> Diet.findOrCreate({   where: {name: c}   })     );

  await Promise.all( [recip, ...dts, ...types, ...cuis] );

  let myrecip = await Recipe.findOne({ where: { title: title } });  // console.log(myrecip);

  let allDts = Diet.findAll(), allTypes = DishType.findAll(), allCuis = Cuisine.findAll();

  await Promise.all( [allDts, allTypes, allCuis] );

  let newsDts = allDts.filter(o=> diets.includes(o.name));
  let newsDishTypes = allTypes.filter(o=> dishTypes.includes(o.name));
  let newsCuis = allCuis.filter(o=> diets.includes(o.name));

  let incDiets = newsDts.map( (d)=> myrecip.addDiet(d.id) );
  let incDT = newsDts.map( (dt)=> myrecip.addDishType(dt.id) );
  let incCuis = newsDts.map( (c)=> myrecip.addCuisine(c.id) );

  await Promise.all( [...incDiets, ...incDT, ...incCuis] );

  let recipeCreated = await Recipe.findOne({
    where: { id_db: myrecip.id_db },
    include: [ Diet, DishType, Cuisine ]
  });

  return recipeCreated;
};

module.exports = postRecipe;
