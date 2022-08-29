import React from "react";
import { MemoryRouter, Link } from "react-router-dom";
import { Provider } from "react-redux";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import isReact from "is-react";
   
import RecipeDetailConnected, {
  RecipeDetail,
  mapDispatchToProps,
} from "../components/RecipeDetail";
import * as actions from "../actions";
import * as data from "../../db.json";

configure({ adapter: new Adapter() });

describe("<RecipeDetail />", () => {
  const { CLOSE_RECIPE } = actions;
  let Card, state, store, recipes;
  const mockStore = configureStore([thunk]);
  recipes = data;
  state = {
    recipes: [],
    recipeDetail: {},
  };
  store = mockStore(state);
  // Si o si vas a tener que usar class component! No van a correr ninguno de los tests si no lo haces. <3
  beforeEach(() => {
    Card = (recipeDetail) =>
      mount(
        <Provider store={store}>
          <MemoryRouter>
            <RecipeDetailConnected
              id={recipeDetail.id}
              db={recipeDetail.db}
              title={recipeDetail.title}
              image={recipeDetail.image}
              veryHealthy={recipeDetail.veryHealthy}
              cheap={recipeDetail.cheap}
              healthScore={recipeDetail.healthScore}
              creditsText={recipeDetail.creditsText}
              aggregateLikes={recipeDetail.aggregateLikes}
              readyInMinutes={recipeDetail.readyInMinutes}
              servings={recipeDetail.servings}
              sourceUrl={recipeDetail.sourceUrl}
              analyzedInstructions={recipeDetail.analyzedInstructions}
              diets={recipeDetail.diets}
              dishTypes={recipeDetail.dishTypes}
              cuisines={recipeDetail.cuisines}
              created_DB={recipeDetail.created_DB}
            />
          </MemoryRouter>
        </Provider>
      );
    expect(isReact.classComponent(RecipeDetail)).toBeTruthy();
  });

  afterEach(() => jest.restoreAllMocks());

  describe("Estructura", () => {
    it('Debería renderizar un "button"', () => {
      expect(Card(recipes[0]).find("button")).toHaveLength(4);
    });

    it('Debería renderizar un tag "h3" que muestre lo que contiene el "name" de cada "Character"', () => {
      expect(Card(recipes[0]).find("h3").at(0).text()).toBe("Walter White");
      expect(Card(recipes[1]).find("h3").at(0).text()).toBe(
        "Jesse Pinkman"
      );
      expect(Card(recipes[2]).find("h3").at(0).text()).toBe(
        "Skyler White"
      );
    });

    it('Debería renderizar un "p" que contenga el texto "nickname: " ', () => {
      expect(Card(recipes[0]).find("p").at(0).text()).toBe(
        "nickname: Heisenberg"
      );
      expect(Card(recipes[1]).find("p").at(0).text()).toBe(
        "nickname: Cap n' Cook"
      );
      expect(Card(recipes[2]).find("p").at(0).text()).toBe(
        "nickname: Sky"
      );
    });

    it('Debería renderizar un "p" que contenga el texto "status: " más la prop "status" de cada "Character"', () => {
      expect(Card(recipes[0]).find("p").at(1).text()).toBe(
        "status: Presumed dead"
      );
      expect(Card(recipes[1]).find("p").at(1).text()).toBe(
        "status: Alive"
      );
      expect(Card(recipes[2]).find("p").at(1).text()).toBe(
        "status: Alive"
      );
    });

    it('Debería renderizar un componente <Link> que encierre el "name" de cada "Character" y debería redirigir a "/recipes/:recipeDetailId"', () => {
      // El valor de "recipeDetailId" lo tenes que sacar del objeto recipeDetail, tiene una propiedad "id".
      expect(Card(recipes[0]).find(Link)).toHaveLength(1);
      expect(Card(recipes[0]).find(Link).at(0).prop("to")).toEqual(
        "/recipes"
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
    it('Debería hacer un dispatch al store utilizando la action "changeAtrib" al hacer click en el boton previamente creado. Debe pasarle el dato de la recipeDetail', () => {
      expect(mapDispatchToProps.hasOwnProperty("changeAtrib")).toBeTruthy();
      mapDispatchToProps.changeAtrib = actions.changeAtrib;
      Card(recipes[0]).find("submit").simulate("click");
      expect(store.getActions()).toEqual([{ type: CHANGE_AT, payload: 1 }]);
    });
  });
});
