// import React from "react";
import React, { Component } from 'react';
import s from "../styles/NavBar.module.css";
import { Link } from "react-router-dom";

class NavBar extends Component {
  render(){
    return (
      <div className={s.navbar}>
        <div><Link to="/home/recipes">Home</Link></div>
        <div><Link to="/home/cuisines">by region</Link></div>
        <div><Link to="/home/create">Create New Recipe</Link></div>
      </div>
    );
  }
};
//
// function NavBar() {
//   return (
//     <div className={s.navbar}>
        // <div><Link to="/home/recipes">Home</Link></div>
        // <div><Link to="/home/cuisines">by region</Link></div>
        // <div><Link to="/home/create">Create New Recipe</Link></div>
//     </div>
//   );
// }

export default NavBar;
