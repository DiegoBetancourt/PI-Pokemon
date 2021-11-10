import axios from 'axios';

export function getPokemons() {
    return async function(dispatch) {
        try {
            const json = await axios.get("http://localhost:3001/pokemons") //sucede la conexion entre el front y el back
            return dispatch({
                type: 'GET_POKEMONS',
                payload: json.data
            });
        } catch (err) {
            console.log(err)
        }
    };
}

export function getTypes() {
    return async function(dispatch) {
        try {
            const info = await axios.get("http://localhost:3001/types")
            console.log(info)
            return dispatch({ 
                type: 'GET_TYPES', 
                payload: info.data
            });
        } catch (error) {
            console.log(error)
        }
    };
}

export function postPokemon(payload) {
    return async function (dispatch) {
        try {
            const response = await axios.post("http://localhost:3001/pokemons",payload);
            console.log(response)
            return response;
        } catch (error) {
            console.log(error)
        }
    }
}

export function getNamePokemons(name) {
    return async function (dispatch) {
        try {
            console.log(name)
            var res = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
            return dispatch({ 
                type: 'GET_NAME_POKEMONS', 
                payload: res.data 
            });
        } catch (error) {
            console.log(error)
        }
    };
}



export function filterPokemonsByType(payload) {
    return {
        type: 'FILTER_BY_TYPE',
        payload
    }
}

export function filterCreated(payload) {
    return {
        type: 'FILTER_CREATED',
        payload
    }
}

export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByAttack(payload) {
    return {
        type: 'ORDER_BY_ATTACK',
        payload
    }
}

export function getDetail(id) {
    return async function(dispatch) {
        try {
            var json = await axios.get("http://localhost:3001/pokemons/" + id);
            return dispatch({
                type: 'GET_DETAILS',
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}