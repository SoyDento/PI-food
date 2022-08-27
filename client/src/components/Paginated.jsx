import React from 'react';
import s from '../styles/Paginated.module.css';


export default function Paginated ({perPage, allRecipes, paginado, actualPage}) {

  let pagNumbers = [];

  for (let i=1; i<=Math.ceil(allRecipes/perPage); i++) {
    pagNumbers.push(i)
  };

  return(
    <nav>
      { (allRecipes/perPage < 10) ?
      <div>
       {        
         pagNumbers && pagNumbers.map( number=>
            <button onClick={()=> paginado(number)} key={number}> {number} </button>
         )
       }
      </div>
      :
      <div className={`${s.cont}`} >
      { actualPage > 1 && (
        <button className={`${s.cont2}`} onClick={ ()=> paginado(actualPage - 1) }>
        ◅ PREV
        </button>
      )}
      <button className={`${s.cont1}`}> {actualPage} </button>
      { actualPage < allRecipes/perPage && (
        <button className={`${s.cont2}`} onClick={ ()=> paginado(actualPage + 1) }>
        NEXT ▻
        </button>
      )}
      </div>
      }
    </nav>
  )
};









// export default function Paginated ({actualPage, perPage, allRecipes, paginado}) {
//   // console.log(allRecipes);
//   return (
//       <div className={`${s.cont}`} >
//         { actualPage > 1 && (
//           <button className={`${s.cont2}`} onClick={ ()=> paginado(actualPage - 1) }>
//           ◅ PREV
//           </button>
//         )}
//         <button className={`${s.cont1}`}> {actualPage} </button>
//         { actualPage < allRecipes/perPage && (
//           <button className={`${s.cont2}`} onClick={ ()=> paginado(actualPage + 1) }>
//           NEXT ▻
//           </button>
//         )}
//       </div>
//   )
// };
