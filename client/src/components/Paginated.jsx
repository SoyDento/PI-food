import React from 'react';

export default function Paginated ({charactPerPage, allCharacters, paginado}) {

  let pagNumbers = [];

  for (let i=1; i<=Math.ceil(allCharacters/charactPerPage); i++) {
    pagNumbers.push(i)
  };

  return(
    <nav>
       {
         pagNumbers && pagNumbers.map( number=>
            <button onClick={()=> paginado(number)} key={number}> {number} </button>
         )
       }
    </nav>
  )
};
