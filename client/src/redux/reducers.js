import {ADD_QUOTE,
    GET_CHARACTERS,
    GET_CHARACTER_DETAIL,
    GET_EPISODES,
    EMPTY_CHARACTER_DETAIL,
    GET_EPISODE_DETAIL,
    EMPTY_EPISODE_DETAIL,
    FILTER_BY_VALUES,
    FILTER_CREATED,
    ORDER_BY_NAME,
    GET_NAME_CHAR,
    POST_CHARACTER,
    GET_OCCUPATIONS,
    GET_API_CHARS,
    GET_DB_CHARS,
    REMOVE_CHAR,
    CLOSE_CHAR,
    CHANGE_AT}
     from "../actions";

//==== Setear Estado Global Inicial ======//

const initialState = {
    quote : {},
    characters: [],
    allCharacters: [],
    apiChars: [],
    dbChars: [],
    characterDetail: {},
    outIDcharacter: {},
    episodes: [],
    episodeDetail:{},
    occupations: []
}

//==== Setear Reducers ======//
function rootReducer(state = initialState, action){
    if(action.type === ADD_QUOTE){
        return {
            ...state,
            quote: action.payload
        }
    }
    if(action.type === GET_API_CHARS){
        return {
            ...state,
            characters: action.payload,
            apiChars: action.payload,
            allCharacters: [...state.dbChars, ...action.payload]
        }
    }
    if(action.type === GET_DB_CHARS){
        return {
            ...state,
            dbChars: action.payload
        }
    }
    if(action.type === GET_CHARACTERS){
        return {
            ...state,
            characters: state.allCharacters
        }
    }
    if(action.type === GET_CHARACTER_DETAIL){
        return {
            ...state,
            characterDetail: action.payload
        }
    }
    if(action.type === EMPTY_CHARACTER_DETAIL) {
        return {
            ...state,
            characterDetail:{}
        }
    }
    if(action.type === GET_EPISODES){
        return {
            ...state,
            episodes: action.payload
        }
    }
    if(action.type === GET_EPISODE_DETAIL){
        return {
            ...state,
            episodeDetail:action.payload
        }
    }
    if(action.type === EMPTY_EPISODE_DETAIL){
        return {
            ...state,
            episodeDetail:{}
        }
    }
    if(action.type === FILTER_BY_VALUES){
        let allCharacters = state.allCharacters;
        let statusFilter = action.payload === 'All' ?
                allCharacters :
                allCharacters.filter( (el)=> el.status === action.payload )
        return {
            ...state,
            characters: statusFilter
        }
    }
    if(action.type === FILTER_CREATED){
      let allChs = state.allCharacters;
      let createdFilter = (action.payload === 'created') ?
        allChs.filter( (el)=> el.status === 'Presumed dead' ) :
        allChs.filter( (el)=> el.status === 'Alive' )

        return {
          ...state,
          characters: createdFilter
        }
    }
    if(action.type === ORDER_BY_NAME){
        const sortedArr = action.payload === 'ascending order' ?
                state.allCharacters.sort( function(x,y) {
                    if (x.name < y.name) return -1;
                    if (x.name > y.name) return 1;
                    return 0;
                  })  :
              state.allCharacters.sort( function(x,y) {
                  if (x.name < y.name) return 1;
                  if (x.name > y.name) return -1;
                  return 0;
                });

        return {
            ...state,
            characters: sortedArr
        }
    }
    if(action.type === GET_NAME_CHAR){
        return {
            ...state,
            characters: action.payload
        }
    }
    if(action.type === POST_CHARACTER){
        return {
            ...state,
            newChar: action.payload
        }
    }
    if(action.type === GET_OCCUPATIONS){
        return {
            ...state,
            occupations: action.payload
        }
    }
    if(action.type === REMOVE_CHAR){
        return {
            ...state,
            characters: state.characters.filter(c=> c.char_id !== action.payload.id),
            allCharacters: state.allCharacters.filter(c=> c.char_id !== action.payload.id),
            outIDcharacter: action.payload.id
        }
    }
    if(action.type === CLOSE_CHAR){
        return {
            ...state,
            characters: state.characters.filter(c=> c.char_id !== action.payload.id),
            allCharacters: state.allCharacters.filter(c=> c.char_id !== action.payload.id),
            outIDcharacter: action.payload
        }
    }
    if(action.type === CHANGE_AT){
      let chars = state.characters.filter(c=> c.char_id !== action.payload.id);
      let allChars = state.allCharacters.filter(c=> c.char_id !== action.payload.id);
      return {
        ...state,
        characters: [...chars, action.payload],
        allCharacters: [...allChars, action.payload]
      }
    }

    return state;

}


export default rootReducer;
