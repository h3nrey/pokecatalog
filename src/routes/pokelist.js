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
                const randomIndex = Math.floor(Math.random() * 300)
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

module.exports = pokelistRouter;
