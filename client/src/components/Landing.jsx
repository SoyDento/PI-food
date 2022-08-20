import React, { useEffect } from "react";
import logo from "../img/logo.png";
import "../styles/Home.css";
import {addQuote} from "../actions";
import { connect } from "react-redux";
import Spinner from './Spinner';

//import { useSelector } from "react-redux";

function Home(props) {
  //useSelector para traerse el estado.
  //const {quote} = useSelector((state)=>state)

  // También se puede usar esta alternativa
  //useSelector((state)=>state.quote)


  //useDispatch para llamar a las acciones
  // const dispatch = useDispatch();


  useEffect(()=>{
    //Forma de despachar la acción

    setTimeout(function(){
          props.addQuote();
          console.log("Here is the quote", props.quote);
      }, 2500);


  },[props])

  return (
    <div className="Home">
      <img src={logo} alt="" className="Home__logo" />
      <hr/>
      {
        props.quote ?
        <div>
          <h2>"{props.quote.quote}"</h2>
          <h3>{props.quote.author}</h3>
          <p>From: {props.quote.series}</p>
        </div>
        : <Spinner/>
      }
    </div>
  );
}


//Devolviendo un objeto, cuyo parámetro quote va a ser igual al quote del estado global
//Con connect ese objeto devuelto pasa a formar parte de las props

function mapStateToProps(state){
  return {
    ...state
  }
}


//Actions
function mapDispatchToProps(dispatch) {
  return {
    addQuote: () => dispatch(addQuote())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);
