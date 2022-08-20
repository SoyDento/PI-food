// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import validate from '../Utils/validateErr.js';
// import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import validate from '../Utils/validate.js';
import { useHistory } from 'react-router-dom';
import { postCharacters, getOccupations } from '../actions';
import s from '../styles/CreateChar.module.css';


// export class CreateChar extends Component {
//
//     constructor(props) {
//       super(props);
//       this.state = {
//         name:'',
//         nickname:'',
//         birthday:'',
//         img:'',
//         status:'',
//         occupations: [],
//         nameErr:'',
//         nicknameErr:'',
//         birthdayErr:'',
//         imgErr:'',
//         statusErr:'',
//         occupationsErr: ''
//       };
//       // this.ejectClose = this.ejectClose.bind(this);
//     };
//
//     componentDidMount(){
//         this.props.getOccupations();
//     };
//
//      handleChange = (e)=>{
//       this.setState({
//           ...this.state,
//           [e.target.name]: e.target.value,
//         });
//       let err =  validate(this.state)
//       this.setState({
//             ...this.state,
//             ...err
//           });
//     };
//      handleCheck = (e)=>{
//       e.preventDefault();
//       this.setState({
//         ...this.state,
//         status: e.target.value
//       });
//       let err =  validate(this.state)
//       this.setState({
//             ...this.state,
//             ...err
//           });
//     };
//      handleSelect = (e)=>{
//       e.preventDefault();
//       if (!this.state.occupations.includes(e.target.value)) {
//         this.setState({
//           ...this.state,
//           occupations: [...this.state.occupations, e.target.value]
//         });
//       };
//       let err =  validate(this.state)
//       this.setState({
//             ...this.state,
//             ...err
//           });
//     };
//      handleDelete = (e)=>{
//       this.setState({
//         ...this.state,
//         occupations: this.state.occupations.filter( (o)=> o !== e.target.value)
//       });
//       let err =  validate(this.state)
//       this.setState({
//             ...this.state,
//             ...err
//           });
//     };
//      resetStatus = ()=>{
//       this.setState({
//         ...this.state,
//         status: ''
//       });
//       let err =  validate(this.state)
//       this.setState({
//             ...this.state,
//             ...err
//           });
//     };
//      handleSubmit = (e)=>{
//       e.preventDefault();
//       if (this.state.nameErr || this.state.nicknameErr || this.state.birthdayErr || this.state.imgErr || this.state.statusErr || this.state.occupationsErr ) {
//         alert('Danger: review the data. this.state were found !!!')
//       } else {
//         let char = {
//           name: this.state.name,
//           nickname: this.state.nickname,
//           birthday: this.state.birthday,
//           img: this.state.img,
//           status: this.state.status,
//           occupations: this.state.occupations,
//         }
//         this.props.postCharacters(char);
//         alert('characters created');
//         this.setState({ name:'', nickname:'', birthday:'', img:'', status:'', occupations: [] });
//
//         };
//     };
//      checking = ()=>{
//       setTimeout(function(){
//         let err =  validate(this.state)
//         this.setState({
//               ...this.state,
//               ...err
//             });
//       }, 2000);
//       alert('Advance. If the "add character" button appears, click it. Otherwise check the data, correct if necessary and check again.')
//     };
//
//     render() {
//       return (
//         <div className={s.bakg}>
//           <div className={`${s.cont2}`}>
//             <div className={`${s.bannerText}`} key='bt'>create new character</div>
//           </div>
//           <form className={`${s.cards}`} onSubmit={(e)=>this.handleSubmit(e)}>
//
//               <div className={s.cont3}>
//
//                 <div className={`${s.inpt}`} key='n'> Name: |
//                   <input
//                           name="name" value={this.state.name}
//                           onChange={(e)=>this.handleChange(e)}
//                           className={this.state.nameErr?`${s.dangerInp}`:`${s.validInp}`}
//                           autoComplete="off"
//                           type="text"/>
//                   <div className={this.state.nameErr?`${s.danger}`:`${s.valid}`}>
//                     {this.state.nameErr || 'valid data'}
//                   </div>
//                 </div>
//
//                 <div className={s.inpt} key='a'> Nickname: |
//                   <input
//                           name="nickname" value={this.state.nickname}
//                           onChange={(e)=>this.handleChange(e)}
//                           className={this.state.nicknameErr?`${s.dangerInp}`:`${s.validInp}`}
//                           autoComplete="off"
//                           type="text"/>
//                   <div className={this.state.nicknameErr?`${s.danger}`:`${s.valid}`}>
//                     {this.state.nicknameErr || 'valid data'}
//                   </div>
//                 </div>
//
//                 <div className={s.inpt} key='b'> Birthday: |
//                   <input
//                           name="birthday" value={this.state.birthday}
//                           onChange={(e)=>this.handleChange(e)}
//                           className={this.state.birthdayErr?`${s.dangerInp}`:`${s.validInp}`}
//                           autoComplete="off"
//                           type="text"/>  (DD-MM-YYYY)
//                   <div className={this.state.birthdayErr?`${s.danger}`:`${s.valid}`}>
//                     {this.state.birthdayErr || 'valid data'}
//                   </div>
//                 </div>
//
//                 <div className={`${s.inpt}`} key='i'> Image: |
//                             <input
//                                   name="img" value={this.state.img}
//                                   onChange={(e)=>this.handleChange(e)}
//                                   className={this.state.imgErr?`${s.dangerInp}`:`${s.validInp}`}
//                                   autoComplete="off"
//                                   type="text"  />
//                   <div className={this.state.imgErr?`${s.danger}`:`${s.valid}`}>
//                     {this.state.imgErr || 'valid data'}
//                   </div>
//                 </div>
//
//             </div>
//
//             <div className={s.cont4}>
//               {
//                 (this.state.nameErr || this.state.nicknameErr || this.state.birthdayErr || this.state.imgErr || this.state.statusErr || this.state.occupationsErr ) ?
//
//                   <button onClick={()=>this.checking()}>pre-this.state checking</button>
//                   :
//                   <div className={s.inpt} key='s'>
//                     <button type="submit">Add Character</button>
//                   </div>
//               }
//               {/*<div className={`${s.inpt}`}>
//                 <this.state type="reset" value="restore form"/>
//               </div>*/}
//             </div>
//
//           </form>
//
//           <select onChange={(e)=> this.handleSelect(e)}>
//             {
//               this.props.occupationsStore.map(o=> <option key={`s${o.id}`} value={o.name}> {o.name} </option>)
//             }
//           </select >
//           { this.state.occupations.length === 0 ? null :
//             this.state.occupations.map( (el, index) => {
//               return (
//             <div className={s.dsdfd} key={`o${index}`}>
//               <p>{el}</p>
//               <button  value={el} onClick={(e)=>this.handleDelete(e)}>X</button>
//             </div>)})
//           }
//           <div className={this.state.occupationsErr?`${s.danger}`:`${s.valid}`}>
//             {this.state.occupationsErr || 'valid data'}
//           </div>
//
//           <div className={`${s.inpt}`} key='s'> Status: |
//               { (this.state.statusErr !== '') ?
//                   <button  onClick={()=>this.resetStatus()}>Restart Options</button>
//
//                   :
//
//                   <div>
//                       <label key="Ali"><input
//                           name="Alive"  value="Alive"
//                           onChange={(e)=>this.handleCheck(e)}
//                           type="checkbox"/>Alive</label>
//                       <label key="Des"><input
//                           name="Deseased"  value="Deseased"
//                           onChange={(e)=>this.handleCheck(e)}
//                           type="checkbox"/>Deseased</label>
//                       <label key='Unk'><input
//                           name='Unknown'  value='Unknown'
//                           onChange={(e)=>this.handleCheck(e)}
//                           type="checkbox"/>Unknown</label>
//                       <label key="Pres"><input
//                           name='Presumed dead' value='Presumed dead'
//                           onChange={(e)=>this.handleCheck(e)}
//                           type="checkbox"/>Presumed dead</label>
//                   </div>
//               }
//
//             <div className={this.state.statusErr?`${s.danger}`:`${s.valid}`}>
//               {this.state.statusErr || 'valid data'}
//             </div>
//         </div>
//         <Link to="/characters">  <button>back to characters</button>  </Link>
//       </div>
//       )
//     }
//
// };
//
// export const mapStateToProps = (state) => {
//     return {
//         occupationsStore: state.occupations
//     }
// };
//
// export const mapDispatchToProps = (dispatch) =>{
//     return {
//         getOccupations: () => dispatch(getOccupations()),
//         postCharacters: (ch)=> dispatch(postCharacters(ch))
//     }
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(CreateChar);



export default function CreateChar () {

  const dispatch = useDispatch();
  const occupationsStore = useSelector((state)=>state.occupations);
  const history = useHistory();

  const [input, setInput] = useState({
    name:'',
    nickname:'',
    birthday:'',
    img:'',
    status:'',
    occupations: []
  });
  const [error, setError] = useState({
    name:'', nickname:'', birthday:'', img:'', status:'', occupations:''
  });

  useEffect(()=>{
    dispatch(getOccupations());
  },[dispatch]);

  function handleChange(e) {
    setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    setError(validate(input));
  };
  function handleCheck (e) {
    e.preventDefault();
    setInput({
      ...input,
      status: e.target.value
    });
    setError(validate(input));
  };
  function handleSelect (e) {
    e.preventDefault();
    if (!input.occupations.includes(e.target.value)) {
      setInput({
        ...input,
        occupations: [...input.occupations, e.target.value]
      });
    };
    setError(validate(input));
  };
  function handleDelete(e) {
    setInput({
      ...input,
      occupations: input.occupations.filter( (o)=> o !== e.target.value)
    });
    setError(validate(input));
  };
  function resetStatus() {
    setInput({
      ...input,
      status: ''
    });
    setError(validate(input));
  };
  function handleSubmit (e) {
    e.preventDefault();
    if (error.name || error.nickname || error.birthday || error.img || error.status || error.occupations ) {
      alert('Danger: review the data. Errors were found !!!')
    } else {
      dispatch(postCharacters(input));
      alert('characters created');
      setInput({ name:'', nickname:'', birthday:'', img:'', status:'', occupations: [] });
      history.push('/characters'); // se usa para rederigir desde el código
    };
  };
  function checking(){
    setTimeout(function(){
        setError(validate(input));
    }, 2000);
    alert('Advance. If the "add character" button appears, click it. Otherwise check the data, correct if necessary and check again.')
  };

  return(
    <div className={s.bakg}>
      <div className={`${s.cont2}`}>
        <div className={`${s.bannerText}`} key='bt'>create new character</div>
      </div>
      <form className={`${s.cards}`} onSubmit={(e)=>handleSubmit(e)}>

          <div className={s.cont3}>

            <div className={`${s.inpt}`} key='n'> Name: |
              <input
                      name="name" value={input.name}
                      onChange={(e)=>handleChange(e)}
                      className={error.name?`${s.dangerInp}`:`${s.validInp}`}
                      autoComplete="off"
                      type="text"/>
              <div className={error.name?`${s.danger}`:`${s.valid}`}>
                {error.name || 'valid data'}
              </div>
            </div>

            <div className={s.inpt} key='a'> Nickname: |
              <input
                      name="nickname" value={input.nickname}
                      onChange={(e)=>handleChange(e)}
                      className={error.nickname?`${s.dangerInp}`:`${s.validInp}`}
                      autoComplete="off"
                      type="text"/>
              <div className={error.nickname?`${s.danger}`:`${s.valid}`}>
                {error.nickname || 'valid data'}
              </div>
            </div>

            <div className={s.inpt} key='b'> Birthday: |
              <input
                      name="birthday" value={input.birthday}
                      onChange={(e)=>handleChange(e)}
                      className={error.birthday?`${s.dangerInp}`:`${s.validInp}`}
                      autoComplete="off"
                      type="text"/>  (DD-MM-YYYY)
              <div className={error.birthday?`${s.danger}`:`${s.valid}`}>
                {error.birthday || 'valid data'}
              </div>
            </div>

            <div className={`${s.inpt}`} key='i'> Image: |
                        <input
                              name="img" value={input.img}
                              onChange={(e)=>handleChange(e)}
                              className={error.img?`${s.dangerInp}`:`${s.validInp}`}
                              autoComplete="off"
                              type="text"  />
              <div className={error.img?`${s.danger}`:`${s.valid}`}>
                {error.img || 'valid data'}
              </div>
            </div>

        </div>

        <div className={s.cont4}>
          {
            (error.name || error.nickname || error.birthday || error.img || error.status || error.occupations ) ?

              <button onClick={()=>checking()}>pre-error checking</button>
              :
              <div className={s.inpt} key='s'>
                <button type="submit">Add Character</button>
              </div>
          }
          {/*<div className={`${s.inpt}`}>
            <input type="reset" value="restore form"/>
          </div>*/}
        </div>

      </form>

      <select onChange={(e)=> handleSelect(e)}>
        {
          occupationsStore.map(o=> <option key={`s${o.id}`} value={o.name}> {o.name} </option>)
        }
      </select >
      { input.occupations?.map( (el, index) =>
        <div className={s.dsdfd} key={`o${index}`}>
          <p>{el}</p>
          <button  value={el} onClick={(e)=>handleDelete(e)}>X</button>
        </div>)
      }
      <div className={error.occupations?`${s.danger}`:`${s.valid}`}>
        {error.occupations || 'valid data'}
      </div>

      <div className={`${s.inpt}`} key='s'> Status: 
          { (input.status !== '') ?
              <button  onClick={()=>resetStatus()}>Restart Options</button>

              :

              <div>
                  <label key="Ali"><input
                      name="Alive"  value="Alive"
                      onChange={(e)=>handleCheck(e)}
                      type="checkbox"/>Alive</label>
                  <label key="Des"><input
                      name="Deseased"  value="Deseased"
                      onChange={(e)=>handleCheck(e)}
                      type="checkbox"/>Deseased</label>
                  <label key='Unk'><input
                      name='Unknown'  value='Unknown'
                      onChange={(e)=>handleCheck(e)}
                      type="checkbox"/>Unknown</label>
                  <label key="Pres"><input
                      name='Presumed dead' value='Presumed dead'
                      onChange={(e)=>handleCheck(e)}
                      type="checkbox"/>Presumed dead</label>
              </div>
          }

        <div className={error.status?`${s.danger}`:`${s.valid}`}>
          {error.status || 'valid data'}
        </div>
    </div>

  </div>
  )
}
