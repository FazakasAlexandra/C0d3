const express = require('express');
const fs = require('fs')
const cors = require('cors');
const app = express();
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

let storedFiles = {}; // { filename : date}
const fiveMins = 1000 * 60 * 5;

app.get('/api/files', (req, res) => {
    fs.readdir('./files', (err, files) => {
        if (err) return res.json({ error: `"files" directory not found` })

        res.json(files)
    })
})

app.post('/api/files', (req, res) => {
    const fileName = req.body.fileName;

    fs.writeFile(`./files/${fileName}`, req.body.fileContent, (err) => {
        if (err) return res.json({ error: "file could not be written" });

        storedFiles[fileName] = Date.now()

        res.json({ message: 'file was successfully writen' })
    })
})

app.get('/api/files/:name', (req, res) => {
    fs.readFile(`./files/${req.params.name}`, (err, content) => {
        if (err) return res.json({ error: `file "${req.params.name}" not found in files directory` })

        res.json({data: content.toString("utf-8")})
    })
})

function clearFiles() {
    Object.keys(storedFiles).forEach((fileName) => {
        if (Date.now() - storedFiles[fileName] > fiveMins) {
            fs.unlink(`./files/${fileName}`, () => {
                console.log(`file "${fileName}" was removed from files directory`)
                delete storedFiles[fileName]
            })
        }
    })
    setTimeout(clearFiles, fiveMins);
}

app.listen(3000, () => {
    fs.readdir('./files', (err, files) => {
        if (err) console.log(err)
        files.forEach((file) => {
            storedFiles[file] = Date.now()
        })
    })

    clearFiles();
});
