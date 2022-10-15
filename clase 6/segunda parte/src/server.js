const express = require("express");
const {Server} = require("socket.io");

const app = express();

const PORT = process.env.PORT || 8080;

//servidor de express
const server = app.listen(PORT, ()=>console.log(`listening on port ${PORT}`));

//servidor de websocket y lo conectamos con el servidor de express
const io = new Server(server);

app.use(express.static(__dirname+"/public"));
let historicosMensajes = []
io.on("connection",(socket)=>{
    console.log("nuevo usuario conectado", socket.id)
    socket.broadcast.emit("newUser")
    socket.emit("historico", historicosMensajes)
    socket.on("message", data => {
        console.log(data)
        historicosMensajes.push(data)
        io.sockets.emit("historico", historicosMensajes)
    })
})
