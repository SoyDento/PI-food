import React from "react";
import { Link } from "react-router-dom";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import isReact from "is-react";

import * as data from "../../db.json";
import Card from "../components/Card";

configure({ adapter: new Adapter() });

describe("<Card />", () => {
  let characterCard;
  let [char1, char2, char3] = data.default;

  // Si o si vas a tener que usar functional component! No van a correr ninguno de los tests si no lo haces!
  beforeEach(() => {
    characterCard = (character) =>
      shallow(
        <Card
          key={character.char_id}
          id={character.char_id}
          name= {character.name}
          img= {character.img}
        />
      );
    expect(isReact.classComponent(Card)).toBeFalsy();
  });

  it('Debería renderizar un tag "img" y utilizar como source la imagen del personaje', () => {
    expect(characterCard(char1).find("img").at(0).prop("src")).toEqual(
      char1.img
    );
    expect(characterCard(char2).find("img").at(0).prop("src")).toEqual(
      char2.img
    );
    expect(characterCard(char3).find("img").at(0).prop("src")).toEqual(
      char3.img
    );
  });

  it('Debería renderizar un "h3" que contenga el texto "Name: " más el nombre completo del personaje', () => {
    expect(characterCard(char1).find("h3").at(0).text()).toBe(
      `${char1.name}`
    );
    expect(characterCard(char2).find("h3").at(0).text()).toBe(
      `${char2.name}`
    );
    expect(characterCard(char3).find("h3").at(0).text()).toBe(
      `${char3.name}`
    );
  });

  it('Debería renderizar un <Link to="" />. ', () => {
    // Podes importar el componente Link de react-router-dom.
    expect(characterCard(char1).find(Link).length).toBeGreaterThanOrEqual(1);
    expect(characterCard(char2).find(Link).length).toBeGreaterThanOrEqual(1);
    expect(characterCard(char3).find(Link).length).toBeGreaterThanOrEqual(1);
  });

});
