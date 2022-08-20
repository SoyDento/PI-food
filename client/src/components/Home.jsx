// import React, { useEffect, useState } from "react";
import React  from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCharacters,
         filterCharByStatus,
         filterCreated,
         orderByName,
         getDbChars,
         getApiChars,
         removeChar,
         closeCharacter} from "../actions";
import Spinner from "./Spinner";
import Card from './Card.js';
import Paginated from './Paginated.js';
import SearchBar from './SearchBar';

import "../styles/Characters.css";

function Characters() {

  const dispatch = useDispatch();

  const allChar = useSelector(state=> state.characters);
  const [page, setPage] = React.useState(1);
  const [order, setOrder] = React.useState('');

  const charPerPage = 8;
  const indexOfLastChar = page * charPerPage;
  const indexOfFirstChar = indexOfLastChar - charPerPage;
  const currentChar = allChar.length > 8 ? allChar.slice(indexOfFirstChar, indexOfLastChar) : allChar;

  const paginated = (numeroPagina) => setPage(numeroPagina);

  React.useEffect(()=>{
      dispatch(getApiChars());
      dispatch(getDbChars());
  },[dispatch]);

  /*
    PISTA:
    La dirección de donde vamos a tomar los datos es
    https://www.breakingbadapi.com/api/characters?name=
    Notesé que hay una query en la dirección. Lo que seguirá a esa query será un string
    con un nombre o un apellido, y en base a eso la api realizará el filtrado.
    En caso de no poner nada en la query, la api traerá a todos los personajes.
  */

  // const handleClick = (event) => {
  //   event.preventDefault();
  //   dispatch( getCharacters() );
  // };
  const handleFilterStatus = (e) => {
    e.preventDefault();
    dispatch( filterCharByStatus(e.target.value) );
    setPage(1);
  };
  const handleFilterCreat = (e) => {
    e.preventDefault();
    dispatch( filterCreated(e.target.value) );
  };
  const handleSort = (e) => {
    e.preventDefault();
    dispatch( orderByName(e.target.value) );
    setPage(1);
    setOrder(`ordenado: ${e.target.value}`)
  }
  const handleClick = () => {
    dispatch( getCharacters() )
  };
  const handleRestart = () => {
    dispatch( getApiChars() );
    setPage(1);
  };
  function ejectClose(e) {
    e.preventDefault();
    dispatch( closeCharacter(e.target.value) );
  };
  function onRemove(e) {
    e.preventDefault();
    alert('Are you sure you want to delete a character from the database?');
    dispatch( removeChar(e.target.value) );
  };

  return (
    <div className="Characters" key="Characters">
      <h1>List of Characters</h1>
      <h5>{order}</h5>
      <button onClick={()=> handleRestart()}>Restart</button>
      <select key="order" onChange={(e)=> handleSort(e)}>
        <option value='ascending order'>ascending order</option>
        <option value='reverse order'>reverse order</option>
      </select >
      <select onChange={(e)=> handleFilterStatus(e)}>
        <option value='All'>All</option>
        <option value='Alive'>Alive</option>
        <option value='Deceased'>Deceased</option>
        <option value='Unknown'>Unknown</option>
        <option value='Presumed dead'>Presumed dead</option>
      </select >
      <select onChange={(e)=> handleFilterCreat(e)}>
        <option value='api'>original characters</option>
        <option value='created'>characters created</option>
      </select >
      <button onClick={()=> handleClick()}>All Characters</button>
      <br/>
      <br/>
      <h3>Pages:</h3>
      <Paginated
        charactPerPage = {charPerPage}
        allCharacters = {allChar.length}
        paginado = {paginated}
      />
      <br/>
      <div className="Characters__list" key="Characters__list">
        {/*El loading le va a dar un efecto de carga hasta que la peticion de la API llegue, no tocar!.*/}
        {
        !currentChar ? <Spinner /> :
          currentChar.map((c) =>
              <Card
                key={c.char_id}
                id={c.char_id}
                name= {c.name}
                img= {c.img}
                created_DB = {c.created_DB? true : false }
                closeChar= {ejectClose}
                removeChar= {onRemove}
              />
          )
        }
      </div>
      <br/>
      <SearchBar />
      <br/>
    </div>

  );
}



export default Characters;
