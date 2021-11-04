import React from "react";
import { Link } from "react-router-dom";
//import image from '../../src/estilos/pokemon-gengar.jpg'
import '../../src/estilos/LandingPage.css'


export default function LandingPage() {
  return (
    <div className= 'imgLandingPage'>
       
    
        <h1 className= 'h1'>Bienvenidos a la App de Pokémon</h1>
        <Link to="/home">
            <button className= 'btnLandingPage'> Ingresar </button>
        </Link>

    </div>
  );
}
