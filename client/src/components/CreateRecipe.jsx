// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import validate from '../Utils/validateErr.js';
// import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import validate from '../Utils/validate.js';
import { useHistory } from 'react-router-dom';
import { postRecipe, getDiets, getCuisines, getDishTypes } from '../actions';
import s from '../styles/CreateChar.module.css';


export default function CreateChar () {

  const dispatch = useDispatch();
  const dietsStore = useSelector((state)=>state.diets);
  const dishTypesStore = useSelector((state)=>state.dishTypes);
  const cuisinesStore = useSelector((state)=>state.cuisines);
  const history = useHistory();

  const [input, setInput] = useState({
    id: 0,
    title: "",
    image: "",
    veryHealthy: false,
    cheap: false,
    healthScore: 0,
    creditsText: "",
    aggregateLikes: 1,
    readyInMinutes: 999,
    servings: 0,
    sourceUrl: "",
    analyzedInstructions: [],
    diets: [],
    dishTypes: [],
    cuisines: []
  });
  const [error, setError] = useState({
    id:"",title:"",image:"",veryHealthy:"",cheap:"",healthScore:"",creditsText: "",readyInMinutes:"",
    servings:"",sourceUrl:"",analyzedInstructions:"",diets:"",dishTypes:"",cuisines:""
  });

  useEffect(()=>{
    dispatch(getDiets());
    dispatch(getDishTypes());
    dispatch(getCuisines());
  },[dispatch]);

  function handleChange(e) {
    setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    setError(validate(input));
  };
  function handleBoolean(e) {
    setInput({
        ...input,
        [e.target.name]: JSON.parse(e.target.value),    
      });
    setError(validate(input));
  };
  function handleCheck (e) {
    e.preventDefault();
    setInput({
      ...input,
      status: e.target.value
    });
    setError(validate(input));
  };
  function handleSelect (e) {
    e.preventDefault();
    if (!input.diets.includes(e.target.value)) {
      setInput({
        ...input,
        diets: [...input.diets, e.target.value]
      });
    };
    setError(validate(input));
  };
  function handleDelete(e) {
    setInput({
      ...input,
      diets: input.diets.filter( (o)=> o !== e.target.value)
    });
    setError(validate(input));
  };
  function resetStatus() {
    setInput({
      ...input,
      status: ''
    });
    setError(validate(input));
  };
  function handleSubmit (e) {
    e.preventDefault();
    if (error.name || error.nickname || error.birthday || error.img || error.status || error.diets ) {
      alert('Danger: review the data. Errors were found !!!')
    } else {
      dispatch(postRecipe(input));
      alert('characters created');
      setInput({ name:'', nickname:'', birthday:'', img:'', status:'', diets: [] });
      history.push('/recipes'); // se usa para rederigir desde el código
    };
  };
  function checking(){
    setTimeout(function(){
        setError(validate(input));
    }, 2000);
    alert('Advance. If the "add recipe" button appears, click it. Otherwise check the data, correct if necessary and check again.')
  };

  return(
    <div className={s.bakg}>
      <div className={`${s.cont2}`}>
        <div className={`${s.bannerText}`} key='bt'>create new recipe</div>
      </div>
      <form className={`${s.cards}`} onSubmit={(e)=>handleSubmit(e)}>

          <div className={s.cont3}>

            <div className={`${s.inpt}`} key='t'> Name: |
              <input
                      name="title" value={input.title}
                      onChange={(e)=>handleChange(e)}
                      className={error.title?`${s.dangerInp}`:`${s.validInp}`}
                      autoComplete="off"
                      type="text"/>
              <div className={error.title?`${s.danger}`:`${s.valid}`}>
                {error.title || 'valid data'}
              </div>
            </div>

            <div className={`${s.inpt}`} key='h'>Is it very very healthy?: |
              <select name="veryHealthy" onChange={(e)=> handleBoolean(e)}>
                <option name="veryHealthy" value='true'> true </option>
                <option name="veryHealthy" value='false'> false </option>
              </select >
            </div>

            <div className={`${s.inpt}`} key='h'>Is very very cheap?: |
              <select name="cheap" onChange={(e)=> handleBoolean(e)}>
                <option name="cheap" value='true'> true </option>
                <option name="cheap" value='false'> false </option>
              </select >
            </div>

            <div className={s.inpt} key='s'> Health Score: |
              <input
                      name="healthScore" value={input.healthScore}
                      onChange={(e)=>handleChange(e)}
                      className={error.healthScore?`${s.dangerInp}`:`${s.validInp}`}
                      min="1" max="100"
                      type="number" required/>
              <div className={error.healthScore?`${s.danger}`:`${s.valid}`}>
                {error.healthScore || 'valid data'}
              </div>
            </div>

            <div className={s.inpt} key='s'> Ready In Minutes: |
              <input
                      name="readyInMinutes" value={input.readyInMinutes}
                      onChange={(e)=>handleChange(e)}
                      className={error.readyInMinutes?`${s.dangerInp}`:`${s.validInp}`}
                      min="1" max="900"
                      type="number"/>
              <div className={error.readyInMinutes?`${s.danger}`:`${s.valid}`}>
                {error.readyInMinutes || 'valid data'}
              </div>
            </div>
            
            <div className={`${s.inpt}`} key='i'> Image URL: |
                        <input
                              name="image" value={input.image}
                              onChange={(e)=>handleChange(e)}
                              className={error.image?`${s.dangerInp}`:`${s.validInp}`}
                              autoComplete="off"
                              type="text"  />
              <div className={error.image?`${s.danger}`:`${s.valid}`}>
                {error.image || 'valid data'}
              </div>
            </div>

        </div>
       
        <div className={s.cont4}>
          {
            (error.title || error.veryHealthy || error.cheap || error.img ||  
              error.healthScore || error.creditsText || error.readyInMinutes || 
              error.analyzedInstructions || error.servings || error.sourceUrl  ) ?

              <button onClick={()=>checking()}>pre-error checking</button>
              :
              <div className={s.green} key='s'>
                <button type="submit">Add Character</button>
              </div>
          }
          {/*<div className={`${s.inpt}`}>
            <input type="reset" value="restore form"/>
          </div>*/}
        </div>

      </form>

      <select onChange={(e)=> handleSelect(e)}>
        {
          dishTypesStore.map(o=> <option key={`s${o.id}`} value={o.name}> {o.name} </option>)
        }
      </select >
      { input.dishTypes?.map( (el, index) =>
        <div className={s.dsdfd} key={`o${index}`}>
          <p>{el}</p>
          <button  value={el} onClick={(e)=>handleDelete(e)}>X</button>
        </div>)
      }
      <div className={error.dishTypes?`${s.danger}`:`${s.valid}`}>
        {error.dishTypes || 'valid data'}
      </div>

      <select onChange={(e)=> handleSelect(e)}>
        {
          dishTypesStore.map(o=> <option key={`s${o.id}`} value={o.name}> {o.name} </option>)

          dishTypesStore.map(o=> 
              <div>                  
                  <label key={o.id}><input
                      name={o.name} value={o.name}
                      onChange={(e)=>handleCheck(e)}
                      type="checkbox"/>Presumed dead</label>
              </div>          
          )
        }
      </select >
      { input.dishTypes?.map( (el, index) =>
        <div className={s.dsdfd} key={`o${index}`}>
          <p>{el}</p>
          <button  value={el} onClick={(e)=>handleDelete(e)}>X</button>
        </div>)
      }
      <div className={error.dishTypes?`${s.danger}`:`${s.valid}`}>
        {error.dishTypes || 'valid data'}
      </div>

      <div className={`${s.inpt}`} key='s'> Status: 
          { (input.status !== '') ?
              <button  onClick={()=>resetStatus()}>Restart Options</button>

              :

              <div>                  
                  <label key="Pres"><input
                      name='Presumed dead' value='Presumed dead'
                      onChange={(e)=>handleCheck(e)}
                      type="checkbox"/>Presumed dead</label>
              </div>
          }

        <div className={error.status?`${s.danger}`:`${s.valid}`}>
          {error.status || 'valid data'}
        </div>
    </div>

      <div className={`${s.inpt}`} key='s'> Status: 
          { (input.status !== '') ?
              <button  onClick={()=>resetStatus()}>Restart Options</button>

              :

              <div>
                  <label key="Ali"><input
                      name="Alive"  value="Alive"
                      onChange={(e)=>handleCheck(e)}
                      type="checkbox"/>Alive</label>
                  <label key="Des"><input
                      name="Deseased"  value="Deseased"
                      onChange={(e)=>handleCheck(e)}
                      type="checkbox"/>Deseased</label>
                  <label key='Unk'><input
                      name='Unknown'  value='Unknown'
                      onChange={(e)=>handleCheck(e)}
                      type="checkbox"/>Unknown</label>
                  <label key="Pres"><input
                      name='Presumed dead' value='Presumed dead'
                      onChange={(e)=>handleCheck(e)}
                      type="checkbox"/>Presumed dead</label>
              </div>
          }

        <div className={error.status?`${s.danger}`:`${s.valid}`}>
          {error.status || 'valid data'}
        </div>
    </div>

  </div>
  )
}

