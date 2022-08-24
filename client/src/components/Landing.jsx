import React from "react";
import logo from "../img/logo.png";
import s from "../styles/Landing.module.css";


function Landing(props) {
  
  return (
    <div className={s.Landing}>
      <img src={logo} alt="" className={s.Landing__logo} />
      <hr/>
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
