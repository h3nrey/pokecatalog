const express = require("express");
const searchRoute = express.Router();
const axios = require("axios");

searchRoute.post("", async(req,res) => {
    let searchQueries = req.body.search
    try {
        const pokeAPI = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchQueries}`)
        const pokemon = pokeAPI.data;
        res.render("search", {pokemon: pokemon})
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

module.exports = searchRoute;

