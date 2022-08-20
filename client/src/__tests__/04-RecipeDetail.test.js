import React from "react";
import { MemoryRouter, Link } from "react-router-dom";
import { Provider } from "react-redux";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import isReact from "is-react";

import CharacterDetailConnected, {
  CharacterDetail,
  mapDispatchToProps,
} from "../components/CharacterDetail";
import * as actions from "../actions";
import * as data from "../../db.json";

configure({ adapter: new Adapter() });

describe("<CharacterDetail />", () => {
  const { CLOSE_CHAR } = actions;
  let Card, state, store, characters;
  const mockStore = configureStore([thunk]);
  characters = data;
  state = {
    characters: [],
    characterDetail: {},
  };
  store = mockStore(state);
  // Si o si vas a tener que usar class component! No van a correr ninguno de los tests si no lo haces. <3
  beforeEach(() => {
    Card = (characterDetail) =>
      mount(
        <Provider store={store}>
          <MemoryRouter>
            <CharacterDetailConnected
              id={characterDetail.id}
              img={characterDetail.img}
              name={characterDetail.name}
              nickname={characterDetail.nickname}
              birthday={characterDetail.birthday}
              status={characterDetail.status}
              occupation={characterDetail.occupation}
            />
          </MemoryRouter>
        </Provider>
      );
    expect(isReact.classComponent(CharacterDetail)).toBeTruthy();
  });

  afterEach(() => jest.restoreAllMocks());

  describe("Estructura", () => {
    it('Debería renderizar un "button"', () => {
      expect(Card(characters[0]).find("button")).toHaveLength(2);
    });

    it('Debería renderizar un tag "h3" que muestre lo que contiene el "name" de cada "Character"', () => {
      expect(Card(characters[0]).find("h3").at(0).text()).toBe("Walter White");
      expect(Card(characters[1]).find("h3").at(0).text()).toBe(
        "Jesse Pinkman"
      );
      expect(Card(characters[2]).find("h3").at(0).text()).toBe(
        "Skyler White"
      );
    });

    it('Debería renderizar un "p" que contenga el texto "nickname: " ', () => {
      expect(Card(characters[0]).find("p").at(0).text()).toBe(
        "nickname: Heisenberg"
      );
      expect(Card(characters[1]).find("p").at(0).text()).toBe(
        "nickname: Cap n' Cook"
      );
      expect(Card(characters[2]).find("p").at(0).text()).toBe(
        "nickname: Sky"
      );
    });

    it('Debería renderizar un "p" que contenga el texto "status: " más la prop "status" de cada "Character"', () => {
      expect(Card(characters[0]).find("p").at(1).text()).toBe(
        "status: Presumed dead"
      );
      expect(Card(characters[1]).find("p").at(1).text()).toBe(
        "status: Alive"
      );
      expect(Card(characters[2]).find("p").at(1).text()).toBe(
        "status: Alive"
      );
    });

    it('Debería renderizar un componente <Link> que encierre el "name" de cada "Character" y debería redirigir a "/characters/:characterDetailId"', () => {
      // El valor de "characterDetailId" lo tenes que sacar del objeto characterDetail, tiene una propiedad "id".
      expect(Card(characters[0]).find(Link)).toHaveLength(1);
      expect(Card(characters[0]).find(Link).at(0).prop("to")).toEqual(
        "/characters"
      );
    });
  });

  describe("connect redux", () => {
    if (typeof mapDispatchToProps === "function") {
      // ESTE TEST ES POR SI HACES EL MAPDISPATCHTOPROPS COMO UNA FUNCIÓN.
      it("Debería traer por props la funcion changeAtrib de Redux usando mapDispatchToProps", () => {
        // Usamos "mapDispatchToProps", pasamos a props la funcion changeAtrib.
        // Se debe llamar exactamente igual!
        const changeAtribSpy = jest.spyOn(actions, "changeAtrib");
        expect(mapDispatchToProps.hasOwnProperty("changeAtrib")).toBeTruthy();
        mapDispatchToProps.changeAtrib = changeAtribSpy;
        mapDispatchToProps.changeAtrib(1);
        expect(changeAtribSpy).toHaveBeenCalled();
      });
    } else {
      // ESTE TEST ES POR SI HACES EL MAPDISPATCHTOPROPS COMO UN OBJETO.
      it("Debería traer por props la action creator changeAtrib de Redux usando mapDispatchToProps", () => {
        // Acá testeamos que hagas todo el proceso. Utilizas connect y el objeto "mapDispatchToProps",
        // traes la acción 'changeAtrib' y la despachas.
        const changeAtribSpy = jest.spyOn(actions, "changeAtrib");
        changeAtribSpy(1);
        expect(mapDispatchToProps.hasOwnProperty("changeAtrib")).toBeTruthy();
        expect(changeAtribSpy).toHaveBeenCalled();
      });
    }
  });

  describe("Dispatch to store", () => {
    it('Debería hacer un dispatch al store utilizando la action "changeAtrib" al hacer click en el boton previamente creado. Debe pasarle el dato de la characterDetail', () => {
      expect(mapDispatchToProps.hasOwnProperty("changeAtrib")).toBeTruthy();
      mapDispatchToProps.changeAtrib = actions.changeAtrib;
      Card(characters[0]).find("submit").simulate("click");
      expect(store.getActions()).toEqual([{ type: CHANGE_AT, payload: 1 }]);
    });
  });
});
