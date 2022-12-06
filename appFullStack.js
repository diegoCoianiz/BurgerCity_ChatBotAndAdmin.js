console.clear()
const express = require("express")
const app = express()
const path = require("path")
const cors = require("cors")
const { init } = require("./bot/fullStackAppBot")
const socketIO = require("socket.io")
const http = require("http")

//Http server express
const server = http.createServer(app) 

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//Midlewares
app.use(express.urlencoded({extended:true}))
app.use(express.json({ type: "*/*"}))
app.use(cors())

//Routes
app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`)
})

app.use("/api", require("./routes"))

//Listener
const port = 3000
server.listen(port, () => {
  console.log(`Espacio de trabajo activado en el puerto ${port}`)
  console.log("Por favor, escanee el siguiente codigo para ejecutar la AppWeb de Burgercity:\n")
})


const io = socketIO(server)
init(io, port)
