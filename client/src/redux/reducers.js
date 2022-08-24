import {
    GET_RECIPES,
    GET_RECIPE_DETAIL,    
    EMPTY_RECIPE_DETAIL,    
    FILTER_BY_VALUES,
    FILTER_BY_DIETS,
    FILTER_CREATED,
    ORDER_BY_NAME,
    GET_NAME_RECIPES,
    POST_RECIPE,
    GET_DIETS,
    GET_CUISINES,
    GET_DB_RECIPES,
    REMOVE_RECIPE,
    CLOSE_RECIPE,
    CHANGE_AT}
     from "../actions";


//==== Acá Seteo Estado Global Inicial ======//

const initialState = {
    recipes: [],
    allRecipes: [],
    recipeDetail: {},
    outIDrecipe: {},
    episodes: [],
    episodeDetail:{},
    diets: [],
    dishTypes: [],
    cuisines: []
}


function rootReducer(state = initialState, action){
    
    if(action.type === GET_RECIPES){
        return {
            ...state,
            recipes: action.payload,
            allRecipes: action.payload            
        }
    }      
    if(action.type === GET_RECIPE_DETAIL){
        return {
            ...state,
            recipeDetail: action.payload
        }
    }
    if(action.type === EMPTY_RECIPE_DETAIL) {
        return {
            ...state,
            recipeDetail:{}
        }
    }    
    if(action.type === FILTER_BY_VALUES){
        let allRecipes = state.allRecipes;
        let filter = allRecipes.filter((o)=> o.dishTypes.includes(action.payload) )
        return {
            ...state,
            recipes: filter
        }
    }
    if(action.type === FILTER_BY_DIETS){
        let allRecipes = state.allRecipes;
        let filter = allRecipes.filter((o)=> o.diets.includes(action.payload) )
        return {
            ...state,
            recipes: filter
        }
    }
    if(action.type === FILTER_CREATED){
      let allRecipes = state.allRecipes;
      let createdFilter = (action.payload === 'created') ?
        allRecipes.filter( (el)=> el.db === 0 ) : allRecipes.filter( (el)=> el.db !== 0 )        
        return {
          ...state,
          recipes: createdFilter
        }
    }
    if(action.type === ORDER_BY_NAME){
        const sortedArr = action.payload === 'alphabetically ascending' ?
                state.allRecipes.sort( function(x,y) {
                    if (x.name < y.name) return -1;
                    if (x.name > y.name) return 1;
                    return 0;
                  })  :
              state.allRecipes.sort( function(x,y) {
                  if (x.name < y.name) return 1;
                  if (x.name > y.name) return -1;
                  return 0;
                });

        return {
            ...state,
            recipes: sortedArr
        }
    }
    if(action.type === GET_DB_RECIPES){
        return {
            ...state,
            recipes: action.payload,
            allRecipes: action.payload 
        }
    } 
    if(action.type === GET_NAME_RECIPES){
        return {
            ...state,
            recipes: action.payload
        }
    }
    if(action.type === POST_RECIPE){
        return {
            ...state,
            newChar: action.payload
        }
    }
    if(action.type === GET_CUISINES){
        return {
            ...state,
            cuisines: action.payload
        }
    }
    if(action.type === GET_DIETS){
        return {
            ...state,
            diets: action.payload
        }
    }
    if(action.type === GET_DISH_TYPES){
        return {
            ...state,
            dishTypes: action.payload
        }
    }
    if(action.type === REMOVE_RECIPE){
        return {
            ...state,
            recipes: state.recipes.filter(c=> c.id !== action.payload.id),
            allRecipes: state.allRecipes.filter(c=> c.id !== action.payload.id),
            outIDrecipe: action.payload.id
        }
    }
    if(action.type === CLOSE_RECIPE){
        return {
            ...state,
            recipes: state.recipes.filter(c=> c.id !== action.payload.id),
            allRecipes: state.allRecipes.filter(c=> c.id !== action.payload.id),
            outIDrecipe: action.payload
        }
    }
    if(action.type === CHANGE_AT){
      let recips = state.recipes.filter(c=> c.id !== action.payload.id);
      let allRecipes = state.allRecipes.filter(c=> c.id !== action.payload.id);
      return {
        ...state,
        recipes: [...recips, action.payload],
        allRecipes: [...allRecipes, action.payload]
      }
    }

    return state;

}


export default rootReducer;
