const express = require('express')
const app = express()
const cors = require('cors');
const fetch = require('node-fetch');
app.use(cors())
app.use(express.static('public'))
app.use(express.json())

const data = {} // data = { chatroomName : [{message : "content", username:"name"}]}

checkJWT = (req, res, next) => {
    fetch('https://js5.c0d3.com/auth/api/sessions', {
        headers: {
            Authorization: req.get('Authorization')
        }
    })
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data)
        if(data.error) return res.status(403).json({error : data.error.message})
        req.user = data
        next()
    })
}

app.use(checkJWT)

app.get('/api/session', (req, res) => {
    res.status(200).json({user : req.user})
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