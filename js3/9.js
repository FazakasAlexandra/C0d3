const fetch = require('node-fetch');
const fs = require('fs');
const createPokemonProfile = require('./createPokemonProfile');

function createHTMLfile(pokemonProfiles) {
    const htmlContent = pokemonProfiles.reduce((acc, profile)=>{
        return `${acc}<h1>${profile.name}</h1><img src="${profile.image}">`
   }, '')
   console.log(htmlContent)
   fs.writeFile('index.html', htmlContent, ()=>{})
}

function makePokemonProfiles(pokemons, pokemonProfiles = []) {
    pokemons.forEach(pokemon => {
        fetch(pokemon.url)
            .then(res => res.json())
            .then((pokemonDetail) => {
                pokemonProfiles.push({
                    image: pokemonDetail.sprites.front_default,
                    name: pokemon.name
                })
            })
            .then(()=>{
                if(pokemons.length === pokemonProfiles.length){
                    createHTMLfile(pokemonProfiles)
            }
            })
    });
}

function fetchPokemons() {
    fetch('https://pokeapi.co/api/v2/pokemon/')
        .then(res => res.json())
        .then(data => {
            makePokemonProfiles(data.results)
        })
}

fetchPokemons()