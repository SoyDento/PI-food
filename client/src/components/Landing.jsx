import React, {Component} from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { getAllrecipes } from "../redux/actions";
import logo from "../img/logo.png";
import s from "../styles/Landing.module.css";


class Landing extends Component {

  componentDidMount(){
    this.props.getAllrecipes();      
  };
  
  render() {
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
};

export const mapDispatchToProps = (dispatch) =>{
  return {
      getAllrecipes: () => dispatch(getAllrecipes()),
  }
};

export default connect(null, mapDispatchToProps)(Landing);