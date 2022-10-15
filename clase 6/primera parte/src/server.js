const express = require("express")
const {Server} = require("socket.io")
const app = express()

const server = app.listen(8080, ()=>{
    console.log("andando")
})

const io = new Server(server)

app.use(express.static(__dirname +"/public"))

io.on("connection", (socket)=>{
    console.log("nuevo cliente conectado")
    socket.emit("messageFromServer","se ha conectado exitosamente")
    //info a un solo cliente
    socket.on("letras",(dataDelCliente)=>{
        console.log(dataDelCliente)
         //para todos los clientes
            io.sockets.emit("messages",dataDelCliente)
    })
   
})