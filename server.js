const express = require("express")

const server = express()

server.all("/", (req, res) => {
  res.send("The bot is running");
})

function keepAlive() {
  server.listen(3000, () => {
    console.log("Server Ready")
  })
}

module.exports = keepAlive
// keep alive or u die :o