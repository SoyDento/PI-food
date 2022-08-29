import React from "react";
import { Link } from "react-router-dom";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import isReact from "is-react";
import * as data from "../../db.json";
import Card from "../components/Card";

configure({ adapter: new Adapter() });
  
describe("<Card />", () => {
  let recipeCard;
  let [reci1, reci2, reci3] = data.default;

  // Si o si vas a tener que usar functional component! No van a correr ninguno de los tests si no lo haces!
  beforeEach(() => {
    recipeCard = (r) =>
      shallow(
        <Card
          key= {r.id}
          id= {r.id}
          title= {r.title}
          db= {r.db}
          image= {r.image}
          dishTypes= {r.dishTypes}
          diets= {r.diets}
          created_DB = {r.created_DB? true : false }
          closeRecipe= {(e)=> ejectClose(e)}
        />
      );
    expect(isReact.classComponent(Card)).toBeFalsy();
  });

  it('Debería renderizar un tag "img" y utilizar como source la imagen del personaje', () => {
    expect(recipeCard(reci1).find("img").at(0).prop("src")).toEqual(
      reci1.img
    );
    expect(recipeCard(reci2).find("img").at(0).prop("src")).toEqual(
      reci2.img
    );
    expect(recipeCard(reci3).find("img").at(0).prop("src")).toEqual(
      reci3.img
    );
  });

  it('Debería renderizar un "button" que contenga el texto "Name: " más el nombre completo del personaje', () => {
    expect(recipeCard(reci1).find("button").at(0).text()).toBe(
      `close`
    );
    expect(recipeCard(reci2).find("button").at(0).text()).toBe(
      `close`
    );
    expect(recipeCard(reci3).find("button").at(0).text()).toBe(
      `close`
    );
  });

  it('Debería renderizar un <Link to="" />. ', () => {
    // Podes importar el componente Link de react-router-dom.
    expect(recipeCard(reci1).find(Link).length).toBeGreaterThanOrEqual(1);
    expect(recipeCard(reci2).find(Link).length).toBeGreaterThanOrEqual(1);
    expect(recipeCard(reci3).find(Link).length).toBeGreaterThanOrEqual(1);
  });

});
