import rootReducer from "../reducers";
import {
  postCharacters,
  closeCharacter,
  GET_API_CHARS,
  GET_CHARACTER_DETAIL,
} from "../actions";
import * as data from "../../db.json";

describe("Reducer", () => {
  const state = {
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
  };

  it("Debería retornar el estado inicial si no se pasa un type válido", () => {
    expect(rootReducer(undefined, [])).toEqual({
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
    });
  });

  it('Debería guardar en nuestro state las characters obtenidas de nuestro llamado al back cuando action type es "GET_API_CHARS"', () => {
    // console.log(data.default);
    const result = rootReducer(state, {
      type: GET_API_CHARS,
      payload: data.default,
    });
    // Ojooo. Recodar que no debemos mutar nuestro state!
    expect(result).not.toEqual(state);
    expect(result.apiChars.length).toEqual(4);
  });

  it('Debería guardar en nuestro state la character obtenida de nuestro llamado al back cuando action type es "GET_CHARACTER_DETAIL"', () => {
    const result = rootReducer(state, {
      type: GET_CHARACTER_DETAIL,
      payload: data[0],
    });
    // Ojooo. Recodar que no debemos mutar nuestro state!
    expect(result).not.toEqual(state);
    expect(result).toEqual({
        quote : {},
        characters: [],
        allCharacters: [],
        apiChars: [],
        dbChars: [],
        characterDetail: data[0],
        outIDcharacter: {},
        episodes: [],
        episodeDetail:{},
        occupations: []
    });
  });


  it('Debería eliminar una character de nuestro store cuando action type es "CLOSE_CHAR"', () => {
    // console.log(data.default);
    const state = {
      characters: data.default,
      allCharacters: data.default,
      outIDcharacter: {},
    };

    const characters1 = [data.default[1], data.default[2], data.default[3],];
    const characters2 = [data.default[0], data.default[1], data.default[3],];
    const result1 = rootReducer(state, closeCharacter(1)); // console.log(result1);
    const result2 = rootReducer(state, closeCharacter(3)); // console.log(result2);

    // Ojooo. Recodar que no debemos mutar nuestro state!
    expect(result1).not.toEqual(state);
    expect(result2).not.toEqual(state);

    expect({characters1: result1.characters}).toEqual({
       characters1
    });
    expect({characters2: result2.characters}).toEqual({
      characters2
    });
  });
});
