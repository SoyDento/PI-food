const { Recipe, Diet, DishType, Cuisine } = require('../db.js');

let postRecipe = async(obj)=>{
  console.log('input en utils postRecipe API: ', obj);
  let {id_db, id, title, image, veryHealthy, cheap, healthScore, creditsText, readyInMinutes, servings,
            sourceUrl, analyzedInstructions, diets, dishTypes, cuisines, created_DB  } = obj;
  // capitalize
  if (title.includes(' ')) {
    title = title.split(' ').map(p=> p.slice(0,1).toUpperCase().concat(p.slice(1).toLowerCase())).join(' ')
  } else { title = title[0].toUpperCase().concat(title.slice(1).toLowerCase()) };

  if (cuisines && cuisines.length > 0) {
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

  if (diets && diets.length > 0 ){
    Diet.findAll() 
      .then(r=> r.filter(o=> diets.includes(o.name)) )
      .then(r=> r.map( async(d)=> await myrecip.addDiet(d.id) ) )   // d.dataValues.id
      .catch(e=> console.log(e))   
  };  
  if (dishTypes && dishTypes.length > 0 ){
    DishType.findAll()
      .then(r=> r.filter(o=> dishTypes.includes(o.name)) )
      .then(r=> r.map( async(dt)=> await myrecip.addDishType(dt.id) ) )   // dt.dataValues.id
      .catch(e=> console.log(e))
  };  
  if (cuisines && cuisines.length > 0){    
    Cuisine.findAll()
      .then(r=> r.filter(o=> cuisines.includes(o.name)) )
      .then(r=> r.map( async(c)=> await myrecip.addCuisine(c.id) ) )   // c.dataValues.id
      .catch(e=> console.log(e))
  };  
  
  // // await Promise.all( [allDts, allTypes, allCuis] );

  // if (diets && diets.length > 0) {
  //   let newsDiets = await allDts.filter(o=> diets.includes(o.name));   
  //   console.log(newsDiets);
  // };        
  // if (dishTypes && dishTypes.length > 0) {
  //   let newsDishTypes = await allTypes.filter(o=> dishTypes.includes(o.name));  
  //   console.log(newsDishTypes);
  // };
  // if (cuisines && cuisines.length > 0) {
  //   let newsCuis = await allCuis.filter(o=> cuisines.includes(o.name));  
  //   console.log(newsCuis);
  // };

  // if (diets && diets.length > 0 && dishTypes && dishTypes.length > 0 && cuisines && cuisines.length > 0){
  //   await Promise.all( [...newsDiets, ...newsDishTypes, ...newsCuis] );
  // };

  // if (diets && diets.length > 0) {let incDiets = newsDiets.map( async(d)=> await myrecip.addDiet(d.dataValues.id) )};
  // if (dishTypes && dishTypes.length > 0) {let incDT = newsDishTypes.map( async(dt)=> await myrecip.addDishType(dt.dataValues.id) )};
  // if (cuisines && cuisines.length > 0) {let incCuis = newsCuis.map( async(c)=> await myrecip.addCuisine(c.dataValues.id) )};
  
  // // if (diets && diets.length > 0 && dishTypes && dishTypes.length > 0 && cuisines && cuisines.length > 0){
  // //   await Promise.all( [...incDiets, ...incDT, ...incCuis] );
  // // };

  let recipeCreated = await Recipe.findOne({
    where: { id_db: myrecip.id_db },
    include: [ Diet, DishType, Cuisine ]
  });

  return recipeCreated;
};

module.exports = postRecipe;
