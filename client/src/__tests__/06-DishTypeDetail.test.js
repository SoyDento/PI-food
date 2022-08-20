import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { MemoryRouter } from "react-router-dom";
import * as ReactRedux from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import isReact from "is-react";

import EpisodeDetail from "../components/EpisodeDetail";
import Card from "../components/Card";
import * as data from "../../db2.json";
import * as actions from "../actions";

configure({ adapter: new Adapter() });

describe("<EpisodeDetail />", () => {
  let episodeDetail, useSelectorStub, useSelectorFn, useEffect;
  const noEpisode = {
    episode: "5",
    season: "2",
    series: "monono",
    title: "The dessert",
    air_date: "",
    characters: ["pepe","pablo"]
  };

  const match = (id) => ({
    params: { episode_id: id },
    isExact: true,
    path: "/episodes/:episode_id",
    url: `/episodes/${id}`,
  });
  const mockStore = configureStore([thunk]);

  const store = (id) => {
    let state = {
      episodes: data.concat(noEpisode),
      episode:
        id !== 5 ? data[id - 1] : data.concat(noEpisode),
    };
    return mockStore(state);
  };
  // Si o si vas a tener que usar functional component! No van a correr ninguno de los tests si no lo haces!
  // También fijate que vas a tener que usar algunos hooks. Tanto de React como de Redux!
  // Los hooks de React si o si los tenes que usar "React.useState", "React.useEffect". El test no los reconoce
  // cuando se hace destructuring de estos métodos === test no corren.
  beforeAll(() => expect(isReact.classComponent(EpisodeDetail)).toBeFalsy());
  const mockUseEffect = () => useEffect.mockImplementation((fn) => fn());

  beforeEach(() => {
    useSelectorStub = jest.spyOn(ReactRedux, "useSelector");
    useSelectorFn = (id) =>
      useSelectorStub.mockReturnValue(store(id).getState().episode);
    useEffect = jest.spyOn(React, "useEffect");
    episodeDetail = (id) =>
      mount(
        <ReactRedux.Provider store={store(id)}>
          <MemoryRouter initialEntries={[`/episodes/${id}`]}>
            <EpisodeDetail match={match(id)} />
          </MemoryRouter>
        </ReactRedux.Provider>
      );
    mockUseEffect();
    mockUseEffect();
  });

  afterEach(() => jest.restoreAllMocks());

  it("Debería usar un useEffect y dentro de este, dispachar la acción getEpisodeDetail, pasandole como argumento el ID de la episode a renderizar", () => {
    // Nuevamente testeamos todo el proceso. Tenes que usar un useEffect, y despachar la acción "getEpisodeDetail".
    const useDispatch = jest.spyOn(ReactRedux, "useDispatch");
    const getEpisodeDetail = jest.spyOn(actions, "getEpisodeDetail");
    episodeDetail(1);
    expect(useEffect).toHaveBeenCalled();
    expect(useDispatch).toHaveBeenCalled();
    expect(getEpisodeDetail).toHaveBeenCalled();
  });

  it('Debería recibir por props el objeto "match". Utilizar el "EpisodeId" de "params" para despachar la action "getEpisodeDetail" y renderizar los detalles de la episode', () => {
    const episode = data[0];
    // Fijate que para traerte los datos desde Redux, vas a tener que usar el hook de Redux "useSelector"
    // para que los tests pasen!
    // Lo que se esta testeando aca, es que el componente renderice los detalles del todo correctamente,
    // no la estructura del componente asi que eres libre de diseñar la estructura, siempre y cuando se muestren los datos del todo.
    // Verificar la llegada de datos en el objeto "match.params", puede romper en el caso que no exista nada.
    useSelectorFn(1);
    expect(episodeDetail(1).text().includes(episode.title)).toEqual(true);
    expect(episodeDetail(1).text().includes(episode.season)).toEqual(true);
    expect(useSelectorStub).toHaveBeenCalled();
    expect(useEffect).toHaveBeenCalled();
  });

  it('Debería renderizar un h2 por cada personaje de la "Episode"', () => {
    // PASARLE LA PROP keys en el mapeo.
    useSelectorFn(1);
    expect(episodeDetail(1).find(h2)).toHaveLength(1);
    useSelectorFn(2);
    expect(episodeDetail(2).find(h2)).toHaveLength(1);
    useSelectorFn(3);
    expect(episodeDetail(3).find(h2)).toHaveLength(1);
    expect(useSelectorStub).toHaveBeenCalled();
    expect(useEffect).toHaveBeenCalled();
  });

});
