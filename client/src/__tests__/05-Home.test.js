import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import thunk from "redux-thunk";
import isReact from "is-react";

import * as data from "../../db.json";
import Characters from "../components/Characters";
import * as actions from "../actions";

configure({ adapter: new Adapter() });

describe("<Characters />", () => {
  const db = { characters: data.default }; // console.log(db);
  const mockStore = configureStore([thunk]);
  const { ORDER_BY_NAME } = actions;

  beforeAll(() => expect(isReact.classComponent(Characters)).toBeFalsy());

  // Si o si vas a tener que usar functional component! No van a correr ninguno de los tests si no lo haces!
  // También fijate que vas a tener que usar algunos hooks. Tanto de React como de Redux!
  // Los hooks de React si o si los tenes que usar "React.useState", "React.useEffect". El test no los reconoce
  // cuando se hace destructuring de estos métodos === test no corren.
  describe("Estructura", () => {
    let chars;
    let store = mockStore(db);
    beforeEach(() => {
      chars = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/characters"]}>
            <Characters />
          </MemoryRouter>
        </Provider>
      );
    });

    it("Debería renderizar 3 'select'", () => {
      expect(chars.find("select")).toHaveLength(3);
    });

    it('Debería renderizar un h1 con el texto "List of Characters"', () => {
      expect(chars.find("h1").at(0).text()).toEqual("List of Characters");
    });

    it('Debería renderizar un button con el texto igual a "Restart"', () => {
      expect(chars.find("button").at(0).text()).toEqual("Restart");
    });

    it('Debería renderizar un  Paginated', () => {
      expect(chars.find("Paginated")).toHaveLength(1);
    });

  });

  describe("Manejo de estados", () => {
    let useState, useStateSpy, chars;
    let store = mockStore(db);
    beforeEach(async() => {
      useState = jest.fn();
      useStateSpy = await jest.spyOn(React, "useState");
      await useStateSpy.mockImplementation((values) => [values, useState]);
      chars = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/characters"]}>
            <Characters />
          </MemoryRouter>
        </Provider>
      );
    });

    it("Debería setear correctamente los valores del estado inicial del componente", () => {
      expect(useStateSpy).toHaveBeenCalledWith(1);
      expect(useStateSpy).toHaveBeenCalledWith("");
    });

    describe("Select", () => {
      it('Debería cambiar de estado cuando cambie el valor', () => {
        chars.find('select').at(0).simulate("change", {
          target: { page:3, order:'reverse order' },
        });
        expect(useStateSpy).toHaveBeenCalledWith(3);
        expect(useStateSpy).toHaveBeenCalledWith("ordenado: reverse order");
      });
    });


  });

  describe("Dispatch to store", () => {
    let chars, useState, useStateSpy;
    let store = mockStore(db);

    beforeEach(() => {
      useState = jest.fn();
      useStateSpy = jest.spyOn(React, "useState");
      useStateSpy.mockImplementation((values) => [values, useState]);
      store = mockStore(db, actions.charactersAction);
      store.clearActions();
      chars = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/characters"]}>
            <Characters />
          </MemoryRouter>
        </Provider>
      );
    });

    afterEach(() => jest.restoreAllMocks());

    it('Debería hacer un dispatch al store utilizando la action "chars" con los datos del db cuando se hace un "onChange"', () => {
      // Acá deberías usar el hook de Redux "useDispatch" también!
      const charsFn = jest.spyOn(actions, "orderByName");
      chars
        .find('select').at(0)
        .simulate("change", { preventDefault() {} });
      const expectedAction = [
        {
          payload: 'ascending order',
          type: ORDER_BY_NAME,
        },
      ];
      expect(store.getActions()).toEqual(expectedAction);
      expect(Characters.toString().includes("useDispatch")).toBeTruthy();
      expect(charsFn).toHaveBeenCalled();
    });

    it('Debería llamar al evento "preventDefault" para evitar que se refresque la página luego de hacer un submit', () => {
      const event = { preventDefault: () => {} };
      jest.spyOn(event, "preventDefault");
      chars.find('select').at(0).simulate("change", event);
      expect(event.preventDefault).toBeCalled();
    });
  });
});
