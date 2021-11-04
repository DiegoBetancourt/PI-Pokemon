import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postPokemon, getTypes } from '../actions/index';
import { useDispatch, useSelector } from 'react-redux';
import '../../src/estilos/PokemonCreate.css';

function validate(input) {
    let errors = {};
    if(!input.name) {
        errors.name = 'Name must be completed';
    }
    return errors;
}

export default function PokemonCreate() {
    const dispatch = useDispatch()
    const history = useHistory()
    const tipos = useSelector((state) => state.types)
    const [errors, setErrors] = useState({});

    const [input,setInput] = useState({
        name: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        sprite: "",
        types: [],
    })

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        console.log(input)
    }

 

    function handleSelect(e) {
        setInput({
            ...input,
            types: [...input.types, e.target.value]
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(input)
        dispatch(postPokemon(input))
        alert("Pokemon Creado")
        setInput({
            name: "",
            hp: "",
            attack: "",
            defense: "",
            speed: "",
            height: "",
            weight: "",
            sprite: "",
            types: []
        })
        history.push('/home')
    }

    function handleDelete(e) {
        setInput({
            ...input,
            types: input.types.filter(el => el !== e)
        })
    }

    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch]);

    return (
        <div>
            
            <h1>Crea Un Pokémon</h1>
            <div className ='form-create-pokemon'>            
           
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <label>Nombre:</label>
                        <input
                        type= "text"
                        value= {input.name}
                        name= "name"
                        onChange={(e) => handleChange(e)}
                        required
                        />
                        {errors.name && (
                            <p className='error'>{errors.name}</p>
                        )}
                    </div>
                    <div>
                        <label>Vida:</label>
                        <input
                        type= "text"
                        value= {input.hp}
                        name= "hp"
                        onChange={(e) => handleChange(e)}
                        required
                        />
                    </div>
                    <div>
                        <label>Ataque:</label>
                        <input
                        type= "text"
                        value= {input.attack}
                        name= "attack"
                        onChange={(e) => handleChange(e)}
                        required
                        />
                    </div>
                    <div>
                        <label>Defensa:</label>
                        <input
                        type= "text"
                        value= {input.defense}
                        name= "defense"
                        onChange={(e) => handleChange(e)}
                        required
                        />
                    </div>
                    <div>
                        <label>Velocidad:</label>
                        <input
                        type= "text"
                        value= {input.speed}
                        name= "speed"
                        onChange={(e) => handleChange(e)}
                        required
                        />
                    </div>
                    <div>
                        <label>Altura:</label>
                        <input
                        type= "text"
                        value= {input.height}
                        name= "height"
                        onChange={(e) => handleChange(e)}
                        required
                        />
                    </div>
                    <div>
                        <label>Peso:</label>
                        <input
                        type= "text"
                        value= {input.weight}
                        name= "weight"
                        onChange={(e) => handleChange(e)}
                        required
                        />
                    </div>
                    <div>
                        <label>Imagen:</label>
                        <input
                        type= "text"
                        value= {input.sprite}
                        name= "sprite"
                        onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div >
                        <label>Tipo:</label>
                        <select onChange={(e) => handleSelect(e)}>
                            {tipos.map((e) => (
                                <option value={e}>{e}</option>
                            ))}
                        </select>
                        <ul>
                            {input.types.map(e => e + ", ")}
                        </ul>        
                        <button type='submit'>Crear Pokemon</button>
                    </div>    
                </form>
                <Link to= '/home'><button>Volver</button></Link>
            </div>
            {input.types.map(e =>
                <div className='divTypes'>
                    <p>{e}</p>
                    <button className='botonX' onClick={() => handleDelete(e)}>x</button>
                </div>      
            )}
        </div>
    )
}