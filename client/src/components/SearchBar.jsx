// import React from 'react';
// import { useDispatch } from 'react-redux';
import { getNameRecipe } from '../redux/actions';

import React, { Component } from 'react';
import { connect } from 'react-redux';

class SearchBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  };
  handleInputChange = (e)=>{
    e.preventDefault();
    this.setState({name: e.target.value});
  };
  handleSubmit = (e)=>{
    e.preventDefault();
    this.props.getNameChar(this.state.name);
  };

  render() {
    return(
      <div>
      <input
        type='text'
        placeholder='search...'
        onChange={(e)=>this.handleInputChange(e)}
        />
      <button onClick={(e)=>this.handleSubmit(e)} > Search </button>
      </div>
    )
  }
};

export const mapDispatchToProps = (dispatch) =>{
    return {
        getNameChar: (n) => dispatch(getNameRecipe(n))
    }
};

export default connect(null, mapDispatchToProps)(SearchBar);


//
// export default function SearchBar() {
//
//   const dispatch = useDispatch();
//   const [name, setName] = React.useState('');
//
//   function handleInputChange(e) {
//     e.preventDefault();
//     setName(e.target.value);
//     console.log(name);
//   };
//   function handleSubmit(e) {
//     e.preventDefault();
//     dispatch(getNameChar(name));
//   };
//
//   return(
//     <div>
//     <input
//       type='text'
//       placeholder='search...'
//       onChange={(e)=>handleInputChange(e)}
//       />
//     <button onClick={(e)=>handleSubmit(e)} > Search </button>
//     </div>
//   )
// };
