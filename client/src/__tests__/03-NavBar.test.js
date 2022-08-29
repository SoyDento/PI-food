import React from "react";
import { Link } from "react-router-dom";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import isReact from "is-react";

import NavBar from "../components/NavBar";

configure({ adapter: new Adapter() });

describe("<NavBar />", () => {
  let nav;
  // Si o si vas a tener que usar class component! No van a correr ninguno de los tests si no lo haces. <3
  beforeEach(() => {
    nav = shallow(<NavBar />);
    expect(isReact.classComponent(NavBar)).toBeTruthy();
  });

  it('Debería renderizar tres <Link to="" />. ', () => {
    // Podes importar el componente Link de react-router-dom.
    expect(nav.find(Link).length).toBeGreaterThanOrEqual(3);
  });

  it('Debería tener un Link con el texto "Home" que cambie la ruta hacia "/home/recipes"', () => {
    // El orden en el que se declaran los Links es importante!
    expect(nav.find(Link).at(0).prop("to")).toEqual("/home/recipes");
    expect(nav.find(Link).at(0).text()).toEqual("Home");
  });

  it('Debería tener un segundo Link, con texto "Search Recipe" y que cambie la ruta hacia "/home/search"', () => {
    expect(nav.find(Link).at(1).prop("to")).toEqual("/home/search");
    expect(nav.find(Link).at(1).text()).toEqual("Search Recipe");
  });

  it('Debería tener un segundo Link, con texto "Create New Recipe" y que cambie la ruta hacia "/home/create"', () => {
    expect(nav.find(Link).at(3).prop("to")).toEqual("/home/create");
    expect(nav.find(Link).at(3).text()).toEqual("Create New Recipe");
  });
});
