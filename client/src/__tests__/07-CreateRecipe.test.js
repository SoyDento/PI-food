import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import thunk from "redux-thunk";
import isReact from "is-react";
import * as data from "../../db.json";
import CreateRecipe from "../components/CreateRecipe";
import * as actions from "../actions";

configure({ adapter: new Adapter() });

describe("<CreateRecipe />", () => {
  const state = { recipes: data };
  const mockStore = configureStore([thunk]);
  const { CREATE_HOUSE } = actions;

  beforeAll(() => expect(isReact.classComponent(CreateRecipe)).toBeFalsy());

  // Si o si vas a tener que usar functional component! No van a correr ninguno de los tests si no lo haces!
  // También fijate que vas a tener que usar algunos hooks. Tanto de React como de Redux!
  // Los hooks de React si o si los tenes que usar "React.useState", "React.useEffect". El test no los reconoce
  // cuando se hace destructuring de estos métodos === test no corren.
  describe("Estructura", () => {
    let postRecipe;
    let store = mockStore(state);
    beforeEach(() => {
      postRecipe = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/recipe/create"]}>
            <CreateRecipe />
          </MemoryRouter>
        </Provider>
      );
    });

    it("Debería renderizar un form", () => {
      expect(postRecipe.find("form")).toHaveLength(1);
    });

    it('Debería renderizar un div con el texto "Name: |"', () => {
      expect(postRecipe.find("div").at(0).text()).toEqual("Name: |");
    });

    it('Debería renderizar un input con la propiedad "name" igual a "title"', () => {
      expect(postRecipe.find('input[name="title"]')).toHaveLength(1);
    });

    it('Debería renderizar un div con el texto "Is it very very healthy?: |"', () => {
      expect(postRecipe.find("div").at(1).text()).toEqual("Is it very very healthy?: |");
    });

    it('Debería renderizar un select con la propiedad "value" igual a "default"', () => {
      expect(postRecipe.find('select[value="default"]')).toHaveLength(1);
    });

    it('Debería renderizar un div con el texto "Health Score: |"', () => {
      expect(postRecipe.find("div").at(2).text()).toEqual("Health Score: |");
    });

    it('Debería renderizar un input con la propiedad "type" igual a "number"', () => {
      expect(postRecipe.find('input[type="number"]')).toHaveLength(1);
    });

    it('Debería renderizar un button con "type" igual a "submit" y con texto "Add Recipe"', () => {
      expect(postRecipe.find('button[type="submit"]')).toHaveLength(1);
      expect(postRecipe.find("button").at(0).text()).toEqual("Add Recipe");
    });
  });

  describe("Manejo de estados", () => {
    let useState, useStateSpy, postRecipe;
    let store = mockStore(state);
    beforeEach(() => {
      useState = jest.fn();
      useStateSpy = jest.spyOn(React, "useState");
      useStateSpy.mockImplementation((values) => [values, useState]);
      postRecipe = mount(
        <Provider store={store}>
          <CreateRecipe />
        </Provider>
      );
    });

    it("Debería setear correctamente los valores del estado inicial del componente", () => {
      expect(useStateSpy).toHaveBeenCalledWith({
        id: 0,
        title: "",
        image: "",
        veryHealthy: false,
        cheap: false,
        healthScore: 0,
        creditsText: "",
        aggregateLikes: 1,
        readyInMinutes: 999,
        servings: 0,
        sourceUrl: "",
        analyzedInstructions: [],
        diets: [],
        dishTypes: [],
        cuisines: []
      });
    });

    describe("Name input", () => {
      it('Debería cambiar de estado cuando cambie el valor del input "name', () => {
        postRecipe.find('input[name="title"]').simulate("change", {
          target: { name: "title", value: "Milanga con Fritas" },
        });
        expect(useState).toHaveBeenCalledWith({
          id: 0,
          title: "Milanga con Fritas",
          image: "",
          veryHealthy: false,
          cheap: false,
          healthScore: 0,
          creditsText: "",
          aggregateLikes: 1,
          readyInMinutes: 999,
          servings: 0,
          sourceUrl: "",
          analyzedInstructions: [],
          diets: [],
          dishTypes: [],
          cuisines: []
        });
      });
    });

    describe("veryHealthy input", () => {
      it('Debería cambiar de estado cuando cambie el valor del input "veryHealthy', () => {
        postRecipe.find('input[name="veryHealthy"]').simulate("change", {
          target: { name: "veryHealthy", value: true },
        });
        expect(useState).toHaveBeenCalledWith({
          id: 0,
          title: "",
          image: "",
          veryHealthy: true,
          cheap: false,
          healthScore: 0,
          creditsText: "",
          aggregateLikes: 1,
          readyInMinutes: 999,
          servings: 0,
          sourceUrl: "",
          analyzedInstructions: [],
          diets: [],
          dishTypes: [],
          cuisines: []
        });
      });
    });

    describe("image input", () => {
      it('Debería cambiar de estado cuando cambie el valor del input "image', () => {
        postRecipe.find('input[name="image"]').simulate("change", {
          target: { name: "image", value: "https://spoonacular.com/recipeImages/715594-312x231.jpg" },
        });
        expect(useState).toHaveBeenCalledWith({
          id: 0,
          title: "",
          image: "https://spoonacular.com/recipeImages/715594-312x231.jpg",
          veryHealthy: true,
          cheap: false,
          healthScore: 0,
          creditsText: "",
          aggregateLikes: 1,
          readyInMinutes: 999,
          servings: 0,
          sourceUrl: "",
          analyzedInstructions: [],
          diets: [],
          dishTypes: [],
          cuisines: []
        });
      });
    });
  });

  describe("Dispatch to store", () => {
    let postRecipe, useState, useStateSpy;
    let store = mockStore(state);

    beforeEach(() => {
      useState = jest.fn();
      useStateSpy = jest.spyOn(React, "useState");
      useStateSpy.mockImplementation((values) => [values, useState]);
      store = mockStore(state, actions.createRecipeAction);
      store.clearActions();
      postRecipe = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/home/create"]}>
            <CreateRecipe />
          </MemoryRouter>
        </Provider>
      );
    });

    afterEach(() => jest.restoreAllMocks());

    it('Debería hacer un dispatch al store utilizando la action "postRecipe" con los datos del state cuando se hace un "submit"', () => {
      // Acá deberías usar el hook de Redux "useDispatch" también!
      const createRecipFn = jest.spyOn(actions, "postRecipe");
      postRecipe
        .find('[type="submit"]')
        .simulate("submit", { preventDefault() {} });
      const expectedAction = [
        {
          payload: {
            id: 0,
            title: "",
            image: "https://spoonacular.com/recipeImages/715594-312x231.jpg",
            veryHealthy: true,
            cheap: false,
            healthScore: 0,
            creditsText: "",
            aggregateLikes: 1,
            readyInMinutes: 999,
            servings: 0,
            sourceUrl: "",
            analyzedInstructions: [],
            diets: [],
            dishTypes: [],
            cuisines: []
          },
          type: POST_RECIPE,
        },
      ];
      expect(store.getActions()).toEqual(expectedAction);
      expect(CreateRecipe.toString().includes("useDispatch")).toBeTruthy();
      expect(createRecipFn).toHaveBeenCalled();
    });

    it('Debería llamar al evento "preventDefault" para evitar que se refresque la página luego de hacer un submit', () => {
      const event = { preventDefault: () => {} };
      jest.spyOn(event, "preventDefault");
      postRecipe.find("form").simulate("submit", event);
      expect(event.preventDefault).toBeCalled();
    });
  });
});
