import React from 'react';
import { Link } from "react-router-dom";
import s from '../styles/Card.module.css';

export default function Card ({id, title, db, image, diets, dishTypes, created_DB, closeRecipe, removeRecipe}) {
  // console.log(id);
  return(
    <div key={id} className={s.card}>      
      <Link to={`/recipes/${id}?creat=${created_DB}`}>
        <h3> {title} </h3>
        <br/>
        <div className={s.image}>
          <img src={image} alt='img not found' width='200px' heigth='250px'/>
        </div>
      </Link>
      <br/>
      <div className={s.other}>
        <h5> Diets:
              {
                !diets ? null :
                  diets.map(o=> ' - ' + o + ' - ')
              }
        </h5>
      </div>
      <div className={s.other}>
        <h5> Dish Types:
              {
                !dishTypes ? null :
                  dishTypes.map(o=> ' - ' + o + ' - ')
              }
        </h5>
      </div>
      <br/>
      <div className={s.bot}>
      {
        (db === 0) ? // (created_DB) ?
          <button value={id} onClick={(e)=>removeRecipe(e)}>delete recipe from database</button>
          :
          <button value={id} onClick={(e)=>closeRecipe(e)}>close list recipe</button>
      }
      </div>

    </div>
  )
}
