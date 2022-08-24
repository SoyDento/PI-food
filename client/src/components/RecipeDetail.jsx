import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useParams, useLocation } from "react-router-dom";
import { emptyRecipeDetail, getRecipeDetail, changeAtrib } from "../actions";
import Spinner from './Spinner'
import s from "../styles/RecipeDetail.module.css";
import validateChg from '../Utils/validateChg.js';
import instructions from '../Utils/instructions';


export class RecipeDetail extends Component {

    constructor(props) { // console.log(props);
      super(props);
      this.state = {
        steps: '', 
        ingredients: '', 
        equipment: '',
        attribute: '',
        data: '',
        params: this.props.match.params.id,
        query: ()=>{
          let queryString = window.location.search;
          let urlParams = new URLSearchParams(queryString);
          let q = urlParams.get('creat');
          return q;
        },
      };      
      // this.ejectClose = this.ejectClose.bind(this);
    };
    
    

    componentDidMount(){
        this.props.emptyRecipeDetail();  // o poner esto en un desmonte de componente
        this.props.getRecipeDetail(this.state.params, this.state.query()); // o this.props.match.params.id  como argumento
        
        setTimeout(function(){
                   
          let { st, ing, equip } = instructions(this.props.recipeDetail.analyzedInstructions);
          this.setState({
            ...this.state,
            steps: st
          });  
          this.setState({
            ...this.state,
            ingredients: ing
          });  
          this.setState({
            ...this.state,
            equipment: equip
          });  


        }, 3500);
        
        
    };
    // componentWillUnmount(){
    //   this.props.emptyRecipeDetail();
    // }
    handleChange = (e) => {
      e.preventDefault();  // console.log(e.target.value);
      this.setState({
        ...this.state,
        data: e.target.value});
    };
    handleSelect = (e) => {
      e.preventDefault();  // console.log(e.target.value);
      this.setState({
        ...this.state,
        attribute: e.target.value})
    };
    handleSubmit = (e)=> {
      // e.preventDefault();
      // console.log(attribute);  console.log(data);
      let objError = validateChg({[this.state.attribute]: this.state.data});
      if (objError.name || objError.nickname || objError.birthday || objError.img || objError.status ) {
        alert(`Danger: ${ JSON.stringify(objError) } !!!`); // console.log(objError);
      } else {
        this.props.changeAtrib(this.state.attribute, this.props.recipeDetail.id, this.state.data);
        console.log("dispacho el cambio de atributo");
      };
    };
    handleLike = () => {
      this.props.changeAtrib('aggregateLikes', this.props.recipeDetail.id, 1);
        console.log("se agrego un like a la receta");
    };

    render() {
      return (
        <div className={s.RecipeDetail} key="recipe">
          <h1>Character Details</h1>
          <div key='detail'>
          {!this.props.recipeDetail ?  <Spinner/> :          
          <>
            <h3>{this.props.recipeDetail.title}</h3>

            <img className={s.RecipeDetailPhoto} src={this.props.recipeDetail.image} alt="" />

            <p>
              ► Very Healthy: {this.props.recipeDetail.veryHealthy}
              ► Cheap: {this.props.recipeDetail.cheap}
              ► Health Score: {this.props.recipeDetail.healthScore}
            </p>
            <p>
              ► Ready In Minutes: {this.props.recipeDetail.readyInMinutes}
              ► Servings: {this.props.recipeDetail.servings}
              ► Likes: {this.props.recipeDetail.aggregateLikes}              
            </p>
            <div class={s.likeContainer}>
                <div class={`${s.likeCnt} ${s.unchecked} ${s.button}`} id={s.likeCnt}>
                  <i class={`${s.likeBtn} ${s.materialIcons}`}>Likes
                    <input
                                    value="LIKE"
                                    onClick={()=> this.handleLike()}
                                    type="button"/>
                  </i>
                </div>
            </div>
            <div key='diets'>
              <p>diets: </p>
              <h5>
              {
                !this.props.recipeDetail.diets ? null :
                  this.props.recipeDetail.diets.map(o=> ' - ' + o + ' - ')
              }
              </h5>
            </div>
            <div key='cuisines'>
              <p>cuisines: </p>
              <h5>
              {
                !this.props.recipeDetail.cuisines ? null :
                  this.props.recipeDetail.cuisines.map(o=> ' - ' + o + ' - ')
              }
              </h5>
            </div>
            <div key='dishTypes'>
              <p>dish types: </p>
              <h5>
              {
                !this.props.recipeDetail.dishTypes ? null :
                  this.props.recipeDetail.dishTypes.map(o=> ' - ' + o + ' - ')
              }
              </h5>
            </div>
            <div>
                    {
                      (!this.props.recipeDetail.created_DB) ?  null :
                      <div className='change'>
                        <h3>modify recipe attributes</h3>

                        <form className={s.formChange}  onSubmit={(e)=>this.handleSubmit(e)}>
                          <select onChange={(e)=> this.handleSelect(e)}>
                            <option value='none'>none</option>
                            <option value='title'>name</option>
                            <option value='image'>image</option>
                            <option value='veryHealthy'>veryHealthy</option>
                            <option value='cheap'>cheap</option>
                            <option value='healthScore'>healthScore</option>
                          </select >
                          <input
                                  name="data"
                                  onChange={(e)=> this.handleChange(e)}
                                  autoComplete="off"
                                  placeholder='enter the new data here'
                                  type="text"/>
                          <button type="submit">change</button>
                        </form>
                      </div>
                    }                    
            </div>
            <div className='instructions'>
              <h5>INSTRUCTIONS</h5>
              <ul>
              {
                (!this.state.steps) ? <Spinner/> :
                this.state.steps.map((e, index)=> <li>Step {index}: {e} </li> )
              }
              </ul>
            </div>
            <div className='ingredients'>
              <h5>Ingredients:</h5>
              <ul>
              {
                (!this.state.ingredients) ? <Spinner/> :
                this.state.ingredients.map((e, index)=> <li> {index}: {e} </li> )
              }
              </ul>
            </div>
            <div className='equipment'>
              <h5>Equipment:</h5>
              <ul>
              {
                (!this.state.equipment) ? <Spinner/> :
                this.state.equipment.map((e, index)=> <li> {index}: {e} </li> )
              }
              </ul>
            </div>
            <div>
              <p>
                ► credits: {this.props.recipeDetail.creditsText}
                ► Link: {this.props.recipeDetail.sourceUrl}
              </p>
            </div>

            <div>
              <Link to="/home/recipes">  <button>back to recipes</button>  </Link>
            </div>
          </>       
          }
          </div>
        </div>
      );
    };
};


export const mapStateToProps = (state) => {
    return {
        recipeDetail: state.recipeDetail
    }
};

export const mapDispatchToProps = (dispatch) =>{
    return {
        emptyRecipeDetail: () => dispatch(emptyRecipeDetail()),
        getRecipeDetail: (id) => dispatch(getRecipeDetail(id)),
        changeAtrib: (attribute, id, valor)=> dispatch(changeAtrib(attribute, id, valor))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetail);



// function RecipeDetail() {
//
//   const dispatch = useDispatch();
//   let recipeDetail = useSelector(state=> state.recipeDetail);
//   const {id} = useParams();
//   const {search} = useLocation();
//   const [attribute, setAttribute] = React.useState('');
//   const [data, setData] = React.useState('');
//   //const id = match.params.id; // Alternativa
//   useEffect(()=>{
//     dispatch(emptyRecipeDetail());
//     dispatch(getRecipeDetail(id, search)) // getRecipeDetail(match.params.id)
//   },[id, search, dispatch]);
//
//   const handleChange = (e) => {
//     e.preventDefault();  // console.log(e.target.value);
//     setData(e.target.value);
//   };
//   const handleSelect = (e) => {
//     e.preventDefault();  // console.log(e.target.value);
//     setAttribute(e.target.value)
//   }
//   const handleSubmit = (e)=> {
//     // e.preventDefault();
//     // console.log(attribute);  console.log(data);
//     let objError = validateChg({[attribute]: data});
//     if (objError.name || objError.nickname || objError.birthday || objError.img || objError.status ) {
//       alert(`Danger: ${ JSON.stringify(objError) } !!!`); // console.log(objError);
//     } else {
//       dispatch(changeAtrib(attribute, recipeDetail.id, data));
//       console.log("dispacho en cambio de atributo");
//     };
//   }
//
//   return (
//     <div className="RecipeDetail" key="recipe">
//       <h1>Character Details</h1>
//       {!recipeDetail ?  <Spinner/> :
//       <div key='detail'>
//
//         <h3>{recipeDetail.name}</h3>
//
//         <img className="RecipeDetail__Photo" src={recipeDetail.img} alt="" />
//
//         <p>nickname: {recipeDetail.nickname}</p>
//         <p>birthday: {recipeDetail.birthday}</p>
//         <p>status: {recipeDetail.status}</p>
//         <div key='ocuppations'>
//           <p>dietss: </p>
//           <h5>
//           {
//             !recipeDetail.diets ? <Spinner/> :
//               recipeDetail.diets.map(o=> ' - ' + o + ' - ')
//           }
//           </h5>
//         </div>
//
//                 {
//                   (!recipeDetail.created_DB) ?  null :
//                   <div className='change'>
//                     <h3>modify recipe attributes</h3>
//
//                     <form className='formChange'  onSubmit={(e)=>handleSubmit(e)}>
//                       <select onChange={(e)=> handleSelect(e)}>
//                         <option value='none'>none</option>
//                         <option value='name'>name</option>
//                         <option value='nickname'>nickname</option>
//                         <option value='birthday'>birthday</option>
//                         <option value='img'>img</option>
//                         <option value='status'>status</option>
//                       </select >
//                       <input
//                               name="data"
//                               onChange={(e)=>handleChange(e)}
//                               autoComplete="off"
//                               placeholder='enter the new data here'
//                               type="text"/>
//                       <button type="submit">change</button>
//                     </form>
//                   </div>
//                 }
//
//         <Link to="/recipes">  <button>back to recipes</button>  </Link>
//
//       </div>
//
//     }
//     </div>
//   );
// }
// export default RecipeDetail;
