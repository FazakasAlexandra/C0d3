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
    if (!data[req.params.room]) {
        data[req.params.room] = [{ message: req.body.message, username: req.user.username }]
        res.status(201).json({ user: req.user, message: 'message added !' })
        return
    }

    data[req.params.room].unshift({ message: req.body.message, username: req.user.username })
    res.status(201).json({ user: req.user, message: 'message added !' })
})

app.listen(3000)