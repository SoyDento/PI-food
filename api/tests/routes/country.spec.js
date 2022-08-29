/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');
const { expect } = require('chai');

const agent = session(app);
const recipe = {
    id: 0,
    title: "Bis Homemade Garlicrrrand Basil French Fries",
    image: "https://spoonacular.com/recipeImages/715594-312x231.jpg",
    veryHealthy: true,
    cheap: false,
    healthScore: 77,
    creditsText: "Jen West",
    aggregateLikes: 1669,
    readyInMinutes: 45,
    servings: 2,
    sourceUrl: "http://www.pinkwhen.com/homemade-french-fries/",
    analyzedInstructions: [],
};

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: false })
    .then(() => Recipe.create(recipe)));

  describe('GET /recipes', () => {
    it('should get 200', () =>
      agent.get('/recipes').expect(200)
    );
    it('should get 200', () =>
      agent.get('/recipes')
        .expect(200)
        .expect('Content-Type', /json/) // podemos testear los headers
        .expect(function (res) {
          expect(res.body.length).to.eql(312) // testeamos la respuesta con el body
        })
    );
    it('should get 200', () =>
      agent.get('/recipe/2')
        .expect(200)
        .expect('Content-Type', /json/) // podemos testear los headers
        .expect(function (res) {
          expect(res.body).to.eql({
            "id_db": 2,
            "id": 715594,
            "title": "Homemade Garlic and Basil French Fries",
            "image": "https://spoonacular.com/recipeImages/715594-312x231.jpg",
            "veryHealthy": true,
            "cheap": false,
            "healthScore": 77,
            "creditsText": "Jen West",
            "aggregateLikes": 1669,
            "readyInMinutes": 45,
            "servings": 2,
            "sourceUrl": "http://www.pinkwhen.com/homemade-french-fries/",
            "analyzedInstructions": [
              
            ],
            "created_DB": true,
            "diets": [
              {
                "id": 2,
                "name": "dairy free",
                "RecipeDiet": {
                  "createdAt": "2022-08-18T22:33:51.348Z",
                  "updatedAt": "2022-08-18T22:33:51.348Z",
                  "recipeIdDb": 2,
                  "dietId": 2
                }
              },
              {
                "id": 8,
                "name": "lacto ovo vegetarian",
                "RecipeDiet": {
                  "createdAt": "2022-08-18T22:33:51.379Z",
                  "updatedAt": "2022-08-18T22:33:51.379Z",
                  "recipeIdDb": 2,
                  "dietId": 8
                }
              },
              {
                "id": 9,
                "name": "vegan",
                "RecipeDiet": {
                  "createdAt": "2022-08-18T22:33:51.398Z",
                  "updatedAt": "2022-08-18T22:33:51.398Z",
                  "recipeIdDb": 2,
                  "dietId": 9
                }
              }
            ],
            "dishTypes": [
              {
                "id": 16,
                "name": "lunch",
                "RecipeDishType": {
                  "createdAt": "2022-08-18T22:33:51.393Z",
                  "updatedAt": "2022-08-18T22:33:51.393Z",
                  "recipeIdDb": 2,
                  "dishTypeId": 16
                }
              },
              {
                "id": 15,
                "name": "dinner",
                "RecipeDishType": {
                  "createdAt": "2022-08-18T22:33:51.390Z",
                  "updatedAt": "2022-08-18T22:33:51.390Z",
                  "recipeIdDb": 2,
                  "dishTypeId": 15
                }
              },
              {
                "id": 1,
                "name": "main course",
                "RecipeDishType": {
                  "createdAt": "2022-08-18T22:33:51.384Z",
                  "updatedAt": "2022-08-18T22:33:51.384Z",
                  "recipeIdDb": 2,
                  "dishTypeId": 1
                }
              }
            ],
            "cuisines": [
              {
                "id": 6,
                "name": "American",
                "RecipeCuisine": {
                  "createdAt": "2022-08-18T22:33:51.415Z",
                  "updatedAt": "2022-08-18T22:33:51.415Z",
                  "recipeIdDb": 2,
                  "cuisineId": 6
                }
              }
            ]
          }) // testeamos la respuesta con el body
        })
    );
    it('you should get {} when you passed wrong id', () =>
      agent.get('/recipes/6d317822-d457-458f-a553-7db90a7c0fdc')
        .expect(function (res) {
          expect(res.body).to.eql({}) // testeamos la respuesta con el body
        })
    );
    it('should get status 200 and an array of recipes that match the dataquery', () =>
      agent.get('/recipes?data=bis')
        .expect(200)
        .expect('Content-Type', /json/) // podemos testear los headers
        .expect(function (res) {
          expect(res.body.length).to.eql(7) // testeamos la respuesta con el body
        })
    );

  });

  describe('POST /recipes', () => {
    it('should get status 200 and add a character', () =>
      agent.post('/recipe')
        .send({
          id: 0,
          title: "Bis Homemnd Basil French Fries",
          image: "https://spoonacular.com/recipeImages/715594-312x231.jpg",
          veryHealthy: true,
          cheap: false,
          healthScore: 77,
          creditsText: "Jen West",
          aggregateLikes: 1669,
          readyInMinutes: 45,
          servings: 2,
          sourceUrl: "http://www.pinkwhen.com/homemade-french-fries/",
          analyzedInstructions: [],
            })
        .expect(200)
    );
  });

  describe('PUT /attribute', () => {
    it('should get status 200 and modify the attribute', () =>
      agent.put('/recipe/aggregateLikes?id=327&value=1')
        .expect(200)
        .expect('Content-Type', /json/) // podemos testear los headers
        .expect(function (res) {
          expect(res.body).to.eql({
            "id_db": 327,
            "id": 715594,
            "title": "Bis C And Basil French Fries",
            "image": "https://spoonacular.com/recipeImages/715594-312x231.jpg",
            "veryHealthy": true,
            "cheap": false,
            "healthScore": 77,
            "creditsText": "Jen West",
            "aggregateLikes": 2,
            "readyInMinutes": 45,
            "servings": 2,
            "sourceUrl": "http://www.pinkwhen.com/homemade-french-fries/",
            "analyzedInstructions": [],
            "created_DB": true,
            "diets": [],
            "dishTypes": [],
            "cuisines": []
              }) // testeamos la respuesta con el body
        })
    );
  });


});
