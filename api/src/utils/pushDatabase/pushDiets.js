const { Diet } = require('../../db.js');

let diets = [ "gluten free", "dairy free", "paleolithic", "primal", "whole 30", "pescetarian", "low FODMAP"
        "lacto ovo vegetarian", "vegan", "vegetarian", "ovo vegetarian", "lacto vegetarian", "ketogenic" ];

function pushDiets () {
  diets.forEach((d) =>  Diet.create( d ) );
};

module.exports  = pushDiets;
