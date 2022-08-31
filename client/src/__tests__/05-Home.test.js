import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import thunk from "redux-thunk";
import isReact from "is-react";

import * as data from "../../db.json";
import Home from "../components/Home";
import * as actions from "../redux/actions";

configure({ adapter: new Adapter() });

describe("<Home />", () => {
  const db = { recipes: data.default }; // console.log(db);
  const mockStore = configureStore([thunk]);
  const { ORDER_BY_NAME } = actions;

  beforeAll(() => expect(isReact.classComponent(Home)).toBeFalsy());

  // Si o si vas a tener que usar functional component! No van a correr ninguno de los tests si no lo haces!
  // También fijate que vas a tener que usar algunos hooks. Tanto de React como de Redux!
  // Los hooks de React si o si los tenes que usar "React.useState", "React.useEffect". El test no los reconoce
  // cuando se hace destructuring de estos métodos === test no corren.
  describe("Estructura", () => {
    let recip;
    let store = mockStore(db);
    beforeEach(() => {
      recip = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/home/recipes"]}>
            <Home />
          </MemoryRouter>
        </Provider>
      );
    });

    it("Debería renderizar 3 'select'", () => {
      expect(recip.find("select")).toHaveLength(6);
    });

    it('Debería renderizar un button con el texto igual a "restore"', () => {
      expect(recip.find("button").at(0).text()).toEqual("restore");
    });

    it('Debería renderizar un  Paginated', () => {
      expect(recip.find("Paginated")).toHaveLength(1);
    });

  });

  describe("Manejo de estados", () => {
    let useState, useStateSpy, recip;
    let store = mockStore(db);
    beforeEach(async() => {
      useState = jest.fn();
      useStateSpy = await jest.spyOn(React, "useState");
      await useStateSpy.mockImplementation((values) => [values, useState]);
      recip = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/home/recipes"]}>
            <Home />
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
        recip.find('select').at(0).simulate("change", {
          target: { page:3, order:'reverse order' },
        });
        expect(useStateSpy).toHaveBeenCalledWith(3);
        expect(useStateSpy).toHaveBeenCalledWith("ordenado: reverse order");
      });
    });


  });

  describe("Dispatch to store", () => {
    let recip, useState, useStateSpy;
    let store = mockStore(db);

    beforeEach(() => {
      useState = jest.fn();
      useStateSpy = jest.spyOn(React, "useState");
      useStateSpy.mockImplementation((values) => [values, useState]);
      store = mockStore(db, actions.recipesAction);
      store.clearActions();
      recip = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/home/recipes"]}>
            <Home />
          </MemoryRouter>
        </Provider>
      );
    });

    afterEach(() => jest.restoreAllMocks());

    it('Debería hacer un dispatch al store utilizando la action "...." con los datos del db cuando se hace un "onChange"', () => {
      // Acá deberías usar el hook de Redux "useDispatch" también!
      const recipFn = jest.spyOn(actions, "orderByName");
      recip
        .find('select').at(0)
        .simulate("change", { preventDefault() {} });
      const expectedAction = [
        {
          payload: 'ascending order',
          type: ORDER_BY_NAME,
        },
      ];
      expect(store.getActions()).toEqual(expectedAction);
      expect(Home.toString().includes("useDispatch")).toBeTruthy();
      expect(recipFn).toHaveBeenCalled();
    });

    it('Debería llamar al evento "preventDefault" para evitar que se refresque la página luego de hacer un submit', () => {
      const event = { preventDefault: () => {} };
      jest.spyOn(event, "preventDefault");
      recip.find('select').at(0).simulate("change", event);
      expect(event.preventDefault).toBeCalled();
    });
  });
});
