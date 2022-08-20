const { Cuisine } = require('../../db.js');

let cuisines = [ 'Argentinian', 'Vasque', 'Galician', 'nordic', 'African', 'American', 'British', 'Cajun',
  'Caribbean', 'Chinese', 'Eastern European', 'European', 'French', 'German', 'Greek', 'Indian', 'Irish',
  'Italian', 'Japanese', 'Jewish', 'Korean', 'Latin American', 'Mediterranean', 'Mexican', 'Middle Eastern',
  'Nordic', 'Southern', 'Arabic', 'Spanish', 'Thai', 'Vietnamese' ];

  function pushDiets () {
    cuisines.forEach((c) =>  Cuisine.create({ name: c }) );
  };

  module.exports  = pushDiets;
