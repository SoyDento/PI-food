import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useParams } from "react-router-dom";
import {emptyCharacterDetail, getCharacterDetail, changeAtrib} from "../actions";
import Spinner from './Spinner'
import "../styles/CharacterDetail.css";
import validateChg from '../Utils/validateChg.js';


export class CharacterDetail extends Component {

    constructor(props) { // console.log(props);
      super(props);
      this.state = {
        attribute: '',
        data: '',
        params: this.props.match.params.id
      };
      // this.paginated = this.paginated.bind(this);
      // this.ejectClose = this.ejectClose.bind(this);
    };

    componentDidMount(){
        this.props.emptyCharacterDetail();  // o poner esto en un desmonte de componente
        this.props.getCharacterDetail(this.state.params); // o this.props.match.params.id  como argumento
    };
    // componentWillUnmount(){
    //   this.props.emptyCharacterDetail();
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
        this.props.changeAtrib(this.state.attribute, this.props.characterDetail.char_id, this.state.data);
        console.log("dispacho en cambio de atributo");
      };
    };

    render() {
      return (
        <div className="CharacterDetail" key="character">
          <h1>Character Details</h1>
          {!this.props.characterDetail ?  <Spinner/> :
          <div key='detail'>

            <h3>{this.props.characterDetail.name}</h3>

            <img className="CharacterDetail__Photo" src={this.props.characterDetail.img} alt="" />

            <p>nickname: {this.props.characterDetail.nickname}</p>
            <p>birthday: {this.props.characterDetail.birthday}</p>
            <p>status: {this.props.characterDetail.status}</p>
            <div key='ocuppations'>
              <p>occupations: </p>
              <h5>
              {
                !this.props.characterDetail.occupation ? <Spinner/> :
                  this.props.characterDetail.occupation.map(o=> ' - ' + o + ' - ')
              }
              </h5>
            </div>

                    {
                      (!this.props.characterDetail.created_DB) ?  null :
                      <div className='change'>
                        <h3>modify character attributes</h3>

                        <form className='formChange'  onSubmit={(e)=>this.handleSubmit(e)}>
                          <select onChange={(e)=> this.handleSelect(e)}>
                            <option value='none'>none</option>
                            <option value='name'>name</option>
                            <option value='nickname'>nickname</option>
                            <option value='birthday'>birthday</option>
                            <option value='img'>img</option>
                            <option value='status'>status</option>
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

            <Link to="/characters">  <button>back to characters</button>  </Link>

          </div>

        }
        </div>
      );
    };
};


export const mapStateToProps = (state) => {
    return {
        characterDetail: state.characterDetail
    }
};

export const mapDispatchToProps = (dispatch) =>{
    return {
        emptyCharacterDetail: () => dispatch(emptyCharacterDetail()),
        getCharacterDetail: (id) => dispatch(getCharacterDetail(id)),
        changeAtrib: (attribute, id, valor)=> dispatch(changeAtrib(attribute, id, valor))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CharacterDetail);



// function CharacterDetail() {
//
//   const dispatch = useDispatch();
//   let characterDetail = useSelector(state=> state.characterDetail);
//   const {id} = useParams();
//   const [attribute, setAttribute] = React.useState('');
//   const [data, setData] = React.useState('');
//   //const id = match.params.id; // Alternativa
//   useEffect(()=>{
//     dispatch(emptyCharacterDetail());
//     dispatch(getCharacterDetail(id)) // getCharacterDetail(match.params.id)
//   },[id, dispatch]);
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
//       dispatch(changeAtrib(attribute, characterDetail.char_id, data));
//       console.log("dispacho en cambio de atributo");
//     };
//   }
//
//   return (
//     <div className="CharacterDetail" key="character">
//       <h1>Character Details</h1>
//       {!characterDetail ?  <Spinner/> :
//       <div key='detail'>
//
//         <h3>{characterDetail.name}</h3>
//
//         <img className="CharacterDetail__Photo" src={characterDetail.img} alt="" />
//
//         <p>nickname: {characterDetail.nickname}</p>
//         <p>birthday: {characterDetail.birthday}</p>
//         <p>status: {characterDetail.status}</p>
//         <div key='ocuppations'>
//           <p>occupations: </p>
//           <h5>
//           {
//             !characterDetail.occupation ? <Spinner/> :
//               characterDetail.occupation.map(o=> ' - ' + o + ' - ')
//           }
//           </h5>
//         </div>
//
//                 {
//                   (!characterDetail.created_DB) ?  null :
//                   <div className='change'>
//                     <h3>modify character attributes</h3>
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
//         <Link to="/characters">  <button>back to characters</button>  </Link>
//
//       </div>
//
//     }
//     </div>
//   );
// }
// export default CharacterDetail;
