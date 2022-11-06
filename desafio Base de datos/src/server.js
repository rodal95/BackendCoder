const express = require("express");
const options = require("./config/dbConfig")
const {Server} = require("socket.io");
/* const Contenedor = require("./managers/contenedor")
const ContenedorMensajes = require("./managers/contenedorMensajes") */
const ContenedorSql = require("./managers/contenedorSql")


//servicios
/* const productsServices = new Contenedor("productos.txt") */
const productsServices = new ContenedorSql(options.mariaDB,"products")
/* const mensajesApi = new ContenedorMensajes("mensajes.txt") */
const mensajesApi = new ContenedorSql(options.sqliteDB,"chat")
const app = express();

const PORT = process.env.PORT || 8080;

//servidor de express
const server = app.listen(PORT, ()=>console.log(`listening on port ${PORT}`));

//servidor de websocket y lo conectamos con el servidor de express
const io = new Server(server);
//trabajar con archivos estaticos de public
app.use(express.static(__dirname+"/public"));

let historicosMensajes = []


//socket
io.on("connection",async (socket)=>{
    console.log("nuevo usuario conectado", socket.id)

    //enviar todos los prod cuando se conecte
    socket.emit("products", await productsServices.getAll())

    //recibimos el producto del cliente y guardamos
    socket.on("newProduct",async (data)=>{
        await productsServices.save(data)
        //enviamos la lista actualizada a todos los sockets
        io.sockets.emit("products", await productsServices.getAll())
    })

    socket.broadcast.emit("newUser")
    socket.emit("historico",await mensajesApi.getAll())
    socket.on("message",async data => {
        console.log(data)
       await mensajesApi.save(data)
       await io.sockets.emit("historico",await mensajesApi.getAll())
       
    })
})
