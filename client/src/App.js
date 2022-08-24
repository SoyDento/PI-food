import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";

import Landing from './components/Landing';
import NavBar from './components/NavBar';
import Home from './components/Home';
import RecipeDetail from './components/RecipeDetail';
import Cuisines from './components/Cuisines';
import CuisineDetail from './components/CuisinesDetail';
import CreateRecipe from './components/CreateRecipe';

function App() {
  return (
    <BrowserRouter>      
      <Route exact path = "/" component = {Landing}/>
      <Route path = "/home" component = {NavBar}/>
      <Route path = "/home/recipes/:id" component = {RecipeDetail}/>  
      <Route exact path = "/home/recipes" component = {Home}/>          
      <Route exact path = "/home/create" component = {CreateRecipe}/>
      <Route exact path = "/home/cuisines" component = {Cuisines}/>
      <Route exact path = "/home/cuisines/:id" component = {CuisineDetail}/>
    </BrowserRouter>
  );
}
export default App;
