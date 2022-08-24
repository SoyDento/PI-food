// import React from 'react';
// import { useDispatch } from 'react-redux';
import { getNameRecipe } from '../redux/actions';

import React, { Component } from 'react';
import { connect } from 'react-redux';

class SearchBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: ''
    };
  };
  handleInputChange = (e)=>{
    e.preventDefault();
    this.setState({data: e.target.value});
  };
  handleSubmit = (e)=>{
    e.preventDefault();
    this.props.getNameRecipe(this.state.data);
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
        getNameRecipe: (n) => dispatch(getNameRecipe(n))
    }
};

export default connect(null, mapDispatchToProps)(SearchBar);


//
// export default function SearchBar() {
//
//   const dispatch = useDispatch();
//   const [data, setName] = React.useState('');
//
//   function handleInputChange(e) {
//     e.preventDefault();
//     setName(e.target.value);
//     console.log(data);
//   };
//   function handleSubmit(e) {
//     e.preventDefault();
//     dispatch(getNameRecipe(data));
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
