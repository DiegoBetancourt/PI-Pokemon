import React from 'react'
import '../../src/estilos/Card.css';




export default function Card({name, types, sprite}) {
    return (
        <div className= 'card-grid' >
            <div className= 'card-img'>                
                <img src={sprite} alt='pokemon' width='100px' height='100px'/>
            </div>
            <div>
                <div className = 'card-top'>
                 <h3>{name}</h3>
               
                </div>

                <div className='card-down'>
                 <h4>Tipo:{types}</h4>
                </div>
            </div>
                
        </div>
    );
};