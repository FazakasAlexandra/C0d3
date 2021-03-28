const jimp = require('jimp');
const express = require('express');
const app = express();
const cache = {}

app.get('/memegen/api/:text', (req, res) => {
    src = req.query.src || 'https://placeimg.com/640/480/any'
    blurScale = parseInt(req.query.blur) || 0
    black = req.query.black || 'false'
    font = black.toLowerCase() === 'true' ? jimp.FONT_SANS_32_BLACK : jimp.FONT_SANS_32_WHITE
    text = req.params.text

    jimp.loadFont(font).then(font => {
        jimp.read(cache[src] || src, (err, img) => {
            if (err) console.log(err)

            if(!cache[src]) updateCache(src, img)

            manipulateImg(img.clone(), font, text, blurScale, res)
        })
    })
})

function updateCache(src, img) {
    let cacheSrcs = Object.keys(cache)

    if (cacheSrcs.length === 10) {
        let earliestCache = cacheSrcs[0] // JS objects preserve insertion order
        
        console.log('removing ' +earliestCache)
        console.log('adding ' + src)

        delete cache[earliestCache]
    }

    cache[src] = img
}

function manipulateImg(img, font, text, blurScale, res) {
    img.print(font, 0, 0, text)

    if (blurScale) {
        img.blur(blurScale, (err, imgBlur) => sendImg(imgBlur, res))
        return
    }

    sendImg(img, res)
}

function sendImg(img, res) {
    img.getBufferAsync(jimp.MIME_JPEG).then((buffer) => {
        res.header.content
        res.set('Content-Type', 'image/jpeg').send(buffer)
    })
}

app.listen(3000)