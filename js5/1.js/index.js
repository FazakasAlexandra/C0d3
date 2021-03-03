const express = require('express')
const app = express()
const fetch = require('node-fetch')
let visitors = {}

app.get('/visitors', async (req, res) => {
    const address = await fetch(`https://js5.c0d3.com/location/api/ip/${req.get('x-forward-for')}`).then(res => res.json())

    setVisitors(address);

    res.send(getHTMLresponse(address))
})

app.get('/visitors/city/:cityStr', async (req, res) => {
    res.send(getHTMLresponse({
        cityStr: req.params.cityStr,
        ll: visitors[req.params.cityStr].ll
    }))
})

app.get('/api/visitors', async (req, res) => {
    res.json(visitors);
})

function setVisitors(address) {
    if (visitors[address.cityStr]) {
        visitors[address.cityStr].nr += 1
    } else {
        visitors[address.cityStr] = {
            nr: 1,
            ll: address.ll
        }
    }
}

function getHTMLresponse(address) {
    return `<h1>Hello, you are visiting us from ${address.cityStr}</h1>
              <div style="height: 500px" id='gMap'></div>
              <hr>
              <h3>Our visitors come from </h3>
              <ul>${getvisitorsList()}</ul>
              <script>${getScript(address.ll)}</script>
              <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB29pGpCzE_JGIEMLu1SGIqwoIbc0sHFHo&callback=initMap"></script>`
}

function getvisitorsList() {
    return Object.keys(visitors).reduce((acc, key) => {
        return `${acc}<li><a href="/visitors/city/${key}">${key} - ${visitors[key].nr}</a></li>`
    }, '')
}

function getScript(latLng) {
    return `function initMap() {
        let llLocation = {lat: ${latLng[0]}, lng: ${latLng[1]}};
        
        let map = new google.maps.Map(
          document.getElementById('gMap'), {zoom: 10, center: llLocation}
        );
        
        let marker = new google.maps.Marker({position: llLocation, map: map});
      }`
}

app.listen(process.env.port || 3000)