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
import Home from "../components/Home";
import RecipeDetail from "../components/RecipeDetail";
import CreateRecipe from "../components/CreateRecipe";
import Landing from "../components/Landing";

configure({ adapter: new Adapter() });

describe("<App />", () => {
  let store;
  const routes = ["/", "/home", "/home/recipes/:id", "/home/recipes", "/home/search", "/home/create", "/otraRuta"];
  const mockStore = configureStore([thunk]);
  const state = {
    recipes: data.recipes,
    recipeDetail: data[0],
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

  describe("El componente NavBar debe ser renderizado en todas las rutas de home", () => {
    it('Debería ser renderizado en la ruta "/home"', () => {
      const app = mount(componentToUse(routes[1]));
      expect(app.find(NavBar)).toHaveLength(1);
    });

    it('Debería ser renderizado en la ruta "/otraRuta"', () => {
      const app = mount(componentToUse(routes[6]));
      expect(app.find(NavBar)).toHaveLength(1);
    });
  });

  it('El componente "Landing" se debería renderizar solamente en la ruta "/"', () => {
    const app = mount(componentToUse(routes[0]));
    expect(app.find(Landing)).toHaveLength(1);
  });

  it('El componente "Home" se debería renderizar solamente en la ruta "/Home/recipes"', () => {
    const app = mount(componentToUse(routes[3]));
    expect(app.find(Home)).toHaveLength(1);
  });

  it('El componente "RecipeDetail" se debería renderizar solamente en la ruta "/home/recipes/:id"', () => {
    const app = mount(componentToUse(routes[2]));
    expect(app.find(RecipeDetail)).toHaveLength(1);
    expect(app.find(NavBar)).toHaveLength(1);
  });

  it('El componente "CreateRecipe" se debería renderizar solamente en la ruta "/create"', () => {
    const app = mount(componentToUse(routes[5]));
    expect(app.find(CreateRecipe)).toHaveLength(1);
    expect(app.find(NavBar)).toHaveLength(1);
  });
});
