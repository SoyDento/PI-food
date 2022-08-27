import React from 'react';
import { Link } from "react-router-dom";
import s from '../styles/Card.module.css';

export default function Card ({id, title, db, image, diets, dishTypes, created_DB, closeRecipe}) {
  console.log(id);
  return(
    <div key={id} className={s.card}>      
      <Link to={`/home/recipes/${id}?creat=${db}`}>    {/*  ?creat=${created_DB}  */}
        <div className={s.img}>
          <img src={image} alt='img not found' width="270px" />
        </div>
        <div className={s.title}>  {title} </div>       
      </Link>      
      <div className={s.box}>
        <div>Diets:</div>
        <ul className={s.list}> 
              {
                !diets ? null :
                  diets.map((o, index)=> <li key={index}> {o} </li>)
              }
        </ul>
      
        <div>Dish Types:</div>
        <ul className={s.list}> 
              {
                !dishTypes ? null :
                  dishTypes.map((o, index)=> <li key={index}> {o} </li>)
              }
        </ul>
      </div>
      <br/>
      <div className={s.button}>
        <button value={id} onClick={(e)=>closeRecipe(e)}>
          close
        </button>
      </div>
    </div>
  )
}
