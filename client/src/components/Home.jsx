import React from "react";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getPokemons, filterPokemonsByType, filterCreated, orderByName, orderByAttack} from "../actions/index";
import {Link} from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import '../../src/estilos/Home.css';



export default function Home() {

    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons);
    // Estados Locales
    const [currentPage, setCurrentPage] = useState(1) //Estado con la pagina actual y un estado que me setea la pagina actual, arranca en 1 por que siempre arranco en la primera pagina
    const [pokemonsPerPage, setPokemonsPerPage ] = useState(9); //Estado con la cantidad de pokemons por pagina
    const [orden, setOrden] = useState('')
    const [order, setOrder] = useState('')

    const indexOfLastPokemon = currentPage * pokemonsPerPage; //Indice del ultimo pokemon 9
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage; //Indice del primer pokemon 0
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon); //Pokemons que se van a mostrar en la pagina actual


    const paginate = (pageNumber) => setCurrentPage(pageNumber); //Funcion que me permite cambiar de pagina


    useEffect (() => {
        dispatch(getPokemons()) //lo mismo q hacer map dispatch to props
    },[dispatch])

    
    function handleClick(e){ // por si se buggea
        e.preventDefault();
        dispatch(getPokemons());
    }

    
    function handleFilterType(e){
        dispatch(filterPokemonsByType(e.target.value))
    }
        
    
    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value));
    }

    function handleSort(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
        console.log(orden)
    }

    function handleSortAttack(e) {
        e.preventDefault();
        dispatch(orderByAttack(e.target.value))
        setCurrentPage(1);
        setOrder(`Orderado ${e.target.value}`)
        console.log(order)
    }

    return (
        <div className= 'container'>
            <br/>
            {/* <h1>Pokédex</h1> */}
            <img src= 'https://cdn2.bulbagarden.net/upload/4/4b/Pok%C3%A9dex_logo.png' alt='logopokedex' width='250px'/>
            <br/><br/>
            <h2>¡Usa Los Filtros Para Encontrar Un Pokémon Por Tipo o Fuerza!</h2>
         

            <div className ='filters'>
            <button onClick={e => {handleClick(e)}}> 
                Cargar Todos los Pokémon
            </button>

                <select onChange={e => handleSort(e)}>
                    <option value='asc'>Ascendente</option>
                    <option value='desc'>Descendente</option>
                </select>

                <select onChange={e => handleSortAttack(e)}>
                    <option value='stronger'> Mas Fuerte/Mas Debil </option>
                    <option value='weaker'> Mas Debil/Mas Fuerte </option>
                </select>

                <select onChange={e => handleFilterType(e)} >
                    <option value= 'All'> Todos </option>
                    <option value= 'normal'> Normal </option>
                    <option value= 'fighting'> Fighting </option>
                    <option value= 'flying'> Flying </option>
                    <option value= 'poison'> Poison </option>
                    <option value= 'ground'> Ground </option>
                    <option value= 'rock'> Rock </option>
                    <option value= 'bug'> Bug </option>
                    <option value= 'ghost'> Ghost </option>
                    <option value= 'steel'> Steel </option>
                    <option value= 'fire'> Fire </option>
                    <option value= 'water'> Water </option>
                    <option value= 'grass'> Grass </option>
                    <option value= 'electric'> Electric </option>
                    <option value= 'psychic'> Psychic </option>
                    <option value= 'ice'> Ice </option>
                    <option value= 'dragon'> Dragon </option>
                    <option value= 'dark'> Dark </option>
                    <option value= 'fairy'> Fairy </option>
                    <option value= 'unknown'> Unknown </option>
                    <option value= 'shadow'> Shadow </option>
                </select>

                <select onChange={e => handleFilterCreated(e)} >
                    <option value= 'All'> Todos </option>
                    <option value= 'created'> Creados </option>
                    <option value= 'api'> Existentes </option>
                </select>
                
                <div className ='searchpag-container'>
                    <div> 
                    <SearchBar></SearchBar>
                    </div>
                    <div>
                    <Paginado
                        pokemonsPerPage={pokemonsPerPage}
                        allPokemons={allPokemons.length}
                        paginate={paginate}
                    />
                    </div>
                    <div className ='linkcreatupokemon'>
                        <Link to= '/pokemon'> Crea Tu Pokémon </Link>
                        
                    </div>
                </div>
                        <hr></hr>

                <div className = 'pokemongrid'>
                {currentPokemons?.map((c) => {
                    return (
                        <div key={c.id}>
                            <Link to = {`/details/${c.id}`}>
                                <Card 
                                name={c.name} 
                                sprite={c.sprite} 
                                types={c.types.map((e => `[${e.name}] `))} 
                                />
                            </Link>
                        </div>
                    );
                })}
                </div>

            </div>
        </div>
    )
}