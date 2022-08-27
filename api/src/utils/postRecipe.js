const { Recipe, Diet, DishType, Cuisine } = require('../db.js');

let postRecipe = async(obj)=>{

  let {id_db, id, title, image, veryHealthy, cheap, healthScore, creditsText, readyInMinutes, servings,
            sourceUrl, analyzedInstructions, diets, dishTypes, cuisines, created_DB  } = obj;
  // capitalize
  if (title.includes(' ')) {
    title = title.split(' ').map(p=> p.slice(0,1).toUpperCase().concat(p.slice(1).toLowerCase())).join(' ')
  } else { title = title[0].toUpperCase().concat(title.slice(1).toLowerCase()) };

  if (cuisines.length > 0) {
    cuisines = cuisines.map((cuis)=>{
      if (cuis.includes(' ')) {
        cuis = cuis.split(' ').map(p=> p.slice(0,1).toUpperCase().concat(p.slice(1).toLowerCase())).join(' ')
      } else { cuis = cuis[0].toUpperCase().concat(cuis.slice(1).toLowerCase()) };
      if (cuis[0].includes(' ')) cuis.slice(1);
      if (cuis[cuis.length-1].includes(' ')) cuis.substring(0, cuis.length - 1);
      return cuis;
    })
    cuisines.forEach( async(c)=> await Cuisine.findOrCreate({   where: {name: c}   })     );
  }; // console.log(cuisines);

  let recip = await Recipe.create({id_db, id, title, image, veryHealthy, cheap, healthScore, creditsText,
           readyInMinutes, servings, sourceUrl, analyzedInstructions, created_DB });  

  let myrecip = await Recipe.findOne({ where: { title: title } }); //  console.log(myrecip); console.log(title);

  let allDts = await Diet.findAll(), allTypes = await DishType.findAll(), allCuis = await Cuisine.findAll();
  
  // await Promise.all( [allDts, allTypes, allCuis] );

  let newsDts = allDts.filter(o=> diets.includes(o.name));
  let newsDishTypes = allTypes.filter(o=> dishTypes.includes(o.name));
  let newsCuis = allCuis.filter(o=> cuisines.includes(o.name));

  let incDiets = newsDts.map( async(d)=> await myrecip.addDiet(d.id) );
  let incDT = newsDishTypes.map( async(dt)=> await myrecip.addDishType(dt.id) );
  let incCuis = newsCuis.map( async(c)=> await myrecip.addCuisine(c.id) );

  await Promise.all( [...incDiets, ...incDT, ...incCuis] );

  let recipeCreated = await Recipe.findOne({
    where: { id_db: myrecip.id_db },
    include: [ Diet, DishType, Cuisine ]
  });

  return recipeCreated;
};

module.exports = postRecipe;
