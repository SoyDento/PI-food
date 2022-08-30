// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import validate from '../Utils/validateErr.js';
// import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import validate from '../Utils/validate.js';
import convertInput from '../Utils/convertInput.js';
import analyzedInstruc from '../Utils/analyzedInstruc.js';
import { useHistory } from 'react-router-dom';
import { postRecipe, getDiets, getCuisines, getDishTypes } from '../redux/actions';
import s from '../styles/CreateRecipe.module.css';


export default function CreateRecipe () {

  const dispatch = useDispatch();
  const dietsStore = useSelector((state)=>state.diets);
  const dishTypesStore = useSelector((state)=>state.dishTypes);
  const cuisinesStore = useSelector((state)=>state.cuisines);
  const history = useHistory();

  const [input, setInput] = useState({
    id: 0,
    title: "",
    image: "",
    veryHealthy: null,
    cheap: null,
    healthScore: 0,
    creditsText: "",
    aggregateLikes: 1,
    readyInMinutes: "",
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
  const [steps, setSteps] = useState({
    step1: '', ing1: [], eq1: [],
    step2: '', ing2: [], eq2: [],
    step3: '', ing3: [], eq3: [],
    step4: '', ing4: [], eq4: [],
    step5: '', ing5: [], eq5: [],
  });

  useEffect(()=>{
    dispatch(getDiets());
    dispatch(getDishTypes());
    dispatch(getCuisines());
  },[dispatch]);

  function handleChange(e) {
    e.preventDefault();  // console.log(e.target.name);
    setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    // console.log(input);
    setError(validate(input));
  };
  function handleBoolean(e) {
    e.preventDefault();       
    let [name, value] = e.target.value.split('_');  // console.log(value); console.log(JSON.parse(value));
    setInput({
        ...input,
        [name]: JSON.parse(value),    
      });
    // console.log(input.veryHealthy);
    setError(validate(input));
  };
  function handleSelect (e) {
    e.preventDefault();
    console.log('value: ', e.target.value);     
    let [name, value] = e.target.value.split('_');
    // ====  Falta probar  =====
    // if (!input[name].includes(value)) {
    //   setInput({
    //     ...input,
    //     [name]: [...input[name], value]
    //   }); 
    // };
    if(name === 'diets') {
      if (!input.diets.includes(value)) {
        setInput({
          ...input,
          diets: [...input.diets, value]
        }); 
      }
    };
    if(name === 'dishTypes') {
      if (!input.dishTypes.includes(value)) {
        setInput({
          ...input,
          dishTypes: [...input.dishTypes, value]
        }); 
      }
    }
    setError(validate(input));
  };
  function handleDelete(e) {
    e.preventDefault();   
    let [name, value] = e.target.value.split('_');   console.log(value); console.log(name);
    if(name === 'diets') {
      let d = input.diets.filter( (o)=> o !== value);
      setInput({...input, diets: d,});
    };
    if(name === 'dishTypes') {
      let dt = input.dishTypes.filter( (o)=> o !== value);
      setInput({...input, dishTypes: dt,});
    };
    setError(validate(input));
  };
  function handleSubmit (e) {
    e.preventDefault();
    if (error.title || error.cuisines || error.readyInMinutes || error.healthScore || error.dishTypes || error.veryHealthy || error.cheap || error.image || error.servings || error.analyzedInstructions ) {
      alert('Danger: review the data. Errors were found !!!')
    } else {       
      let inputConv = convertInput(input);
      console.log('input en componente CreateRecipe: ',inputConv);
      dispatch(postRecipe(inputConv));
      alert('recipe created');
      history.push('/home/recipes'); // se usa para rederigir desde el código    
    };
  };
  function checking(){
    console.log(error);
    setTimeout(function(){
        setError(validate(input));
        if (error.title || error.cuisines || error.readyInMinutes || error.healthScore || error.dishTypes || error.veryHealthy || error.cheap || error.image || error.servings || error.analyzedInstructions ) {
          alert('Danger: review the data. Errors were found !!!')
        };
        alert('Advance. If the "add recipe" button appears, click it. Otherwise check the data, correct if necessary and check again.')  
    }, 2000);
  };
  function handleChg(e) {
    e.preventDefault();  // console.log(e.target.name);
    setSteps({
        ...steps,
        [e.target.name]: e.target.value,
      });
    // console.log(steps);
  };
  function handleInstruct(e){
    e.preventDefault();
    let {step1,ing1,eq1,step2,ing2,eq2,step3,ing3,eq3,step4,ing4,eq4,step5,ing5,eq5} = steps;
    console.log(steps);
    let analiz = analyzedInstruc(step1,ing1,eq1,step2,ing2,eq2,step3,ing3,eq3,step4,ing4,eq4,step5,ing5,eq5);
    console.log(analiz);
    setInput({
      ...input,
      analyzedInstructions: analiz,
    });
  };
  

  return(
    <div className={s.bakg}>
      <div className={`${s.cont2}`}>
        <div className={`${s.bannerText}`} key='bt'>create</div>
      </div>
      <form className={`${s.form}`} onSubmit={(e)=>handleSubmit(e)}>

        <div className={s.buttons}>
          <div className={s.textButton}>complete and press ►</div>
          <div className={s.esp}></div>
          {
            (error.title || error.veryHealthy || error.cheap || error.img ||  
              error.healthScore || error.creditsText || error.readyInMinutes || 
              error.analyzedInstructions || error.servings || error.sourceUrl  ) ?

              <button onClick={()=>checking()}>pre-error checking</button>
              :
              <div className={s.green} key='s'>
                <button className={s.green} type="submit">Add Recipe</button>
              </div>
          }
          {/*<div className={`${s.inpt}`}>
            <input type="reset" value="restore form"/>
          </div>*/}
        </div>

          <div className={s.cont3}>

            <div className={`${s.inpt}`} key='t'> Name: |
              <input
                      name="title" value={input.title}   placeholder='complete...'
                      onChange={(e)=>handleChange(e)}
                      className={error.title?`${s.dangerInp}`:`${s.validInp}`}
                      autoComplete="off"
                      type="text"/>
              <div className={error.title?`${s.danger}`:`${s.valid}`}>
                {error.title || 'valid data'}
              </div>
            </div>

            <div className={`${s.inpt}`} key='h'>Is it very very healthy?: |
              <select value='default' onChange={(e)=> handleBoolean(e)}>
                <option value='default' disabled>------select------</option>
                <option value='veryHealthy_true'> true </option>
                <option value='veryHealthy_false'> false </option>
              </select >
              <div className={s.valid}> 
              { (input.veryHealthy === null) ? 'veryHealthy is required' : 
              `${input.veryHealthy.toString()} - valid data` } 
              </div>  
            </div>            

            <div className={`${s.inpt}`} key='c'>Is very very cheap?: |
              <select value='default' onChange={(e)=> handleBoolean(e)}>
                <option value='default' disabled>------select------</option>
                <option value='cheap_true'> true </option>
                <option value='cheap_false'> false </option>
              </select >
              <div className={s.valid}> 
              { (input.cheap === null) ? 'cheap is required' : 
              `${input.cheap.toString()} - valid data` } 
              </div>  
            </div>

            <div className={s.inpt} key='s'> Health Score: |
              <input
                      name="healthScore" value={input.healthScore}  placeholder='complete...'
                      onChange={(e)=>handleChange(e)}
                      className={error.healthScore?`${s.dangerInp}`:`${s.validInp}`}
                      min="1" max="100"   type="number" required/>
              <div className={error.healthScore?`${s.danger}`:`${s.valid}`}>
                {error.healthScore || 'valid data'}
              </div> 
            </div>

            <div className={s.inpt} key='rim'> Ready In Minutes: |
              <input
                      name="readyInMinutes" value={input.readyInMinutes}
                      placeholder='complete...'
                      onChange={(e)=>handleChange(e)}
                      className={error.readyInMinutes?`${s.dangerInp}`:`${s.validInp}`}
                      min="1" max="900"
                      type="number"/>
              <div className={error.readyInMinutes?`${s.danger}`:`${s.valid}`}>
                {error.readyInMinutes || 'valid data'}
              </div>
            </div>

            <div className={s.inpt} key='sv'> Servings: |
              <input
                name="servings" value={input.servings}    placeholder='complete...'
                onChange={(e)=>handleChange(e)}
                className={error.servings?`${s.dangerInp}`:`${s.validInp}`}
                min="1" max="50"     type="number"/>
              <div className={error.servings?`${s.danger}`:`${s.valid}`}>
                {error.servings || 'valid data'}
              </div>
            </div>
            
            <div className={`${s.inpt}`} key='i'> Image URL: |
              <input
                name="image" value={input.image}   placeholder='complete...'
                onChange={(e)=>handleChange(e)}
                className={error.image?`${s.dangerInp}`:`${s.validInp}`}
                autoComplete="off"      type="text"  />
              <div className={error.image?`${s.danger}`:`${s.valid}`}>
                {error.image || 'valid data'}
              </div>
            </div>

        </div>        

      </form>

      <div className={s.text}> Dish Types -you can select several of the options-:</div>
      <select value='default' onChange={(e)=> handleSelect(e)}>
        <option value='default' disabled>------select------</option>
        {
          dishTypesStore.map(dt=> <option key={dt.id} value={`dishTypes_${dt.name}`}> {dt.name} </option> )
        }
      </select >
      <div className={s.boxClose}>
      { input.dishTypes?.map( (el, index) =>
        <div className={s.itemClose} key={`o${index}`}>
          <p>{el}</p>
          <button value={`dishTypes_${el}`} onClick={(e)=>handleDelete(e)}>X</button>
        </div>)
      }
      </div>
      <div className={error.dishTypes?`${s.danger}`:`${s.valid}`}>
        {error.dishTypes || 'valid data'}
      </div>
      <br/>
      
      <div className={s.text}> Diets -you can select several of the options-:</div>
      <select value='default' onChange={(e)=> handleSelect(e)}>
        <option value='default' disabled>------select------</option>
        {
          dietsStore?.map(d=> <option key={d.id} value={`diets_${d.name}`}> {d.name} </option> )
        }
      </select >
      <div className={s.boxClose}>
      { input.diets?.map( (el, index) =>
        <div className={s.itemClose} key={`o${index}`}>
          <p>{el}</p>
          <button value={`diets_${el}`} onClick={(e)=>handleDelete(e)}>X</button>
        </div>)
      }
      </div>
      <div className={error.diets?`${s.danger}`:`${s.valid}`}>
        {error.diets || 'valid data'}
      </div>     
      
      <div className={`${s.form}`} key='cuisine'> 
              <div className={`${s.inpt}`} >State whether it is typical of a particular cuisine or belongs to the cuisine of a region or regions. In the case of belonging to more than one cuisine, separate each cuisine with a hyphen. Warning: Do not use a space, except in the case of compound names: |</div>
                  <input
                      name="cuisines" value={input.cuisines}  placeholder='complete...'
                      onChange={(e)=>handleChange(e)}
                      className={error.cuisines?`${s.dangerInp}`:`${s.validInp}`}
                      autoComplete="off"     type="text"  />
              <div className={error.cuisines?`${s.danger}`:`${s.valid}`}>
                {error.cuisines || 'valid data'}
              </div>
      </div>

      <div className={`${s.box}`} key='c'> List of existing cuisines from the database:
        <h4>
          {
            cuisinesStore?.map(c=> ' ' + c.name + ',  ')
          }
        </h4>
      </div>
      <h3>* If the region or cuisine is in the list, please copy it as it appears there.</h3>

      <form className={`${s.form} ${s.form2}`} onSubmit={(e)=>handleInstruct(e)}>
        <div className={s.box7}>
            <div className={`${s.inpt}`} key='s1'> Step 1: 
              <input
                      name="step1" value={steps.step1}   placeholder='complete...'
                      onChange={(e)=>handleChg(e)}  className={s.step}
                      autoComplete="off"     type="text"/>              
            </div>
            <div className={`${s.inpt}`} key='i1'> Put the ingredients in step 1. Separate with script"-": 
              <input
                      name="ing1" value={steps.ing1}   placeholder='complete...'
                      onChange={(e)=>handleChg(e)}  className={s.ingyeq}
                      autoComplete="off"     type="text"/>              
            </div>
            <div className={`${s.inpt}`} key='e1'> Put the equipment in step 1. Separate with script"-": 
              <input
                      name="eq1" value={steps.eq1}   placeholder='complete...'
                      onChange={(e)=>handleChg(e)}  className={s.ingyeq}
                      autoComplete="off"     type="text"/>              
            </div>
        </div>

         
            <div className={s.green} key='s'>
                  <button className={s.green} type="submit">confirm steps</button>
            </div>     

      </form>

  </div>
  )
};
  

