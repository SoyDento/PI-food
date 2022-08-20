import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import thunk from "redux-thunk";
import isReact from "is-react";

import * as data from "../../db.json";
import CreateChar from "../components/CreateChar";
import * as actions from "../actions";

configure({ adapter: new Adapter() });

describe("<CreateChar />", () => {
  const state = { characters: data };
  const mockStore = configureStore([thunk]);
  const { CREATE_HOUSE } = actions;

  beforeAll(() => expect(isReact.classComponent(CreateChar)).toBeFalsy());

  // Si o si vas a tener que usar functional component! No van a correr ninguno de los tests si no lo haces!
  // También fijate que vas a tener que usar algunos hooks. Tanto de React como de Redux!
  // Los hooks de React si o si los tenes que usar "React.useState", "React.useEffect". El test no los reconoce
  // cuando se hace destructuring de estos métodos === test no corren.
  describe("Estructura", () => {
    let createCharact;
    let store = mockStore(state);
    beforeEach(() => {
      createCharact = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/characters/create"]}>
            <CreateChar />
          </MemoryRouter>
        </Provider>
      );
    });

    it("Debería renderizar un form", () => {
      expect(createCharact.find("form")).toHaveLength(1);
    });

    it('Debería renderizar un label con el texto "Name: "', () => {
      expect(createCharact.find("label").at(0).text()).toEqual("Name: |");
    });

    it('Debería renderizar un input con la propiedad "name" igual a "name"', () => {
      expect(createCharact.find('input[name="name"]')).toHaveLength(1);
    });

    it('Debería renderizar un label con el texto "Nickname: |"', () => {
      expect(createCharact.find("label").at(1).text()).toEqual("Nickname: |");
    });

    it('Debería renderizar un input con la propiedad "name" igual a "nickname"', () => {
      expect(createCharact.find('input[name="nickname"]')).toHaveLength(1);
    });

    it('Debería renderizar un label con el texto "Birthday: |"', () => {
      expect(createCharact.find("label").at(2).text()).toEqual("Birthday: |");
    });

    it('Debería renderizar un input con la propiedad "name" igual a "birthday"', () => {
      expect(createCharact.find('input[name="birthday"]')).toHaveLength(1);
    });

    it('Debería renderizar un button con "type" igual a "submit" y con texto "Add Character"', () => {
      expect(createCharact.find('button[type="submit"]')).toHaveLength(1);
      expect(createCharact.find("button").at(0).text()).toEqual("Add Character");
    });
  });

  describe("Manejo de estados", () => {
    let useState, useStateSpy, createCharact;
    let store = mockStore(state);
    beforeEach(() => {
      useState = jest.fn();
      useStateSpy = jest.spyOn(React, "useState");
      useStateSpy.mockImplementation((values) => [values, useState]);
      createCharact = mount(
        <Provider store={store}>
          <CreateChar />
        </Provider>
      );
    });

    it("Debería setear correctamente los valores del estado inicial del componente", () => {
      expect(useStateSpy).toHaveBeenCalledWith({
        name:'',
        nickname:'',
        birthday:'',
        img:'',
        status:'',
        occupations: []
      });
    });

    describe("Name input", () => {
      it('Debería cambiar de estado cuando cambie el valor del input "name', () => {
        createCharact.find('input[name="name"]').simulate("change", {
          target: { name: "name", value: "Homer Barthon" },
        });
        expect(useState).toHaveBeenCalledWith({
          name: "Homer Barthon",
          nickname:'',
          birthday:'',
          img:'',
          status:'',
          occupations: []
        });
      });
    });

    describe("Nickname input", () => {
      it('Debería cambiar de estado cuando cambie el valor del input "nickname', () => {
        createCharact.find('input[name="nickname"]').simulate("change", {
          target: { name: "nickname", value: "Storn" },
        });
        expect(useState).toHaveBeenCalledWith({
          name: "",
          nickname:"Storn",
          birthday:'',
          img:'',
          status:'',
          occupations: []
        });
      });
    });

    describe("Birthday input", () => {
      it('Debería cambiar de estado cuando cambie el valor del input "birthday', () => {
        createCharact.find('input[name="birthday"]').simulate("change", {
          target: { name: "birthday", value: "21-09-2001" },
        });
        expect(useState).toHaveBeenCalledWith({
          name: "",
          nickname:"",
          birthday:'21-09-2001',
          img:'',
          status:'',
          occupations: []
        });
      });
    });
  });

  describe("Dispatch to store", () => {
    let createCharact, useState, useStateSpy;
    let store = mockStore(state);

    beforeEach(() => {
      useState = jest.fn();
      useStateSpy = jest.spyOn(React, "useState");
      useStateSpy.mockImplementation((values) => [values, useState]);
      store = mockStore(state, actions.createCharactAction);
      store.clearActions();
      createCharact = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/create"]}>
            <CreateChar />
          </MemoryRouter>
        </Provider>
      );
    });

    afterEach(() => jest.restoreAllMocks());

    it('Debería hacer un dispatch al store utilizando la action "createCharact" con los datos del state cuando se hace un "submit"', () => {
      // Acá deberías usar el hook de Redux "useDispatch" también!
      const createCharactFn = jest.spyOn(actions, "createCharact");
      createCharact
        .find('[type="submit"]')
        .simulate("submit", { preventDefault() {} });
      const expectedAction = [
        {
          payload: {
            name: "",
            nickname:"",
            birthday:'',
            img:'',
            status:'',
            occupations: [],
            id: 4,
          },
          type: CREATE_HOUSE,
        },
      ];
      expect(store.getActions()).toEqual(expectedAction);
      expect(CreateChar.toString().includes("useDispatch")).toBeTruthy();
      expect(createCharactFn).toHaveBeenCalled();
    });

    it('Debería llamar al evento "preventDefault" para evitar que se refresque la página luego de hacer un submit', () => {
      const event = { preventDefault: () => {} };
      jest.spyOn(event, "preventDefault");
      createCharact.find("form").simulate("submit", event);
      expect(event.preventDefault).toBeCalled();
    });
  });
});
