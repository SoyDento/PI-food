const { Router } = require('express');
const axios = require('axios');
const { Recipe, Diet, DishType, Cuisine } = require('../db.js');


async function getIDrecipe (id) {

  try {
    let recipe = await Recipe.findOne({
        // logging: console.log,
        where: { id },
        include: [ Diet, DishType, Cuisine ]
      });
    return recipe;

  } catch (e) { console.log('falló el get a DB(/:id): ', e.message) }

};

module.exports = getIDrecipe;
