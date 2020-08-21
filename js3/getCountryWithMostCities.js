const request = require('request')
const fs = require('fs')

module.exports = {
    getMostCities : () => {
        request('https://api.openaq.org/v1/countries', (err, res, data)=>{
            let mostCities = JSON.parse(data).results.reduce((acc, country)=>{
                return country.cities > acc.cities ? country : acc
            }, JSON.parse(data).results[0])
            
            console.log(mostCities.name)
        })
    }
}