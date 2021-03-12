const jimp = require('jimp');
const express = require('express');
const app = express();

app.get('/memegen/api/:text', (req, res) => {
    src = req.query.src || 'https://placeimg.com/640/480/any'
    blurScale = parseInt(req.query.blur) || 0
    black = req.query.black.toLowerCase() || false

    console.log(black)
    jimp.loadFont(jimp.FONT_SANS_32_WHITE)
        .then(font => {
            jimp.read(src, (err, img) => {
                if (err) console.log(err)

                img.print(font, 0, 0, req.params.text)

                if (black === 'true') img.greyscale((err, imgBlack) => img = imgBlack)

                if (blurScale) {
                    img.blur(blurScale, (err, imgBlur) => sendImg(imgBlur, res))
                } else {
                    sendImg(img, res)
                }
            })
        })
})

function sendImg(img, res) {
    img.getBufferAsync(jimp.MIME_JPEG).then((buffer) => {
        res.header.content
        res.set('Content-Type', 'image/jpeg').send(buffer)
    })
}

app.listen(3000)