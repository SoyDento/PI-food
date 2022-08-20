import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import {getEpisodes} from '../actions';
import s from "../styles/Episodes.module.css";
// import Spinner from "./Spinner";

function Episodes(props) {

  let allEpisodes = useSelector(state=> state.episodes);
  const dispatch = useDispatch();
  let [episodes, setEpisodes] = React.useState([]);

  useEffect(()=>{
    dispatch(getEpisodes())
  },[dispatch]);


  function orderEpisodes(ep, ss) {
    let arr = ss.split('');  console.log(arr);
    let s = arr.shift(); console.log(s);
    let ser = arr.join(''); console.log(ser);
    return ep.filter(e=> e.season === s && e.series === ser)
  };

  const handleClick = (e) => {
    e.preventDefault();
    let segm = orderEpisodes(allEpisodes, e.target.value);
    setEpisodes(segm);
  }

  return (
    <div className={s.Episodes}>
      <div className={s.boxFlex}>
        <h5>Total number of episodes:  102</h5>
        <h5>Number of seasons:  5</h5>
        <h5>Number of characters:  61</h5>
      </div>
      <div className={s.containnn}>
        <div className={s.line}></div>
        <div className={s.title}> <h1>Breaking Bad</h1> </div>
        <div className={s.boxFlex}>
          <div className={s.but}>
            <button value="1Breaking Bad" onClick={(e)=>handleClick(e)}>Season 1</button>
          </div>
          <div className={s.but}>
            <button value="2Breaking Bad" onClick={(e)=>handleClick(e)}>Season 2</button>
          </div>
          <div className={s.but}>
            <button value="3Breaking Bad" onClick={(e)=>handleClick(e)}>Season 3</button>
          </div>
          <div className={s.but}>
            <button value="4Breaking Bad" onClick={(e)=>handleClick(e)}>Season 4</button>
          </div>
          <div className={s.but}>
            <button value="5Breaking Bad" onClick={(e)=>handleClick(e)}>Season 5</button>
          </div>
        </div>
        <div className={s.line}></div>
        <div className={s.title}> <h1>Better Call Saul</h1> </div>
        <div className={s.boxFlex}>
          <div className={s.but}>
            <button value="1Better Call Saul" onClick={(e)=>handleClick(e)}>Season 1</button>
          </div>
          <div className={s.but}>
            <button value="2Better Call Saul" onClick={(e)=>handleClick(e)}>Season 2</button>
          </div>
          <div className={s.but}>
            <button value="3Better Call Saul" onClick={(e)=>handleClick(e)}>Season 3</button>
          </div>
          <div className={s.but}>
            <button value="4Better Call Saul" onClick={(e)=>handleClick(e)}>Season 4</button>
          </div>
        </div>
        <div className={s.line}></div>
        <div className={s.title}> <h1>Episodes List</h1> </div>
        <ul className={s.Episodes__list}>
          {
            episodes.length < 1  ? null :
            <h3>Tap the episode for more details</h3>
          }
          {
          episodes.length < 1  ? 'tap the session button to watch your episodes' :
          episodes.map((episode, index)=>{
            if(episode.series){
              return (
                <li className={s.items} key={index}>
                  <Link key={index} to={`/episodes/${episode.episode_id}`}>
                    {`${episode.episode} - ${episode.title}`}
                  </Link>
                </li>
              )
            };
            return (<li> error </li>)
          })
          }
        </ul>

      </div>
    </div>
  );
};
export default Episodes;

// //===========================================//
//
// function mapStateToProps(state){
//   return {
//     ...state
//   }
// }
//
//
// //Actions
// function mapDispatchToProps(dispatch) {
//   return {
//     getEpisodes: () => dispatch(getEpisodes())
//   }
// }
//
// //===========================================//
//
// export default connect (mapStateToProps,mapDispatchToProps)(Episodes);
