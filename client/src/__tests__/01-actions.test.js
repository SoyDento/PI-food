import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import {
  getAllrecipes,
  postRecipe,
  getRecipeDetail,
  closeRecipe,
} from "../redux/actions";
import * as data from "../../db.json";

describe("Actions", () => {
  const mockStore = configureStore([thunk]);
  const store = mockStore({
    recipes: [],
    allRecipes: [],
    recipeDetail: {},
    outRecipe: {},
    queryRecipes: [],
    diets: [],
    dishTypes: [],
    cuisines: []
  });

  beforeEach(() => store.clearActions());

  describe("getAllrecipes", () => {
    it('Debería hacer un dispatch con las propiedades type "GET_DB_RECIPES" y como payload, el resultado del fetch al link provisto', async () => {
      return store
        .dispatch(getAllrecipes())
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].payload.length).toBe(323); // cambiar por cantidad de recipes de la API
        })
        .catch((err) => {
          // Acá llegamos cuando tu petición al backend no salió como el test lo pide. Revisá el error en la consola y verificá
          // qué es lo que está pasando.
          console.error(err);
          expect(err).toBeUndefined();
        });
    });
  });

  describe("getRecipeDetail", () => {
    it('Debería hacer un dispatch con las propiedades type "GET_RECIPE_DETAIL" y como payload, el resultado del fetch al link provisto', async () => {
      const payload = data.default[0];
      return store
        .dispatch(getRecipeDetail(2))
        .then(() => {
          const actions = store.getActions();
          expect(actions[1]).toStrictEqual({
            type: "GET_RECIPE_DETAIL",
            payload: { ...payload },
          });
        })
        .catch((err) => {
          // Acá llegamos cuando tu petición al backend no salió como el test lo pide. Revisá el error en la consola y verificá
          // qué es lo que está pasando.
          console.error(err);
          expect(err).toBeUndefined();
        });
    });
  });

  describe("postRecipe", () => {
    it('Debería retornar una action con las propiedades type "POST_RECIPE" y payload: contiene los values recibidos como argumento y un ID incremental en la action creator "postRecipe"', () => {
      // Utilizar la variable id creada en el archivo index.js. La inicializamos en 3 para que los íd's no choquen con los existentes.
      const payload1 = {
        "id": 0,
        "title": "Bis c anench Fries",
        "image": "https://spoonacular.com/recipeImages/715594-312x231.jpg",
        "veryHealthy": true,
        "cheap": false,
        "healthScore": 77,
        "creditsText": "sdsds West",
        "aggregateLikes": 1669,
        "readyInMinutes": 45,
        "servings": 2,
        "sourceUrl": "http://www.pinkwhen.com/homemade-french-fries/",
        "analyzedInstructions": [{ "steps": [] }]
      };
      const payload2 = {
        "id": 0,
        "title": "Bis c aassasaasasasasch Fries",
        "image": "https://spoonacular.com/recipeImages/715594-312x231.jpg",
        "veryHealthy": true,
        "cheap": false,
        "healthScore": 55,
        "creditsText": "sdsds sasasest",
        "aggregateLikes": 1669,
        "readyInMinutes": 45,
        "servings": 2,
        "sourceUrl": "http://www.pinkwhen.com/homemade-french-fries/",
        "analyzedInstructions": [{ "steps": [] }]
      };
      expect(postRecipe(payload1)).objectContaining({
        "id": expect.any(Number),
        "db":0,
        "title": "Bis c anench Fries",
        "image": "https://spoonacular.com/recipeImages/715594-312x231.jpg",
        "veryHealthy": true,
        "cheap": false,
        "healthScore": 77,
        "creditsText": "sdsds West",
        "aggregateLikes": 1669,
        "readyInMinutes": 45,
        "servings": 2,
        "sourceUrl": "http://www.pinkwhen.com/homemade-french-fries/",
        "analyzedInstructions": [{ "steps": [] }]
      });
      expect(postRecipe(payload2)).objectContaining({
        "id": expect.any(Number),
        "db":0,
        "title": "Bis c aassasaasasasasch Fries",
        "image": "https://spoonacular.com/recipeImages/715594-312x231.jpg",
        "veryHealthy": true,
        "cheap": false,
        "healthScore": 55,
        "creditsText": "sdsds sasasest",
        "aggregateLikes": 1669,
        "readyInMinutes": 45,
        "servings": 2,
        "sourceUrl": "http://www.pinkwhen.com/homemade-french-fries/",
        "analyzedInstructions": [{ "steps": [] }]

      });

    });
  });

  describe("closeRecipe", () => {
    it('Debería retornar una action con las propiedades type "CLOSE_RECIPE" y como payload el id de la receta a eliminar. Recibe el id por argumento', () => {
      expect(closeRecipe(1)).toEqual({ type: "CLOSE_RECIPE", payload: 1 });
      expect(closeRecipe(2)).toEqual({ type: "CLOSE_RECIPE", payload: 2 });
    });
  });
});
