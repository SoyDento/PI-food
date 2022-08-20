import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import * as data from "../../db.json";
import App from "../App";
import NavBar from "../components/NavBar";
import Characters from "../components/Characters";
import CharacterDetail from "../components/CharacterDetail";
import CreateChar from "../components/CreateChar";
import Home from "../components/Home";

configure({ adapter: new Adapter() });

describe("<App />", () => {
  let store;
  const routes = ["/", "/characters/:id", "/characters", "/create", "/create", "/episodes/:id", "/otraRuta"];
  const mockStore = configureStore([thunk]);
  const state = {
    characters: data.characters,
    CharacterDetail: data[0],
  };

  beforeEach(() => {
    store = mockStore(state);
  });

  const componentToUse = (route) => {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
  };

  describe("El componente NavBar debe ser renderizado en todas las rutas", () => {
    it('Debería ser renderizado en la ruta "/"', () => {
      const app = mount(componentToUse(routes[0]));
      expect(app.find(NavBar)).toHaveLength(1);
    });

    it('Debería ser renderizado en la ruta "/otraRuta"', () => {
      const app = mount(componentToUse(routes[6]));
      expect(app.find(NavBar)).toHaveLength(1);
    });
  });

  it('El componente "Home" se debería renderizar solamente en la ruta "/"', () => {
    const app = mount(componentToUse(routes[0]));
    expect(app.find(Home)).toHaveLength(1);
    expect(app.find(NavBar)).toHaveLength(1);
  });

  it('El componente "CharacterDetail" se debería renderizar solamente en la ruta "/characters/:id"', () => {
    const app = mount(componentToUse(routes[1]));
    expect(app.find(CharacterDetail)).toHaveLength(1);
    expect(app.find(NavBar)).toHaveLength(1);
  });

  it('El componente "CreateChar" se debería renderizar solamente en la ruta "/create"', () => {
    const app = mount(componentToUse(routes[3]));
    expect(app.find(CreateChar)).toHaveLength(1);
    expect(app.find(NavBar)).toHaveLength(1);
  });
});
