import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
// import React, { useEffect } from "react";  // para funcional components
// import { useDispatch, useSelector } from "react-redux";  // para funcional components
// import { Link, useParams, useLocation } from "react-router-dom";  // para funcional components
import { emptyRecipeDetail, 
         getRecipeDetail, 
         changeAtrib,
         iliked, 
         removeRecipe } from "../redux/actions";
// import Spinner from './Spinner'
import s from "../styles/RecipeDetail.module.css";
import validateChg from '../Utils/validateChg.js';
import instructions from '../Utils/instructions';
import image from '../img/dedo.png';


export class RecipeDetail extends Component {

    constructor(props) { // console.log(props);
      super(props);
      this.state = {
        steps: '', 
        ingredients: '', 
        equipment: '',
        attribute: '',
        data: '',
        status: 'on',
        params: this.props.match.params.id,
        query: this.props.history.location.search.replace('?creat=',''),
        // query2: ()=>{
        //   let queryString = window.location.search;
        //   let urlParams = new URLSearchParams(queryString);
        //   let q = urlParams.get('creat');
        //   return q;
        // },
      };      
      // this.ejectClose = this.ejectClose.bind(this);
    };    
    componentDidMount(){
        this.props.emptyRecipeDetail();  // o poner esto en un desmonte de componente
        this.props.getRecipeDetail(this.state.params); // o this.props.match.params.id  como argumento
               console.log(Number(this.state.query));
              //  console.log(this.state.query2());
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
      if (this.state.attribute.length === 0) {
        alert(`Danger: did not select the attribute to modify. Select it !!!`);
      } else {
        let objError = validateChg({[this.state.attribute]: this.state.data});
        console.log(objError);
        if (objError.title || objError.healthScore || objError.veryHealthy || objError.image || objError.cheap) {
          alert(`Danger: ${ JSON.stringify(objError) } !!!`); // console.log(objError);
        } else {
          this.props.changeAtrib(this.state.attribute, this.props.recipeDetail.id, this.state.data);
          console.log("dispacho el cambio de atributo");
        };
      }
      
    };
    handleLike = () => {
      this.props.iliked();
      this.props.changeAtrib('aggregateLikes', this.props.recipeDetail.id, 1);
      this.setState({
        ...this.state,
        status: 'off',
      }); 
      console.log("se agrego un like a la receta");
    };
    handleRemove = (e)=> {
      // e.preventDefault();
      this.props.removeRecipe(e.target.value);
      this.props.emptyRecipeDetail();  // vacia recipeDetail 
    };
    // handleReturn = () => {
    //   history.push(`/home/recipes?data=${this.state.query()}`); // se usa para rederigir desde el código
    // };
    handleClick = () => {
      console.log(this.props.recipeDetail.analyzedInstructions);
      let { st, ing, equip } = instructions(this.props.recipeDetail.analyzedInstructions);
            this.setState({
              ...this.state,
              steps: st,
              ingredients: ing,
              equipment: equip,
            });              
      console.log(st); console.log(ing); console.log(equip);
      console.log(this.state);
    };



    render() {
      return (
        <div className={s.RecipeDetail} key="recipe">
          
          <div key='detail'>
          {!this.props.recipeDetail.hasOwnProperty('title')  ?  'the recipe was deleted' :          
          <>
            <div className={s.titleDetail}>{this.props.recipeDetail.title}</div>

            <img className={s.RecipeDetailPhoto} src={this.props.recipeDetail.image} alt="" />

            <p>
              ► Very Healthy: &nbsp;{this.props.recipeDetail.veryHealthy? 'yes':'no'} &nbsp;&nbsp;&nbsp;
              ► Cheap: &nbsp;{this.props.recipeDetail.cheap? 'yes':'no'} &nbsp;&nbsp;&nbsp;
              ► Likes: &nbsp;{this.props.recipeDetail.aggregateLikes}   
            </p>
            <p>
              ► Ready In Minutes: &nbsp;{this.props.recipeDetail.readyInMinutes} &nbsp;&nbsp;&nbsp;
              ► Servings: &nbsp;{this.props.recipeDetail.servings} &nbsp;people&nbsp;&nbsp;
              ► Health Score: &nbsp;{this.props.recipeDetail.healthScore}                         
            </p>
            {
              (this.state.status === 'off') ? null :
              <div className={s.likeContainer}>
                <div className={`${s.likeCnt} ${s.unchecked} `} >
                  <img src={image} height="50px" alt=""/>
                  <i className={`${s.likeBtn} ${s.materialIcons}`}>
                    <input  className={`${s.unchecked} ${s.likeBtn}`}
                                    value="LIKE"
                                    onClick={()=> this.handleLike()}
                                    type="button"/>
                  </i>
                </div>
            </div>
            }            
            <div key='diets'>
              <p>diets: </p>
              <h3>
              {
                !this.props.recipeDetail.diets ? null :
                  this.props.recipeDetail.diets.map(o=> ' - ' + o + ' - ')
              }
              </h3>
            </div>
            <div key='cuisines'>
              <p>cuisines: </p>
              <h3>
              {
                !this.props.recipeDetail.cuisines ? null :
                  this.props.recipeDetail.cuisines.map(o=> ' - ' + o + ' - ')
              }
              </h3>
            </div>
            <div key='dishTypes'>
              <p>dish types: </p>
              <h3>
              {
                !this.props.recipeDetail.dishTypes ? null :
                  this.props.recipeDetail.dishTypes.map(o=> ' - ' + o + ' - ')
              }
              </h3>
            </div>
            <br/>
            <div>
                    {
                      ( Number(this.state.query) !== 0 ) ?  null :
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
            <div className={s.buttonExtend}>
            {
              (this.state.steps.length > 1) ?  null :
              <button className={s.button} onClick={()=> this.handleClick()}>wanna expand your recipe ?</button>            
            }
            </div>        
            {
              (!this.state.steps) ? <div>still no steps</div>              
              :
              <div className={s.abstract}>
                <div className='instructions'>
                  <h3>INSTRUCTIONS</h3>
                  <div>
                  {
                    (!this.state.steps) ? null :
                    this.state.steps.map((e, index)=> 
                    <div key={index}>
                      <div key={index}>Step {index+1}: {e} </div> 
                      <br/>
                    </div>
                    )
                  }
                  </div>
                </div>
                <div className='ingredients'>
                  <h3>Ingredients:</h3>
                  <h4 key='ingredients'>
                  {
                    (!this.state.ingredients) ? 'still no ingredients'  :
                    this.state.ingredients.map( (e)=> ' ' + e + ',' )
                  }
                  </h4>
                </div>
                <div className='equipment'>
                  <h3>Equipment:</h3>
                  <div>
                  {
                    (!this.state.equipment) ? <div>still no equipment</div>  :
                    this.state.equipment.map((e, index)=> <div key={index}> {index+1}: {e} </div> )
                  }
                  </div>
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
              (Number(this.state.query) !== 0) ?  null :
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
        iliked: () => dispatch(iliked()),
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
//           <h3>
//           {
//             !recipeDetail.diets ? <Spinner/> :
//               recipeDetail.diets.map(o=> ' - ' + o + ' - ')
//           }
//           </h3>
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
