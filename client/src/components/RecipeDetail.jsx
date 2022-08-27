import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
// import React, { useEffect } from "react";  // para funcional components
// import { useDispatch, useSelector } from "react-redux";  // para funcional components
// import { Link, useParams, useLocation } from "react-router-dom";  // para funcional components
import { emptyRecipeDetail, 
         getRecipeDetail, 
         changeAtrib, 
         removeRecipe } from "../redux/actions";
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
        // query: ()=>{
        //   let queryString = window.location.search;
        //   let urlParams = new URLSearchParams(queryString);
        //   let q = urlParams.get('creat');
        //   console.log(q);
        //   return q;
        // },
      };      
      // this.ejectClose = this.ejectClose.bind(this);
    };
    
    componentDidMount(){
        this.props.emptyRecipeDetail();  // o poner esto en un desmonte de componente
        this.props.getRecipeDetail(this.state.params); // o this.props.match.params.id  como argumento
        
        setTimeout(function(){   
          // console.log(this.props.recipeDetail.title);
          // if (this.props.recipeDetail.analyzedInstructions) {
          //   let { st, ing, equip } = instructions(this.props.recipeDetail.analyzedInstructions);
          //   this.setState({
          //     ...this.state,
          //     steps: st
          //   });  
          //   this.setState({
          //     ...this.state,
          //     ingredients: ing
          //   });  
          //   this.setState({
          //     ...this.state,
          //     equipment: equip
          //   });
          // };           

        }, 15500);        
        
    };
    // componentDidUpdate(){
    //   this.props.getRecipeDetail(this.state.params);
    // }
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
    handleRemove = (e)=> {
      e.preventDefault();
      this.props.removeRecipe(e.target.value);
    };
    // handleReturn = () => {
    //   history.push(`/home/recipes?data=${this.state.query()}`); // se usa para rederigir desde el código
    // };
    handleClick = () => {
      console.log(this.props.recipeDetail.analyzedInstructions);
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
      console.log(st); console.log(ing); console.log(equip);
      console.log(this.state);
    };



    render() {
      return (
        <div className={s.RecipeDetail} key="recipe">
          <h1>Recipe Details</h1>
          <div key='detail'>
          {!this.props.recipeDetail ?  <Spinner/> :          
          <>
            <h3>{this.props.recipeDetail.title}</h3>

            <img className={s.RecipeDetailPhoto} src={this.props.recipeDetail.image} alt="" />

            <p>
              ► Very Healthy: &nbsp;{this.props.recipeDetail.veryHealthy? 'yes':'no'} &nbsp;&nbsp;&nbsp;
              ► Cheap: &nbsp;{this.props.recipeDetail.cheap? 'yes':'no'} &nbsp;&nbsp;&nbsp;
              ► Health Score: &nbsp;{this.props.recipeDetail.healthScore}
            </p>
            <p>
              ► Ready In Minutes: &nbsp;{this.props.recipeDetail.readyInMinutes} &nbsp;&nbsp;&nbsp;
              ► Servings: &nbsp;{this.props.recipeDetail.servings} &nbsp;people&nbsp;&nbsp;
              ► Likes: &nbsp;{this.props.recipeDetail.aggregateLikes}              
            </p>
            <div className={s.likeContainer}>
                <div className={`${s.likeCnt} ${s.unchecked} ${s.button}`} id={s.likeCnt}>
                  <i className={`${s.likeBtn} ${s.materialIcons}`}>Likes
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
            {
              (!this.props.recipeDetail.analyzedInstructions) ? null  :
              <button className={s.button} onClick={()=> this.handleClick()}>expand your recipe ???</button>
            }
            
            {
              (!this.state.steps) ? null               
              :
              <div className={s.abstract}>
                <div className='instructions'>
                  <h5>INSTRUCTIONS</h5>
                  <ul>
                  {
                    (!this.state.steps) ? null :
                    this.state.steps.map((e, index)=> <li>Step {index}: {e} </li> )
                  }
                  </ul>
                </div>
                <div className='ingredients'>
                  <h5>Ingredients:</h5>
                  <ul>
                  {
                    (!this.state.ingredients) ? null :
                    this.state.ingredients.map((e, index)=> <li> {index}: {e} </li> )
                  }
                  </ul>
                </div>
                <div className='equipment'>
                  <h5>Equipment:</h5>
                  <ul>
                  {
                    (!this.state.equipment) ? null :
                    this.state.equipment.map((e, index)=> <li> {index}: {e} </li> )
                  }
                  </ul>
                </div>
              </div>
            }
            <div>
              <p>
                ► credits:&nbsp; {this.props.recipeDetail.creditsText === null? 'none': this.props.recipeDetail.creditsText }  &nbsp;&nbsp;&nbsp;
                ► Link: <a href={this.props.recipeDetail.sourceUrl}> {this.props.recipeDetail.sourceUrl} </a> 
              </p>
            </div>
           
            <div>
            <div className={s.esp}>
              
            </div>
            {
              (!this.props.recipeDetail.created_DB) ?  null :
              <>
                <button 
                    className={s.danger} 
                    value={this.props.recipeDetail.id} 
                    onClick={(e)=>this.handleRemove(e)}>
                  delete recipe
                </button>  &nbsp;&nbsp;&nbsp;
              </>
            }              
              <Link to="/home/recipes">  <button>back to recipes</button>  </Link>
              <Link to="/home/search">  <button>perform a search</button>  </Link>
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
        changeAtrib: (attribute, id, valor)=> dispatch(changeAtrib(attribute, id, valor)),
        removeRecipe: (id) => dispatch(removeRecipe(id)),
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
