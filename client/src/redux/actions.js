export const ADD_QUOTE = "ADD_QUOTE";

export const GET_CHARACTER_DETAIL = 'GET_CHARACTER_DETAIL';

export const EMPTY_CHARACTER_DETAIL="EMPTY_CHARACTER_DETAIL"

export const GET_CHARACTERS = 'GET_CHARACTERS';

export const GET_EPISODES = 'GET_EPISODES';

export const EMPTY_EPISODE_DETAIL = 'EMPTY_EPISODE_DETAIL';

export const GET_EPISODE_DETAIL = 'GET_EPISODE_DETAIL';

export const FILTER_BY_VALUES = 'FILTER_BY_VALUES';

export const FILTER_CREATED = 'FILTER_  CREATED';

export const GET_NAME_RECIP = 'GET_NAME_RECIP';

export const GET_OCCUPATIONS = 'GET_OCCUPATIONS';

export const POST_CHARACTER = 'POST_CHARACTER';

export const ORDER_BY_NAME = 'ORDER_BY_NAME';

export const GET_API_CHARS = 'GET_API_CHARS';

export const GET_DB_CHARS = 'GET_DB_CHARS';

export const REMOVE_CHAR = 'REMOVE_CHAR';

export const CLOSE_CHAR = 'CLOSE_CHAR';

export const CHANGE_AT = 'CHANGE_AT';

//====================================//

export function addQuote() {
    return function(dispatch) {
        //fetchear la Api en la ruta de las quotes random
        return fetch('https://www.breakingbadapi.com/api/quote/random')
        .then(res => res.json())
        //despachar el objeto al reducer
        .then(json => {  dispatch({type: ADD_QUOTE, payload: json[0]})  })
    }
}

//====================================//

export function getCharacters(){
    return function(dispatch) {
            dispatch({type: GET_CHARACTERS})
    }
}

//===================================//
export function getCharacterDetail(id){
    return function(dispatch) {
      if (id.toString().includes('-')) {
        return fetch(`http://localhost:3001/characters/${id}`)
        .then(res => res.json())
        .then(res =>{
          let obj = {
            char_id: res.id,
            name : res.name,
            nickname : res.nickname,
            birthday : res.birthday,
            img : res.img,
            status : res.status,
            occupation : res.occupations.map(e=> e.name),
            created_DB: res.created_DB
          };
          console.log(obj);
          return obj;
        })
        //despachar el objeto al reducer
        .then(json => {  dispatch({type: GET_CHARACTER_DETAIL, payload: json})  })
      };
        return fetch(`https://www.breakingbadapi.com/api/characters/${id}`)
        .then(res => res.json())
        //despachar el objeto al reducer
        .then(json => {  dispatch({type: GET_CHARACTER_DETAIL, payload: json[0]})  })
    }
}
//====================================//

export function emptyCharacterDetail(){
    return function(dispatch) {
            dispatch({type: EMPTY_CHARACTER_DETAIL})

    }
}
//====================================//
export function getEpisodes(){
    return function(dispatch){
        return fetch(`https://www.breakingbadapi.com/api/episodes`)
        .then(res => res.json())
        //despachar el objeto al reducer
        .then(json => {  dispatch({type: GET_EPISODES, payload: json})  })
    }
}
//====================================//

export function emptyEpisodeDetail(){
    return function(dispatch) {
        dispatch({type: EMPTY_EPISODE_DETAIL})
    }
}
//====================================//

export function getEpisodeDetail(id){
    return function(dispatch){
        return fetch(`https://www.breakingbadapi.com/api/episodes/${id}`)
        .then(res => res.json())
        //despachar el objeto al reducer
        .then(json => {  dispatch({type: GET_EPISODE_DETAIL, payload: json[0]})  })
    }
}
//====================================//

export function filterCharByStatus (status) {
  return{
    type: 'FILTER_BY_VALUES',
    payload: status
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

export function etNameRecipe(name){
    return function(dispatch){
        return fetch(`http://localhost:3001/recipes?data=${name}`)
        .then(res => res.json())
        //despachar el objeto al reducer
        .then(json => {  dispatch({type: GET_NAME_RECIP, payload: json})  })
    }
}

export function getOccupations(){
    return function(dispatch){
        return fetch(`http://localhost:3001/occupations`)
        .then(res => res.json())
        //despachar el objeto al reducer
        .then(json => {  dispatch({type: GET_OCCUPATIONS, payload: json})  })
    }
}

export function postCharacters(body){
    return function(dispatch){
        // return axios.post(`https://localhost:3001/postCharacters/`,body)
        // .then(json => {  dispatch({type: POST_CHARACTER, payload: json})  })
        return fetch(`http://localhost:3001/characters`, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(body), // data can be `string` or {object}!
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => dispatch({type: POST_CHARACTER, payload: res.json()}) )
          .catch(error => console.error('Error:', error))
          .then(response => console.log('Success:', response));
    }
}

export function getApiChars(){
    return function(dispatch) {
        //fetchear la Api en la ruta de las quotes random
        return fetch(`https://www.breakingbadapi.com/api/characters`)
        .then(res => res.json())
        //despachar el objeto al reducer
        .then(json => {  dispatch({type: GET_API_CHARS, payload: json})  })
    }
}

export function getDbChars(){
    return function(dispatch) {
        //fetchear la Api en la ruta de las quotes random
        return fetch(`http://localhost:3001/characters`)
        .then(res => res.json())
        .then(res =>{
          let arr = []
          res.forEach( o=>{
            arr.push({
              char_id: o.id,
              name : o.name,
              nickname : o.nickname,
              birthday : o.birthday,
              img : o.img,
              status : o.status,
              occupation : o.occupations.map(e=> e.name),
              created_DB: o.created_DB
            })
          })
          // console.log(arr);
          return arr;
        })
        .then(json => {  dispatch({type: GET_DB_CHARS, payload: json})  })
    }
}

export function removeChar (idChar) {
  console.log(idChar);
  return function(dispatch) {
      return fetch(`http://localhost:3001/removeChar?id=${idChar}`, {
            method: 'DELETE', // or 'PUT'
            // body: JSON.stringify(idChar), // data can be `string` or {object}!
            headers:{
              'Content-Type': 'application/json'
            }
          })
      .then(res => res.json())
      .then(json => {  dispatch({type: REMOVE_CHAR, payload: json})  })
  }
}

export function closeCharacter (idChar) {
  return{
    type: CLOSE_CHAR,
    payload: idChar
  }
}

export function changeAtrib (attribute, id, valor) {
  console.log(id); console.log(attribute); console.log(valor);
  return function(dispatch) {
      return fetch(`http://localhost:3001/${attribute}?idChar=${id}&value=${valor}`, {
            method: 'PUT',
            headers:{ 'Content-Type': 'application/json' }
          })
      .then(res => res.json())
      .then(json => {  dispatch({type: CHANGE_AT, payload: json})  })
  }
}
