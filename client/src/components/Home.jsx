// import React, { useEffect, useState } from "react";
import React  from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes,
         filterByValues,
         filterCreated,
         orderByName,
         getDbRecipes,
         getDiets,
         getDishTypes,
         removeRecipe,
         closeRecipe} from "../actions";
import Spinner from "./Spinner";
import Card from './Card.js';
import Paginated from './Paginated.js';
import SearchBar from './SearchBar';

import s from  "../styles/Recipes.module.css";

function Home() {

  const dispatch = useDispatch();

  const allReci = useSelector(state=> state.recipes);
  const diets = useSelector(state=> state.diets);
  const dishTypes = useSelector(state=> state.dishTypes);
  const [page, setPage] = React.useState(1);
  const [order, setOrder] = React.useState('');

  const cardsPerPage = 9;
  const indexOfLastReci = page * cardsPerPage;
  const indexOfFirstReci = indexOfLastReci - cardsPerPage;
  const currentReci = allReci.length > 9 ? allReci.slice(indexOfFirstReci, indexOfLastReci) : allReci;

  const paginated = (numeroPagina) => setPage(numeroPagina);

  React.useEffect(()=>{
      // dispatch(getApiRecipes());
      dispatch(getDbRecipes());
      dispatch(getDiets());
      dispatch(getDishTypes());
  },[dispatch]);

  // const handleClick = (event) => {
  //   event.preventDefault();
  //   dispatch( getRecipes() );
  // };
  const handleFilterDishTypes = (e) => {
    e.preventDefault();
    dispatch( filterByValues(e.target.value) );
    setPage(1);
  };
  const handleFilterDiets = (e) => {
    e.preventDefault();
    dispatch( filterByValues(e.target.value) );
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
    setOrder(`order: ${e.target.value}`)
  } 
  const handleRestart = () => {
    dispatch( getDbRecipes() );
    setPage(1);
  };
  function ejectClose(e) {
    e.preventDefault();
    dispatch( closeRecipe(e.target.value) );
  };
  function onRemove(e) {
    e.preventDefault();
    alert('Are you sure you want to delete a recipe from the database?');
    dispatch( removeRecipe(e.target.value) );
  };

  return (
    <div className="Recipes" key="Recipes">
      <h1>List of Recipes</h1>
      <h5>{order}</h5>
      <button onClick={()=> handleRestart()}>Restart</button>
      <h3> Order:</h3>
      <select key="order" onChange={(e)=> handleSort(e)}>
        <option value='alphabetically ascending'>alphabetically ascending</option>
        <option value='alphabetically disdainful'>alphabetically disdainful</option>
      </select >
      <h3> Dish Types:</h3>
      <select onChange={(e)=> handleFilterDishTypes(e)}>
        {
          dishTypes.map( (dt)=> <option key={dt.id} value={dt.name}> {dt.name} </option> )
        }     
      </select >
      <h3> Diets:</h3>
      <select onChange={(e)=> handleFilterDiets(e)}>
        {
          diets.map( (d)=> <option key={d.id} value={d.name}> {d.name} </option> )
        }     
      </select >
      <select onChange={(e)=> handleFilterCreat(e)}>
        <option value='api'>original recipes</option>
        <option value='created'>recipes created</option>
      </select >
      <br/>
      <br/>
      <h3>Pages:</h3>
      <Paginated
        charactPerPage = {cardsPerPage}
        allRecipes = {allReci.length}
        paginado = {paginated}
      />
      <br/>
      <div className={s.Recipes__list} key={s.Recipes__list}>
        {/*El Spinner le va a dar un efecto de carga hasta que la peticion de la API llegue, no tocar!.*/}
        {
        (!currentReci) ? <h3>no recipes were found with these parameters</h3>  :        
          currentReci.map((r) =>
              <Card
                key= {r.id}
                id= {r.id}
                title= {r.title}
                db= {r.db}
                image= {r.image}
                dishTypes= {r.dishTypes}
                diets= {r.diets}
                created_DB = {r.created_DB? true : false }
                closeRecipe= {ejectClose}
                removeRecipe= {onRemove}
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



export default Home;
