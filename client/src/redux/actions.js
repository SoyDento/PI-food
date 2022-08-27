export const GET_RECIPE_DETAIL = 'GET_RECIPE_DETAIL';

export const EMPTY_RECIPE_DETAIL="EMPTY_RECIPE_DETAIL"

export const GET_RECIPES = 'GET_RECIPES';

export const FILTER_BY_VALUES = 'FILTER_BY_VALUES';

export const FILTER_BY_DIETS = 'FILTER_BY_DIETS';

export const FILTER_CREATED = 'FILTER_  CREATED';

export const GET_NAME_RECIPES = 'GET_NAME_RECIPES';

export const GET_DIETS = 'GET_DIETS';

export const GET_CUISINES = 'GET_CUISINES';

export const GET_DISH_TYPES = 'GET_DISH_TYPES';

export const POST_RECIPE = 'POST_RECIPE';

export const ORDER_BY_NAME = 'ORDER_BY_NAME';

export const GET_DB_RECIPES = 'GET_DB_RECIPES';

export const REMOVE_RECIPE = 'REMOVE_RECIPE';

export const CLOSE_RECIPE = 'CLOSE_RECIPE';

export const CHANGE_AT = 'CHANGE_AT';

//====================================//


export function getRecipes(){
  return function(dispatch) {        
    return fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=7bc6e5fb0f4a44fe9baa3e7dce8a6665&number=100&addRecipeInformation=true`)
    .then(res => res.json())
    .then(res =>{
      let arr = []
      res.forEach( o=>{
        arr.push({
            id: o.id_db,
            db: 1,
            title: o.title,
            image: o.image,            
            cheap: o.cheap,
            healthScore : o.healthScore,
            diets : o.diets,
            dishTypes : o.dishTypes,
            cuisines : o.cuisines,
            created_DB: false
        })
      })
      // console.log(arr);
      return arr;
    })
    .then(json => {  dispatch({type: GET_RECIPES, payload: json})  })
}
}

//===================================//


export function getRecipeDetail(id, creat){
  console.log(id);
    return function(dispatch) {
      if (creat) {
        return fetch(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=f01dd829cbbd4de49a96e591532f1ca1`) 
        .then(res => res.json())
        .then(res =>{
          let obj = {
            id: res.id_db,
            db: res.id,
            title: res.title,
            image: res.image,
            veryHealthy : res.veryHealthy,
            cheap: res.cheap,
            healthScore : res.healthScore,
            creditsText : res.creditsText,
            aggregateLikes: res.aggregateLikes,
            readyInMinutes : res.readyInMinutes,
            servings : res.servings,
            sourceUrl: res.sourceUrl,
            analyzedInstructions : res.analyzedInstructions,
            diets : res.diets,
            dishTypes : res.dishTypes,
            cuisines : res.cuisines,
            created_DB: false,
          };
          console.log(obj);
          return obj;
        })
        .then(json => {  dispatch({type: GET_RECIPE_DETAIL, payload: json})  }) // o  payload: json[0]
      };      
      return fetch(`http://localhost:3001/recipe/${id}`)
      .then(res => res.json())
      .then(res =>{
        let obj = {
          id: res.id_db,
          db: res.id,
          title: res.title,
          image: res.image,
          veryHealthy : res.veryHealthy,
          cheap: res.cheap,
          healthScore : res.healthScore,
          creditsText : res.creditsText,
          aggregateLikes: res.aggregateLikes,
          readyInMinutes : res.readyInMinutes,
          servings : res.servings,
          sourceUrl: res.sourceUrl,
          analyzedInstructions : res.analyzedInstructions,
          diets : res.diets.map(e=> e.name),
          dishTypes : res.dishTypes.map(e=> e.name),
          cuisines : res.cuisines.map(e=> e.name),
          created_DB: res.created_DB
        };
        console.log(obj);
        return obj;
      })
      .then(json => {  dispatch({type: GET_RECIPE_DETAIL, payload: json})  })
    }
}

//====================================//

export function emptyRecipeDetail(){
    return function(dispatch) {
            dispatch({type: EMPTY_RECIPE_DETAIL})

    }
}

//====================================//

export function filterByValues (dishType) {
  return{
    type: 'FILTER_BY_VALUES',
    payload: dishType
  }
}

export function filterByDiets (diet) {
  return{
    type: 'FILTER_BY_DIETS',
    payload: diet
  }
}

export function filterCreated (payload) {
  return{
    type: 'FILTER_CREATED',
    payload
  }
}

export function orderByName (payload) {
  return{
    type: 'ORDER_BY_NAME',
    payload
  }
}

//====================================//

export function getNameRecipe(name){
    return function(dispatch){
        return fetch(`http://localhost:3001/recipes?data=${name}`)
        .then(res => res.json())
        .then(res =>{
          console.log(res);
          if (res[0].hasOwnProperty('msg')) return res;
          let arr = []
          res.forEach( o=>{
            arr.push({
                id: o.id_db,
                db: o.id,
                title: o.title,
                image: o.image,            
                cheap: o.cheap,
                healthScore : o.healthScore,                
                diets : o.diets.map(e=> e.name),
                dishTypes : o.dishTypes.map(e=> e.name),
                cuisines : o.cuisines.map(e=> e.name),
                created_DB: false
            })
          })
          // console.log(arr);
          return arr;
        })
        .then(json => {  dispatch({type: GET_NAME_RECIPES, payload: json})  })
    }
}

//====================================//

export function getDiets(){
    return function(dispatch){
        return fetch(`http://localhost:3001/diets`)
        .then(res => res.json())
        //despachar el objeto al reducer
        .then(json => {  dispatch({type: GET_DIETS, payload: json})  })
    }
}

export function getDishTypes(){
  return function(dispatch){
      return fetch(`http://localhost:3001/dishTypes`)
      .then(res => res.json())
      //despachar el objeto al reducer
      .then(json => {  dispatch({type: GET_DISH_TYPES, payload: json})  })
  }
}

export function getCuisines(){
  return function(dispatch){
      return fetch(`http://localhost:3001/cuisines`)
      .then(res => res.json())
      //despachar el objeto al reducer
      .then(json => {  dispatch({type: GET_CUISINES, payload: json})  })
  }
}

//====================================//

export function postRecipe(body){
    return function(dispatch){
        // return axios.post(`https://localhost:3001/postRecipes/`,body)
        // .then(json => {  dispatch({type: POST_RECIPE, payload: json})  })
        return fetch(`http://localhost:3001/recipes`, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(body), // data can be `string` or {object}!
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => dispatch({type: POST_RECIPE, payload: res.json()}) )
          .catch(error => console.error('Error:', error))
          .then(response => console.log('Success:', response));
    }
}

//====================================//

export function getDbRecipes(){
    return function(dispatch) {
        return fetch(`http://localhost:3001/recipes`)
        .then(res => res.json())
        .then(res =>{
          let arr = []
          res.forEach( o=>{
            arr.push({
                id: o.id_db,
                db: o.id,
                title: o.title,
                image: o.image,            
                cheap: o.cheap,
                healthScore : o.healthScore,                
                diets : o.diets.map(e=> e.name),
                dishTypes : o.dishTypes.map(e=> e.name),
                cuisines : o.cuisines.map(e=> e.name),
                created_DB: false
            })
          })
          // console.log(arr);
          return arr;
        })
        .then(json => {  dispatch({type: GET_DB_RECIPES, payload: json})  })
    }
}

//====================================//

export function removeRecipe (id) {
  console.log(id);
  return function(dispatch) {
      return fetch(`http://localhost:3001/recipe/remove?id=${id}`, {
            method: 'DELETE', 
            headers:{
              'Content-Type': 'application/json'
            }
          })
      .then(res => res.json())
      .then(json => {  dispatch({type: REMOVE_RECIPE, payload: json})  })
  }
}

export function closeRecipe (id) {
  return{
    type: CLOSE_RECIPE,
    payload: id
  }
}

export function changeAtrib (attribute, id, valor) {
  console.log(id); console.log(attribute); console.log(valor);
  return function(dispatch) {
      return fetch(`http://localhost:3001/recipe/${attribute}?id=${id}&value=${valor}`, {
            method: 'PUT',
            headers:{ 'Content-Type': 'application/json' }
          })
      .then(res => res.json())
      .then(json => {  dispatch({type: CHANGE_AT, payload: json})  })
  }
}
