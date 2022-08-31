import React  from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllrecipes,
         getDiets,
         getDishTypes,
        //  closeRecipe   
         } from "../redux/actions";
// import Spinner from "./Spinner";
import Card from './Card.jsx';
import Paginated from './Paginated.jsx';
import s from  "../styles/Home.module.css";
import invertSortAlf from '../Utils/invertSortAlfb';
import sortAlfabet from "../Utils/sortAlfabet";
import scoreSort from '../Utils/scoreSort';
import image from '../img/lampara.png';


function Home() {

  const dispatch = useDispatch();

  const recipes = useSelector(state=> state.recipes);    console.log(recipes.length);
  const diets = useSelector(state=> state.diets); // console.log(diets);
  const dishTypes = useSelector(state=> state.dishTypes);
  const [page, setPage] = React.useState(1);
  const [order, setOrder] = React.useState('');
  const [state, setState] = React.useState({
    allReci: [],
    originRecipes: [],
  })

  const cardsPerPage = 9;
  const indexOfLastReci = page * cardsPerPage;
  const indexOfFirstReci = indexOfLastReci - cardsPerPage;
  const currentReci = state.allReci.length > 9 ? state.allReci.slice(indexOfFirstReci, indexOfLastReci) : state.allReci;

  const paginated = (numeroPagina) => setPage(numeroPagina);

  // React.useEffect(()=>{  ----> Lo reemplaze xq me hacia bucle
  //     dispatch(getAllrecipes());
  //     dispatch(getDiets());
  //     dispatch(getDishTypes());
  //     set...
  // },[dispatch]);  Repite la accion 4 veces, en cambio la opcion de abajo lo hace solo una vez x cada recarga. Optimiza acciones!!!

  React.useEffect(()=>{
    dispatch(getAllrecipes());
  },[dispatch]);
  React.useEffect(()=>{
    dispatch(getDiets());
  },[dispatch]);
  React.useEffect(()=>{
    dispatch(getDishTypes());
  },[dispatch]);
  
  const handleFilterDishTypes = (e) => {
    e.preventDefault();
    // dispatch( filterByValues(e.target.value) );
    let allRecipes = state.originRecipes;
    let filterValues = allRecipes.filter((o)=> o.dishTypes.includes(e.target.value) )
    setState({
      ...state,
      allReci: filterValues,
    })
    setPage(1);
  };
  const handleFilterDiets = (e) => {
    e.preventDefault();
    // dispatch( filterByValues(e.target.value) );
    let allRecipes = state.allReci;
    let filterValues = allRecipes.filter((o)=> o.diets.includes(e.target.value) )
    setState({
      ...state,
      allReci: filterValues,
    })
    setPage(1);
  };
  const handleFilterCreat = (e) => {
    e.preventDefault();
    // dispatch( filterCreated(e.target.value) );
    let allRecipes = state.allReci;
    let createdFilter = (e.target.value === 'created') ?
        allRecipes.filter( (el)=> el.db === 0 ) : allRecipes.filter( (el)=> el.db !== 0 );        
    setState({
      ...state,
      allReci: createdFilter,
    })
    setPage(1);
  };
  const handleSort = (e) => {
    e.preventDefault();
    // dispatch( orderByName(e.target.value) );
    const sortedAlfabe = e.target.value === 'alphabetically ascending' ?
                  sortAlfabet(state.allReci) : invertSortAlf(state.allReci);
    setState({
      ...state,
      allReci: sortedAlfabe,
    })
    setPage(1);
    setOrder(`order: ${e.target.value}`)
  };
  function sortScore(e){
    e.preventDefault();
    let orderScore = scoreSort(state.allReci, 'healthScore');
    setState({
      ...state,
      allReci: orderScore,
    });       
    setPage(1);
  }
  const handleRestart = () => {
    // dispatch(getAllrecipes());   
    setState({
      ...state,
      originRecipes: recipes,
      allReci: recipes,
    });       
    setPage(1);
  };
  function ejectClose(e) {
    e.preventDefault(); 
    console.log(e.target.value);
    // dispatch( closeRecipe(e.target.value) );
    let filterClose = state.allReci.filter(c=> c.id !== parseInt(e.target.value));   
    setState({
      ...state,
      allReci: filterClose,
    })
  };   
  function handleClick() {
    setState({
      ...state,
      originRecipes: recipes,
      allReci: recipes,
    })
  };
  

  return (
    <div className={s.Home}>
    {
      ( state.allReci.length < 1 && state.originRecipes.length < 1 ) ? 

      <div className={s.Home}>
        <div className={s.lampara}>
          <div className={s.titleHome}>Welcome to the Valentina Cucina<br></br> recipe app</div>
          <button className={s.button} onClick={()=> handleClick()}>Press and we'll show you our more than 100 recipes</button>        
          <img src={image} alt='img not found' width="470px" />
        </div>
      </div>
      :
      <div className={s.Home} key="Recipes">
      <div className={s.titleHome}>List of Recipes</div>
      <div className={s.h5}>{order}</div>
      <div className={s.cont1} key="Recipes">        
        <button onClick={()=> handleRestart()}>restore</button>
        <div className={s.esp}></div>
        <div className={s.text}> Alphabetical Order:</div>
        <select key="order" value='default' onChange={(e)=> handleSort(e)}>
          <option value='default' disabled>--select--</option>
          <option value='alphabetically ascending'>regular</option>
          <option value='alphabetically disdainful'>reverse</option>
        </select >
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
        <div className={s.text}> Recipes Created:</div>
        <select value='default' onChange={(e)=> handleFilterCreat(e)}>
          <option value='default' disabled>--select--</option>
          <option value='api'>original recipes</option>
          <option value='created'>recipes created</option>
        </select >
        <div className={s.esp}></div>
        <button onClick={(e)=> sortScore(e)}>Health Score</button>
      </div>
      <br/>
      <div className={s.text}>Pages:</div>
      <Paginated
        perPage = {cardsPerPage}        
        allRecipes = {state.allReci.length}
        paginado = {paginated}
        actualPage = {page}
      />
      <br/>
      <div className={s.cards} key="Recipes__Cars">
        {/*El Spinner le va a dar un efecto de carga hasta que la peticion de la API llegue, no tocar!.*/}
        {
        (!currentReci) ? <div className={s.text}>no recipes were found with these parameters</div>  :        
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
    </div>
  );
}



export default Home;
