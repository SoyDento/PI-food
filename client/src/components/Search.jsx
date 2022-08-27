import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNameRecipe,
         filterByValues,
         filterByDiets,
         closeRecipe,         
         getDiets,
         getDishTypes         
         } from "../redux/actions";
// import Spinner from "./Spinner";
import Card from './Card.jsx';
import Paginated from './Paginated.jsx';
import s from  "../styles/Home.module.css";

function Search() {
  
  const dispatch = useDispatch();

  const recipes = useSelector(state=> state.queryRecipes); // console.log(recipes);
  const diets = useSelector(state=> state.diets); 
  const dishTypes = useSelector(state=> state.dishTypes);
  
  const [state, setState] = useState({
    status: '',
    page: 1,
    name: '',
  })

  const cardsPerPage = 9;
  const indexOfLastReci = state.page * cardsPerPage;
  const indexOfFirstReci = indexOfLastReci - cardsPerPage;
  const currentReci = recipes.length > 9 ? recipes.slice(indexOfFirstReci, indexOfLastReci) : recipes;

  const paginated = (numeroPagina) => setState({
    ...state,
    page: numeroPagina
  });

  const handleFilterDishTypes = (e) => {
    e.preventDefault();
    dispatch( filterByValues(e.target.value) );
    setState({...state, page: 1 })
  };
  const handleFilterDiets = (e) => {
    e.preventDefault();
    dispatch( filterByDiets(e.target.value) );
    setState({...state, page: 1 })
  };
  const handleRestart = () => {
    dispatch(getNameRecipe(state.name))
  };
  function ejectClose(e) {
    e.preventDefault(); 
    console.log(e.target.value);
    dispatch( closeRecipe(e.target.value) );    
  };   
  const handleInputChange = (e)=>{
    e.preventDefault();
    setState({
      ...state,
      name: e.target.value
    });
  };
  function handleClick () {
    dispatch(getDiets());
    dispatch(getDishTypes());
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getNameRecipe(state.name));    
    setTimeout(function(){                    
      setState({
        ...state,
        status: `match: ${state.name}`,
      })
    }, 6500); 
    document.getElementById('myform').reset();
  }

  return (
    <div className={s.Home}>    

    {
      ( recipes.length < 1 ) ? 

      <div className={s.text}>enter a new search please</div>          
          
      :
      
      <div className={s.Home} key="Recipes">

      <div className={s.titleHome}>List of Recipes</div>
      <div className={s.h5}>{state.status}</div>
      <div className={s.cont1} key="Recipes">        
        <button onClick={()=> handleRestart()}>restore</button>
        <div className={s.esp}></div>       
       
        <div className={s.text}> Dish Types:</div>
        <select value='default' onChange={(e)=> handleFilterDishTypes(e)}>
          <option value='default' disabled>--select--</option>
          {
            dishTypes?.map( (dt)=> <option key={dt.id} value={dt.name}> {dt.name} </option> )
          }     
        </select >
        <div className={s.esp}></div>
        <div className={s.text}> Diets:</div>
        <select  value='default'  onChange={(e)=> handleFilterDiets(e)}>
          <option value='default' disabled>--select--</option>
          {
            diets?.map( (d)=> <option key={d.id} value={d.name}> {d.name} </option> )
          }     
        </select >
        <div className={s.esp}></div>
      </div>
      <br/>
      <div className={s.text}>Pages:</div>
      <Paginated
        perPage = {cardsPerPage}        
        allRecipes = {recipes.length}
        paginado = {paginated}
        actualPage = {state.page}
      />
      <br/>
      <div className={s.cards} key="Recipes__Cars">
        {/*El Spinner le va a dar un efecto de carga hasta que la peticion de la API llegue, no tocar!.*/}
        {
        (currentReci[0].hasOwnProperty('msg')) ? 
        
          <div className={s.text}> {currentReci[0].msg} </div>  
          :        
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
                closeRecipe= {(e)=> ejectClose(e)}
              />
          )
        }
      </div>
      <br/>
    
    </div>
    }

      <form id='myform' className={s.cont5} onSubmit={(e)=>handleSubmit(e)}>
              <input
                type='text'
                placeholder='search...'
                onChange={(e)=>handleInputChange(e)}
                />
              <button type="submit" onClick={handleClick}> Search </button>
      </form>

    </div>
  );
}


export default Search;
