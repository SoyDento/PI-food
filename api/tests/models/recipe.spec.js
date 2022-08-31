const { Recipe, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: false }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
        // expect(Recipe.findAll()).toHaveLength(323);
      });
      it('should work when its a valid name', () => {
        Recipe.create({ 
          id: 0,
          title: " Bis Cauli,Riceasasasasas, Vegetable",
          image: "https://spoonacular.com/recipeImages/716426-312x231.jpg",
          veryHealthy: true,
          cheap: false,
          healthScore: 76,
          creditsText: "Full Belly Sisters",
          aggregateLikes: 3690,
          readyInMinutes: 30,
          servings: 8,
          sourceUrl: "http://fullbellysisters.blogspot.com/2012/01/cauliflower-fried-rice-more-veggies.html",
          analyzedInstructions: [
            {
              "name": "",
              "steps": [
                {
                  "number": 1,
                  "step": "Remove the cauliflower's tough stem and reserve for another use. Using a food processor, pulse cauliflower florets until they resemble rice or couscous. You should end up with around four cups of \"cauliflower rice.\"",
                  "ingredients": [                    
                    {
                      "id": 11135,
                      "name": "cauliflower",
                      "localizedName": "cauliflower",
                      "image": "cauliflower.jpg"
                    },
                    {
                      "id": 20028,
                      "name": "couscous",
                      "localizedName": "couscous",
                      "image": "couscous-cooked.jpg"
                    },
                    {
                      "id": 20444,
                      "name": "rice",
                      "localizedName": "rice",
                      "image": "uncooked-white-rice.png"
                    }
                  ],
                  "equipment": [
                    {
                      "id": 404771,
                      "name": "food processor",
                      "localizedName": "food processor",
                      "image": "food-processor.png"
                    }
                  ]
                },
                {
                  "number": 2,
                  "step": "Heat 1T butter and 1T oil in a large skillet over medium heat.",
                  "ingredients": [
                    {
                      "id": 1001,
                      "name": "butter",
                      "localizedName": "butter",
                      "image": "butter-sliced.jpg"
                    },
                    {
                      "id": 4582,
                      "name": "cooking oil",
                      "localizedName": "cooking oil",
                      "image": "vegetable-oil.jpg"
                    }
                  ],
                  "equipment": [
                    {
                      "id": 404645,
                      "name": "frying pan",
                      "localizedName": "frying pan",
                      "image": "pan.png"
                    }
                  ]
                },
                {
                  "number": 3,
                  "step": "Add garlic and the white and light green pieces of scallion. Sauté about a minute.",
                  "ingredients": [
                    {
                      "id": 11291,
                      "name": "green onions",
                      "localizedName": "green onions",
                      "image": "spring-onions.jpg"
                    },
                    {
                      "id": 11215,
                      "name": "garlic",
                      "localizedName": "garlic",
                      "image": "garlic.png"
                    }
                  ],
                  "equipment": [
                    
                  ]
                },
                {
                  "number": 4,
                  "step": "Add the cauliflower to the pan. Stir to coat with oil, then spread out in pan and let sit; you want it cook a bit and to caramelize (get a bit brown), which will bring out the sweetness. After a couple of minutes, stir and spread out again.",
                  "ingredients": [                    
                    {
                      "id": 4582,
                      "name": "cooking oil",
                      "localizedName": "cooking oil",
                      "image": "vegetable-oil.jpg"
                    }
                  ],
                  "equipment": [
                    {
                      "id": 404645,
                      "name": "frying pan",
                      "localizedName": "frying pan",
                      "image": "pan.png"
                    }
                  ]
                },
                {
                  "number": 5,
                  "step": "Add cold rice (it separates easily, so it won't clump up during cooking), plus the additional grapeseed and coconut oil or butter. Raise heat to medium-high. Toss everything together and, again, spread the mixture out over the whole pan and press a bit into the bottom.",
                  "ingredients": [                   
                    {
                      "id": 0,
                      "name": "spread",
                      "localizedName": "spread",
                      "image": ""
                    },
                    {
                      "id": 20444,
                      "name": "rice",
                      "localizedName": "rice",
                      "image": "uncooked-white-rice.png"
                    }
                  ],
                  "equipment": [
                    {
                      "id": 404645,
                      "name": "frying pan",
                      "localizedName": "frying pan",
                      "image": "pan.png"
                    }
                  ]
                },
                {
                  "number": 6,
                  "step": "Let it sit for about two minutes—so the rice can get toasted and a little crispy.",
                  "ingredients": [
                    {
                      "id": 20444,
                      "name": "rice",
                      "localizedName": "rice",
                      "image": "uncooked-white-rice.png"
                    }
                  ],
                  "equipment": []
                },
                {
                  "number": 7,
                  "step": "Add the peas and broccoli and stir again.",
                  "ingredients": [
                    {
                      "id": 11090,
                      "name": "broccoli",
                      "localizedName": "broccoli",
                      "image": "broccoli.jpg"
                    },
                    {
                      "id": 11304,
                      "name": "peas",
                      "localizedName": "peas",
                      "image": "peas.jpg"
                    }
                  ],
                  "equipment": []
                },
                {
                  "number": 8,
                  "step": "Drizzle soy sauce and toasted sesame oil over rice.Cook for another minute or so and turn off heat.",
                  "ingredients": [
                    {
                      "id": 4058,
                      "name": "sesame oil",
                      "localizedName": "sesame oil",
                      "image": "sesame-oil.png"
                    },
                    {
                      "id": 16124,
                      "name": "soy sauce",
                      "localizedName": "soy sauce",
                      "image": "soy-sauce.jpg"
                    },
                    {
                      "id": 20444,
                      "name": "rice",
                      "localizedName": "rice",
                      "image": "uncooked-white-rice.png"
                    }
                  ],
                  "equipment": []
                },
                {
                  "number": 9,
                  "step": "Add chopped scallion tops and toss.I like to toast some sesame seeds in a dry pan; I sprinkle these and some more raw, chopped scallion over the top of the rice for added flavor and crunch.Season to taste with salt and, if you'd like, more soy sauce. Keep in mind that if you're serving this with something salty and saucy (ie. teriyaki chicken) you may want to hold off on adding too much salt to the fried rice.",
                  "ingredients": [                    
                    {
                      "id": 5006,
                      "name": "whole chicken",
                      "localizedName": "whole chicken",
                      "image": "whole-chicken.jpg"
                    },
                    {
                      "id": 18070,
                      "name": "toast",
                      "localizedName": "toast",
                      "image": "toast"
                    },
                    {
                      "id": 2047,
                      "name": "salt",
                      "localizedName": "salt",
                      "image": "salt.jpg"
                    }
                  ],
                  "equipment": [
                    {
                      "id": 404645,
                      "name": "frying pan",
                      "localizedName": "frying pan",
                      "image": "pan.png"
                    }
                  ]
                }
              ]
            }
          ]
        });
        // expect(Recipe.findAll()).toHaveLength(324);
      });
    });
  });
});
