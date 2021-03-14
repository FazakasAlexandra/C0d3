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

        if (cache[src]) {
            manipulateImg(cache[src].clone(), font, text, blurScale, res)
            return
        }
        
        jimp.read(src, (err, img) => {
            if (err) console.log(err)

            cache.count = (cache.count || 0) + 1
            if(cache.count <= 10) cache[src] = img

            manipulateImg(img.clone(), font, text, blurScale,res)
        })
    })
})

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