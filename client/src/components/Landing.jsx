import React from "react";
import logo from "../img/logo.png";
import s from "../styles/Home.module.css";


function Home(props) {
  
  return (
    <div className={s.Home}>
      <img src={logo} alt="" className={s.Home__logo} />
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


export default Home;
