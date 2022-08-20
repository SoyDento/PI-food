import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import {
  getApiChars,
  postCharacters,
  getCharacterDetail,
  closeCharacter,
} from "../actions";
import * as data from "../../db.json";

describe("Actions", () => {
  const mockStore = configureStore([thunk]);
  const store = mockStore({
      quote : {},
      characters: [],
      allCharacters: [],
      apiChars: [],
      dbChars: [],
      characterDetail: {},
      outIDcharacter:: {},
      episodes: [],
      episodeDetail:{},
      occupations: []
  });

  beforeEach(() => store.clearActions());

  describe("getApiChars", () => {
    it('Debería hacer un dispatch con las propiedades type "GET_API_CHARS" y como payload, el resultado del fetch al link provisto', async () => {
      return store
        .dispatch(getApiChars())
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].payload.length).toBe(62); // cambiar por cantidad de characters de la API
        })
        .catch((err) => {
          // Acá llegamos cuando tu petición al backend no salió como el test lo pide. Revisá el error en la consola y verificá
          // qué es lo que está pasando.
          console.error(err);
          expect(err).toBeUndefined();
        });
    });
  });

  describe("getCharacterDetail", () => {
    it('Debería hacer un dispatch con las propiedades type "GET_CHARACTER_DETAIL" y como payload, el resultado del fetch al link provisto', async () => {
      const payload = data[0];
      return store
        .dispatch(getCharacterDetail(1))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0]).toStrictEqual({
            type: "GET_CHARACTER_DETAIL",
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

  describe("postCharacters", () => {
    it('Debería retornar una action con las propiedades type "POST_CHARACTER" y payload: contiene los values recibidos como argumento y un ID incremental en la action creator "postCharacters"', () => {
      // Utilizar la variable id creada en el archivo index.js. La inicializamos en 3 para que los íd's no choquen con los existentes.
      const payload1 = {
        name: "Pamela",
        nickname: "Pam%31",
        birthday: "20-1-2011",
        img: "https://cms.modumb.com/storage/magazine/_800x422/guia-practica-para-identificar-el-rostro-de-un-cliente-8282.jpg",
        status: "Alive",
        occupations: ["High School Chemistry Teacher"]
      };
      const payload2 = {
        name: "Paola",
        nickname: "Pa%41",
        birthday: "23-4-2021",
        img: "https://cms.modumb.com/storage/magazine/_800x422/guia-practica-para-identificar-el-rostro-de-un-cliente-8282.jpg",
        status: "Alive",
        occupations: ["High School Chemistry Teacher"]
      };
      expect(postCharacters(payload1)).objectContaining({
        char_id: expect.any(String),
        name: "Pamela",
        nickname: "Pam%31",
        birthday: "20-1-2011",
        img: "https://cms.modumb.com/storage/magazine/_800x422/guia-practica-para-identificar-el-rostro-de-un-cliente-8282.jpg",
        status: "Alive",
        occupations: ["High School Chemistry Teacher"]
      });
      expect(postCharacters(payload2)).objectContaining({
        char_id: expect.any(String),
        name: "Paola",
        nickname: "Pa%41",
        birthday: "23-4-2021",
        img: "https://cms.modumb.com/storage/magazine/_800x422/guia-practica-para-identificar-el-rostro-de-un-cliente-8282.jpg",
        status: "Alive",
        occupations: ["High School Chemistry Teacher"]
      });

    });
  });

  describe("closeCharacter", () => {
    it('Debería retornar una action con las propiedades type "CLOSE_CHAR" y como payload el id de la casa a eliminar. Recibe el id por argumento', () => {
      expect(closeCharacter(1)).toEqual({ type: "CLOSE_CHAR", payload: 1 });
      expect(closeCharacter(2)).toEqual({ type: "CLOSE_CHAR", payload: 2 });
    });
  });
});
