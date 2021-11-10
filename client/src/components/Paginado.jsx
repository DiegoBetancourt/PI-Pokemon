import React from "react";
import '../../src/estilos/Paginado.css';

export default function Paginado({pokemonsPerPage, allPokemons, paginate}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  //Componente que se encarga de mostrar los numeros de paginas
  return (
    <div className= 'pagination'>
        <label>Pagina:</label>
        { pageNumbers &&
            pageNumbers.map(number => (
                <button key={number} onClick={()=>paginate(number)} className='number'>{number}</button>
            ))
        }
    </div>
)


}