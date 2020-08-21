const request = require('request')
const fs = require('fs')

module.exports = {
    createTitlesDoc: () => {
        request('https://c0d3.com/api/lessons', (err, res, data) => {
            const fileContent = JSON.parse(data).reduce((acc, lesson)=>{
                return acc + `<h1>${lesson.title}</h1>`
            }, '')

            fs.writeFile('./lessons.html', fileContent, ()=>{})

        })
    }
  }