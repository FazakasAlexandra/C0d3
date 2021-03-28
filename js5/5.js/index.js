// https://ale.freedomains.dev/chatroom

const express = require('express')
const app = express()
const cors = require('cors');
const fetch = require('node-fetch');
app.use(cors())
app.use(express.json())
var path = require('path');

const data = {} // data = { chatroomName : [{message : "content", username:"name"}]}

checkJWT = (req, res, next) => {
    fetch('https://js5.c0d3.com/auth/api/sessions', {
        headers: {
            Authorization: req.get('Authorization')
        }
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            if (data.error) return res.status(403).json({ error: data.error.message })
            req.user = data
            next()
        })
}

app.get('/utilities', (req, res) => {
    res.type('.js')
    res.sendFile(path.join(__dirname + '/public/utilities.js'))
})

app.get('/chatroom', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'))
})

app.get('/chatroom/:htmlfile', (req, res) => {
    res.sendFile(path.join(__dirname + `/public/${req.params.htmlfile}`))
})

app.use('/api', checkJWT)

app.get('/api/session', (req, res) => {
    res.status(200).json({ user: req.user })
})

app.get('/api/:room/messages', (req, res) => {
    res.status(200).json(data[req.params.room] || [])
})

app.post('/api/:room/messages', (req, res) => {
    const room = req.params.room
    const username = req.user.username
    const message = req.body.message

    data[room] = [{username, message}, ...(data[room] || [])] 
    res.status(201).json(data[room][0])
})

app.listen(3000)
