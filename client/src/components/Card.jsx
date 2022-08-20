import React from 'react';
import { Link } from "react-router-dom";
import s from '../styles/Card.module.css';

export default function Card ({id, name, img, closeCard}) {
  // console.log(id);
  return(
    <div key={id} className={s.card}>
      <Link to={`/characters/${id}`}>
        <h3>{name}</h3>
        <div className={s.image}>
          <img src={img} alt='img not found' width='200px' heigth='250px'/>
        </div>
      </Link>
      <div className={s.bot}>
        <button value={id} onClick={(e)=>closeCard(e)}>close list character</button>      
      </div>
    </div>
  )
}
