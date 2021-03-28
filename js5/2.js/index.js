const { exec } = require('child_process');
const express = require('express');
const app = express();
app.use(express.json())

app.get('/commands/execute/:command', (req, res) => {
    const command = req.params.command

    if (command.includes('ls') || command.includes('pwd') || command.includes('cat')) {
        exec(req.params.command, (err, stdout, _stderr) => {
            if (err) return res.send(getHTMLresponse(req.params.command, `${command} is not an availbale command !`))
        
            res.send(getHTMLresponse(req.params.command, stdout))
        })
    } else {
        res.send(getHTMLresponse(req.params.command, `${command} is not an availbale command !`))
    }
})

app.get('/commands', (req, res) => {
    res.send(getHTMLresponse("", ""))
})

function getHTMLresponse(inputValue, commandResult) {
    return `<h3>Hi there, chose one of the available commands</h3>
    <ul>
      <li><a href="/commands/execute/ls">ls</a></li>
      <li><a href="/commands/execute/cat index.js">cat</a></li>
      <li><a href="/commands/execute/pwd">pwd</a></li>
    </ul>
    <input value="${inputValue}"></input>
    <hr>
    <div>${commandResult}</div>
    <script>
      document.querySelector("input").addEventListener('keyup', (e)=>{
          if (e.key === 'Enter') window.location = "/commands/execute/" + document.querySelector('input').value
      })
    </script>`
}

app.listen(5000)