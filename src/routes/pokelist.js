const express = require("express");
const pokelistRouter = express.Router();
const axios = require("axios");

pokelistRouter.get("", async(req,res) => {
    try {
        var pokemons = {
            starredPokemons: [],
            pokedex: [],
        }

        const fetchPokemons = async () => {

            for (let i = 1; i <= 9; i++) {
                const randomIndex = Math.floor(Math.random() * 898)
                await getPokemon(randomIndex, pokemons.starredPokemons);
            }

            for (let i = 1; i <= 20; i++) {
                await getPokemon(i, pokemons.pokedex);
            }

            res.render("index", {starredPokemons: pokemons.starredPokemons, pokedex: pokemons.pokedex})
        };
        
        const getPokemon = async (id,arr) => {
            const pokeAPI = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            const pokemon = await pokeAPI.data;
            arr.push(await pokemon)
            console.log(pokemons);
        };
        
        fetchPokemons()
        
        
    } catch (error) {
        console.error(error);
    }
})


pokelistRouter.post("", async(req,res) => {
    let searchQueries = req.body.search
    try {
        const pokeAPI = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchQueries}`)
        const pokemon = pokeAPI.data;
        // res.send(await pokemon.data)
        res.render("search", {pokemon: pokemon})
        console.log(pokemon)
    } catch (err) {
        if(err.response) {
            res.render('search', { pokemon : null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if(err.requiest) {
            res.render('search', { pokemon : null })
            console.log(err.requiest)
        } else {
            res.render('search', { pokemon : null })
            console.error('Error', err.message)
        }
    } 
})
module.exports = pokelistRouter;
