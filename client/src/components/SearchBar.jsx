import React from "react";
import { useState } from "react";
import {useDispatch} from "react-redux";
import { getNamePokemons } from "../actions";
import '../../src/estilos/SearchBar.css';

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getNamePokemons(name));
    }

       
    return(
        <div className = 'searchbar-container'>
            <input 
                type="text"
                placeholder="Buscar Pokémon..."
                onChange = {(e)=> handleInputChange(e)}
            />
            <button type='submit' onClick= {(e)=> handleSubmit(e)}>Buscar</button>
        </div>
    )
}
