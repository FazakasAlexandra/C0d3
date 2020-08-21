const request = require("request")
const fs = require('fs')

module.exports = {
    getNames: () => {
        request('https://pokeapi.co/api/v2/pokemon/', (err, res, data)=>{
            console.log(JSON.parse(data).results)
            const fileContent = JSON.parse(data).results.reduce((acc, pokemon) =>{
                return acc + `<h1>${pokemon.name}</h1>`
            },'')

            fs.writeFile('names.html', fileContent, ()=>{})

        })
    }
}