const { YOUR_API_KEY, Recipe, Cuisine, Diet, DishType } = require('../../db.js');
const axios = require('axios').default;

function addTables () {

  axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&number=100&addRecipeInformation=true`)
    .then(r=> r.data.results)
    .then(r=>{
      r.forEach(async(obj) => {

        let allDts = await Diet.findAll(), allTypes = await DishType.findAll(), allCuis = await Cuisine.findAll();
        // await Promise.all( [allDts, allTypes, allCuis] );
        let newsDts = allDts.filter(o=> obj.diets.includes(o.name)); // console.log(newsDts);
        let newsDishTypes = allTypes.filter(o=> obj.dishTypes.includes(o.name));  // console.log(newsDishTypes);
        let newsCuis = allCuis.filter(o=> obj.cuisines.includes(o.name)); //  console.log(allCuis);

        let myrecip = await Recipe.findOne({ where: { title: obj.title } });  // console.log(myrecip.dataValues);

        let incDiets = newsDts.map( (d)=> myrecip.addDiet(d.id) );
        let incDT = newsDishTypes.map( (dt)=> myrecip.addDishType(dt.id) );
        let incCuis = newsCuis.map( (c)=> myrecip.addCuisine(c.id) );
      });
    })
    .catch(e=> console.log(e));

};

module.exports = addTables;
