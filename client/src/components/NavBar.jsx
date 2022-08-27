// import React from "react";
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import s from "../styles/NavBar.module.css";
import Logo from '../img/logo.png';

class NavBar extends Component {
  render(){
    return (
          <div className={`${s.navbar}`}>             
                <div className={`${s.logo}`}>
                    <img id="logo" src={Logo} width="150" height="70" alt="" />
                </div>
                <div className={`${s.listItem} ${s.link}`}>
                  <Link to="/home/recipes">Home</Link>
                </div>
                <div className={`${s.listItem}`}>
                  <Link to="/home/search">Search Recipe</Link>  
                </div>  
                <div className={`${s.listItem}`}>
                  <Link to="/home/create">Create New Recipe</Link>  
                </div>  
          </div>
    );
  }
}; 


export default NavBar;
