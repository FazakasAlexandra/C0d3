const request = require('request')
const fs = require('fs')

module.exports = {
    heaviestPokemon : () => {
        const pokemonList = []
        request('https://pokeapi.co/api/v2/pokemon/', (err, res, data) => {
            const parsedData =  JSON.parse(data)
            parsedData.results.forEach(pokemon => {
                 request(pokemon.url, (err, res, body)=> {
                     pokemonList.push({name : pokemon.name, weight : JSON.parse(body).weight})
                     if (parsedData.results.length === pokemonList.length){
                         const heaviest = pokemonList.reduce((acc, pokemon)=>{
                             return pokemon.name > acc.name ? pokemon : acc
                         }, pokemonList[0])
                         console.log(`Heaviest Pokemon is ${heaviest.name} at ${heaviest.weight} pounds`)
                     }
                 })
             })
        })
    }
}

