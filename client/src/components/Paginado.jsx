import React from "react";
import '../../src/estilos/Paginado.css';

export default function Paginado({pokemonsPerPage, allPokemons, paginate}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className= 'pagination'>
        <label>Pagina:</label>
        { pageNumbers &&
            pageNumbers.map(number => (
                <button onClick={()=>paginate(number)} className='number'>{number}</button>
            ))
        }
    </div>
)


}