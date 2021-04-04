const express = require('express')
const multer = require('multer')
const Tesseract = require('tesseract.js')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(express.static('public'))
var path = require('path');

/*
POST
ale.freedomains.dev/textExtraction/files (upload files)

GET
ale.freedomains.dev/textExtraction/api/upload (get the html that handles files drop)
ale.freedomains.dev/textExtraction/api/jobs.html/:id (get the html that handles the job)
ale.freedomains.dev/textExtraction/api/job/:id (get the job)
ale.freedomains.dev/textExtraction/api/assets/:fileName (get the uploaded files)
*/

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './public/assets')
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`)
        }
    })
})

const jobs = {} // {12345 : [{src : 'abc.png' txt : 'hey'}] }

app.post('/files', upload.array('images'), (req, res) => {
    const id = Date.now()
    jobs[id] = []

    req.files.forEach((image, idx) => {
        console.log(image)
        jobs[id].push({
            id: idx,
            src: image.filename,
            txt: null
        })

        Tesseract.recognize(`./${image.path}`, 'eng').then(res => {
            jobs[id][idx].txt = res.data.text
            console.log(jobs)
        })
    })

    res.status(201).json({ url: `/api/jobs.html/${id}` })
})

app.get('/api/jobs.html/:id', (req, res) => {
    res.type('html')
    res.sendFile(path.join(__dirname + '/public/jobs.html'))
})

app.get('/api/job/:id', (req, res) => {
    res.json(jobs[req.params.id])
})

app.get('/api/assets/:fileName', function (req, res) {
    res.sendFile(path.join(__dirname + `/public/assets/${req.params.fileName}`))
});

app.listen(3000)