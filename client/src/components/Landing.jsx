import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/logo.png";
import s from "../styles/Landing.module.css";


function Landing(props) {
  
  return (
    <div className={s.Landing}>
      <img src={logo} alt="" className={s.LandingLogo} width="600px" />
      <br/>
      <Link  to="/home/recipes">
                  <div className={`${s.ac}`}>
                    <div className={`${s.arrowContainer}`}>
                        <div className={`${s.arrow}`}></div>
                        <div className={`${s.arrow}`}></div>
                        <div className={`${s.arrow}`}></div>
                    </div>
                  </div>
       </Link>
    </div>
  );
}


export default Landing;
