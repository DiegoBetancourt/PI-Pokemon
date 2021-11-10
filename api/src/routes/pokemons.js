const { Router } = require('express');
const axios = require ('axios');
const router = Router();
const { Pokemon, Type } = require('../db');

//Funcion controladora que me trae los datos de la Api.
const getPokemonsApi = async () => {
    const pokemonsPrimero = await axios.get("https://pokeapi.co/api/v2/pokemon") 
    const pokemonSegundo = await axios.get(pokemonsPrimero.data.next) 
    const totalPokemons = pokemonsPrimero.data.results.concat(pokemonSegundo.data.results) 

    try {
        // Accedo a la url con la info de cada pokemon.
        const infoUrl = totalPokemons.map(e => axios.get(e.url)) 
        // Le paso un arreglo de promesas con la respuesta de cada url(info).
        let infoPokemons = Promise.all(infoUrl) 
            .then(e => {
                // Accedo a la info de cada url de cada pokemon.
                let pokemon = e.map(e => e.data) 
                // Genero un arreglo de objetos con la info que necesito de cada pokemon.
                let info = [] 
                pokemon.map(e => {
                    info.push({
                        id: e.id,
                        name: e.name,
                        hp: e.stats[0].base_stat,
                        attack: e.stats[1].base_stat,
                        defense: e.stats[2].base_stat,
                        speed: e.stats[5].base_stat,
                        height: e.height,
                        weight: e.weight,
                        sprite: e.sprites.front_default,
                        types: e.types.length < 2
                         ? [{name: e.types[0].type.name}] 
                         : [
                            {name: e.types[0].type.name}, 
                            {name: e.types[1].type.name},
                        ],
                    })
                })
                return info;
            })
            return infoPokemons;
    } catch (err) {
        console.log(err)
    }
}

//Funcion controladora que me trae los datos de la Base de Datos.
const getPokemonsDb = async () => {
    try {
        return await Pokemon.findAll({
            include: {
                model: Type,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        })
    } catch (err) {
        console.log(err);
    }
}

//Funcion controladora que me trae todo.
const getAllPokemons = async () => {
    const apiInfo = await getPokemonsApi();
    const dbInfo = await getPokemonsDb();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}



router.get('/', async (req, res, next) => {
    const {name} = req.query;
    try {
        const pokemonsTotal = await getAllPokemons();
        if(name) {
            let pokemonName = await pokemonsTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
            return pokemonName.length ? //hay algo?
            res.status(200).send(pokemonName) :
            res.status(404).send('Pokémon no Encontrado')
        } else {
            return res.status(200).send(pokemonsTotal);
        }
    } catch (err) {
        return next(err);
    }
})


router.get('/:id', async (req, res) => {
    const {id} = req.params;
    const allPokemons = await getAllPokemons();
    if(id) {
        const pokemonId = await allPokemons.filter(e => e.id == id);
        pokemonId.length ?
        res.status(200).json(pokemonId) :
        res.status(404).send('Pokémon no Encontrado')
    }
})

router.post('/', async (req, res, next) => {
    const {name,
           hp,
           attack,
           defense, 
           speed, 
           height, 
           weight, 
           sprite, 
           createdInDb, 
           types
    } = req.body;

    try {
        const createdPokemon = await Pokemon.create({
            name,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            sprite,
            createdInDb
        });
        const createdDb = await Type.findAll({
            where: {name: types}
        });
        createdPokemon.addType(createdDb);
        return res.status(200).send('Pokémon Creado')
    } catch (err) {
        next(err)    
    }
})

module.exports = router;