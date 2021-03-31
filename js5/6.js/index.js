/* 
GET
-> https://ale.freedomains.dev/authentication/api/auth.js
-> https://ale.freedomains.dev/authentication/api/sessions
POST 
-> https://ale.freedomains.dev/authentication/api/users
-> https://ale.freedomains.dev/authentication/api/sessions
*/

const path = require('path')
const fs = require('fs/promises');
// validator for express
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())

const secretPassword = "I am a secret password"

const users = {
    get: () => {
        return fs.readFile('users.json').then(file => JSON.parse(file))
    },
    find: (criteria, value) => {
        return users.get()
            .then(usersData => {
                return usersData.find(user => user[criteria] === value)
            })
    },
    post: (user) => {
        users.get()
            .then((usersData) => {
                usersData.push(user)
                user.id = Date.now();
                fs.writeFile('users.json', JSON.stringify(usersData), () => console.log('user created !'))
            })
    },
    isDuplicate: (crieria, value) => {
        return users.find(crieria, value).then((user) => {
            if (user) return Promise.reject(`${crieria} is already in use`);
            return Promise.resolve(true);
        })
    }
}

app.get('/authentication/api/session', (req, res) => {
    const token = req.get('Authorization').split(" ")[1];
    jwt.verify(token, secretPassword, (err, username) => {
        if (!username) return res.status(401).send({ errors: [{ message: 'Not authorised' }] })

        users.find('username', username).then(user => {
            delete user.password
            res.status(200).send(user)
        })
    })
})

app.post('/authentication/api/session', (req, res) => {
     const { username, email, password } = req.body
 
     const searchCriteria = username ? 'username' : 'email'
 
     users.find(searchCriteria, (username || email))
         .then(user => {
             if (!user) return res.status(400).send({ errors: [{ message: 'User not found' }] })
 
             bcrypt.compare(password, user.password, (err, isSame) => {
                 if (!isSame) return res.status(400).send({ errors: [{ message: 'Wrong password' }] })
                 delete user.password
                 res.status(200).send(user)
             })
         })
 })

app.post('/authentication/api/users',
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 chars long')
        .matches(/\d/)
        .withMessage('Password must contain at least 1 number'),
    check('email')
        .isEmail()
        .withMessage('Invalid E-mail address')
        .custom((email) => users.isDuplicate('email', email)),
    check('username')
        .notEmpty()
        .withMessage('Username is required')
        .matches(/^[a-z0-9 ]*/)
        .withMessage('Username can contains only letters and numbers')
        .custom((username) => users.isDuplicate('username', username)),
    (req, res) => {
        let { username, password } = req.body

        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        bcrypt.hash(password, 5, (err, hashedPassword) => {
            const token = jwt.sign(username, secretPassword)
            req.body.password = hashedPassword
            users.post({ ...req.body, jwt: token });
            return res.status(201).json({ message: 'user created' })
        })
    })

app.get('/authentication/api/auth.js', (req, res) => {
    res.type('.js')
    res.sendFile(path.join(__dirname + '/Auth.js'))
})

app.listen(3000)