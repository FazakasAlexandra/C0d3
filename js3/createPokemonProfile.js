const request = require('request')
const fs = require('fs')

module.exports = {
    createProfile : () => {
        const pokemonList = []
        request('https://pokeapi.co/api/v2/pokemon?limit=100', (err, res, data) => {
            const parsedData = JSON.parse(data)
            parsedData.results.forEach(pokemon => {
                request(pokemon.url, (err, res, body)=>{
                    pokemonList.push({
                        name: pokemon.name, 
                        image: JSON.parse(body).sprites.front_default
                    })
                    if(pokemonList.length === parsedData.results.length){
                        const fileContent = pokemonList.reduce((acc, pokemonInfo)=>{
                            return `${acc}<div><p>${pokemonInfo.name}</p><img src="${pokemonInfo.image}"/></div>`
                        }, '')
                        fs.writeFile('namesandimages.html', fileContent, ()=>{``})
                    }
                })
            });
        })
    }
}