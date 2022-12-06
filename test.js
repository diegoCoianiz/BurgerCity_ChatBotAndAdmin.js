console.clear()
const express = require("express")
const app = express()
const path = require("path")
const cors = require("cors")
//const { init } = require("./bot/fullStackAppBot")
//const socketIO = require("socket.io")
const http = require("http")
const open = require("open")

//DB connect
const dbConnnect = require(`${__dirname}/config/mongo`)
dbConnnect()

//Http server express
const server = http.createServer(app)

//Static files
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'test')));

//Midlewares
app.use(express.urlencoded({extended:true}))
app.use(express.json({ type: "*/*"}))
app.use(cors())

//Routes
app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`)
  //res.sendFile(`${__dirname}/test/indexTest.html`)
})

app.use("/api", require("./routes"))

//Listener
const port = 3000
server.listen(port, () => {
  console.log(`Espacio de pruebas backend activado en el puerto ${port}`)
  open(`http://localhost:${port}`)
})
