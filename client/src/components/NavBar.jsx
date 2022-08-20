// import React from "react";
import React, { Component } from 'react';
import "../styles/NavBar.css";
import { Link } from "react-router-dom";

class NavBar extends Component {
  render(){
    return (
      <div className="navbar">
        <div><Link to="/home">Home</Link></div>
        <div><Link to="/dishTypes">Dish Types</Link></div>
        <div><Link to="/create">Create New Recipe</Link></div>
      </div>
    );
  }
};
//
// function NavBar() {
//   return (
//     <div className="navbar">
        // <div><Link to="/home">Home</Link></div>
        // <div><Link to="/dishTypes">Dish Types</Link></div>
        // <div><Link to="/create">Create New Recipe</Link></div>
//     </div>
//   );
// }

export default NavBar;
