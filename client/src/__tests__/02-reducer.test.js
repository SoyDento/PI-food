import rootReducer from "../redux/reducers";
import { 
  postRecipe,
  closeRecipe,
  GET_DB_RECIPES,
  GET_RECIPE_DETAIL,
} from "../redux/actions";
import * as data from "../../db.json";

describe("Reducer", () => {
  const state = {
    recipes: [],
    allRecipes: [],
    recipeDetail: {},
    outRecipe: {},
    queryRecipes: [],
    diets: [],
    dishTypes: [],
    cuisines: []
  };

  it("Debería retornar el estado inicial si no se pasa un type válido", () => {
    expect(rootReducer(undefined, [])).toEqual({
      recipes: [],
      allRecipes: [],
      recipeDetail: {},
      outRecipe: {},
      queryRecipes: [],
      diets: [],
      dishTypes: [],
      cuisines: []
    });
  });

  it('Debería guardar en nuestro state las recipes obtenidas de nuestro llamado al back cuando action type es "GET_DB_RECIPES"', () => {
    // console.log(data.default);
    const result = rootReducer(state, {
      type: GET_DB_RECIPES,
      payload: data.default,
    });
    // Ojooo. Recodar que no debemos mutar nuestro state!
    expect(result).not.toEqual(state);
    expect(result.recipes.length).toEqual(5);
  });

  it('Debería guardar en nuestro state la recipe obtenida de nuestro llamado al back cuando action type es "GET_RECIPE_DETAIL"', () => {
    const result = rootReducer(state, {
      type: GET_RECIPE_DETAIL,
      payload: data.default[0],
    });
    // Ojooo. Recodar que no debemos mutar nuestro state!
    expect(result).not.toEqual(state);
    expect(result).toEqual({
      recipes: [],
      allRecipes: [],
      recipeDetail: data.default[0],
      outRecipe: {},
      queryRecipes: [],
      diets: [],
      dishTypes: [],
      cuisines: []
    });
  });


  it('Debería eliminar una recipe de nuestro store cuando action type es "CLOSE_RECIPE"', () => {
    // console.log(data.default);
    const state = {
      recipes: data.default,
      queryRecipes: data.default,
    };

    const recipes1 = [data.default[1], data.default[2], data.default[3], data.default[4]];
    const recipes2 = [data.default[0], data.default[2], data.default[3], data.default[4]];
    const result1 = rootReducer(state, closeRecipe(2)); // console.log(result1);
    const result2 = rootReducer(state, closeRecipe(1)); // console.log(result2);

    // Ojooo. Recodar que no debemos mutar nuestro state!
    expect(result1).not.toEqual(state);
    expect(result2).not.toEqual(state);

    expect({recipes1: result1.queryRecipes}).toEqual({
       recipes1
    });
    expect({recipes2: result2.queryRecipes}).toEqual({
      recipes2
    });
  });
});
