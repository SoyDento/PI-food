import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";  //  , useParams
import {emptyEpisodeDetail, getEpisodeDetail} from "../actions";
// import {connect} from "react-redux";
import Spinner from './Spinner'
import "../styles/EpisodeDetail.css";

function EpisodeDetail(props) {

  const dispatch = useDispatch();
  let episodeDetail = useSelector(state=> state.episodeDetail);
  // const {id} = useParams();
  const id = props.match.params.id

  useEffect(()=>{
    dispatch(emptyEpisodeDetail())
    dispatch(getEpisodeDetail(id))
  },[id, dispatch])
  /*
    PISTA: podemos obtener lo que llegue por parametros con el hook useParams.
    Que hace useParams? https://reactrouter.com/web/example/url-params
    */

  return (
    <div className="EpisodeDetail-Container" key='episode'>
      <h1>Episode Details</h1>
      {
      !episodeDetail ?  <Spinner/>  :
        <div className="EpisodeDetail-Data">

          <h2>{episodeDetail.title}</h2>
          <h3>Episode: {episodeDetail.episode}</h3>
          <h3>Season: {episodeDetail.season}</h3>
          <h3>Series: {episodeDetail.series}</h3>
          <h3>Aired: {episodeDetail.air_date}</h3>
          <h3>Characters: </h3>
          <ul>
          {
              episodeDetail.characters && episodeDetail.characters.map((character, index) =>
              <li key={index}>{character}</li>)
          }
          </ul>
        </div>
    }
    <Link to="/episodes">  <button>back to episodes</button>  </Link>
    <br/>
    </div>
  );
}
export default EpisodeDetail;

// function mapStateToProps(state){
//   return {
//     ...state
//   }
// }
//
//
// function mapDispatchToProps(dispatch) {
//   return {
//     emptyEpisodeDetail:() => dispatch(emptyEpisodeDetail()),
//     getEpisodeDetail: (id) => dispatch(getEpisodeDetail(id))
//   }
// }
//
// export default connect(mapStateToProps,mapDispatchToProps)(EpisodeDetail);
