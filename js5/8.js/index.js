const express = require('express')
const fs = require('fs')
var path = require('path')
const app = express()
app.use(express.static('public'))
app.use(express.json({limit: '10mb'}))

const imgNames = []
const assetsPath = path.join(__dirname, '/public/assets')

app.get('/selfiequeen', (req, res) => {
    fs.readdir(assetsPath, (err, data)=>{
        if(err) console.log(err)
        res.json(data)
    })
})

app.post('/selfiequeen', (req, res) => {
    const id = Date.now()
    const imgName = `selfie-${id}.png`
    
    imgNames.push(imgName)

    fs.writeFile(`${assetsPath}/${imgName}`, req.body.img, 'base64', () => { 
        res.status(201).json({imgName})
    })
})

app.get('/selfiequeen/:fileName', function (req, res) {
    res.sendFile(`${assetsPath}/${req.params.fileName}`)
})

app.listen(3000)