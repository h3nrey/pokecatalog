const express = require("express");
const pokelistRouter = express.Router();
const axios = require("axios");
const baseURL = "https://pokeapi.co/api/v2/pokemon/";

pokelistRouter.get("", async(req,res) => {
    try {
        var pokemons = []
        const fetchPokemons = async () => {
            for (let i = 1; i <= 9; i++) {
                await getPokemon(i);
            }
            res.render("index", {starredPokemons: pokemons})
        };
        
        const getPokemon = async id => {
            const pokeAPI = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            const pokemon = await pokeAPI.data;
            pokemons.push(await pokemon)
            console.log(pokemons);
        };
        
        fetchPokemons()
        
        
    } catch (error) {
        console.error(error);
    }
})

module.exports = pokelistRouter;
