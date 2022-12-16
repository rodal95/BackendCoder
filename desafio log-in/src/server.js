const express = require("express");
const options = require("./config/dbConfig")
const {Server} = require("socket.io");
const Contenedor = require("./managers/contenedor")
const ContenedorMensajes = require("./managers/contenedorMensajes")
const {normalize,schema} = require("normalizr")
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
/* const ContenedorSql = require("./managers/contenedorSql") */


//servicios
const productsServices = new Contenedor("productos.txt")
/* const productsServices = new ContenedorSql(options.mariaDB,"products") */
const mensajesApi = new ContenedorMensajes("mensajes.txt")
/* const mensajesApi = new ContenedorSql(options.sqliteDB,"chat") */
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 8080;

//servidor de express
const server = app.listen(PORT, ()=>console.log(`listening on port ${PORT}`));

//servidor de websocket y lo conectamos con el servidor de express
const io = new Server(server);
//trabajar con archivos estaticos de public
app.use(express.static(__dirname+"/public"));

app.use(cookieParser());
//sessions
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:"mongodb+srv://RodrigoHalo:CoderProyecto@coderbackend.fgpchrr.mongodb.net/sessionsDBdesafio?retryWrites=true&w=majority",
    }),
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 200000,
    },
  })
);
app.get("/login",async (req,res)=>{
    res.sendFile(__dirname+"/public/login.html")
    /* res.redirect("/home") */
} )
app.post("/login",(req,res)=>{
   req.session.nombre = req.body
   if(req.session.nombre){
    res.send({message:"exito"})
    }else{res.send({message:"usuario invalido"})}
    
   /* res.send({message:"usuario recibido logueado",usuario:usuario.nombre}) */
   
})
let userLog 
app.get("/home", (req,res)=>{
    if(req.session.nombre){
        console.log(req.session.nombre)
        userLog=req.session.nombre
        res.sendFile(__dirname+"/public/index.html")
    }
    else{
        res.redirect("/login")
    }
})
app.get("/salir",(req,res)=>{
    req.session.destroy()
    res.redirect("/login")
})


let historicosMensajes = []

const authorSchema = new schema.Entity("authors",{}, {idAttribute:"email"})
const mensajeSchema = new schema.Entity("mensajes",{author:authorSchema})
const chatSchema = new schema.Entity("chat",{
    mensajes:[mensajeSchema]
},{idAttribute:"id"})


const normalizarData = (data)=>{
    const normalizeData = normalize({id:"chathistory", mensajes:data},chatSchema)
    return normalizeData
}
const normalizarMensajes = async()=>{
    const results = await mensajesApi.getAll()
    const messagesNormalize = normalizarData(results)
    return messagesNormalize

}
normalizarMensajes()
//socket
io.on("connection",async (socket)=>{

    socket.emit("usuarioLog", userLog)
    //enviar todos los prod cuando se conecte
    socket.emit("products", await productsServices.getAll())

    //recibimos el producto del cliente y guardamos
    socket.on("newProduct",async (data)=>{
        await productsServices.save(data)
        //enviamos la lista actualizada a todos los sockets
        io.sockets.emit("products", await productsServices.getAll())
    })

    socket.broadcast.emit("newUser")
    socket.emit("historico",await normalizarMensajes())
    socket.on("message",async data => {
        if(historicosMensajes.length==0){
            nuevoMensaje = {
                id:1,
                ...data
            }
            
            historicosMensajes.push(nuevoMensaje)
            await mensajesApi.save(historicosMensajes)
        }
        else{
            nuevoMensaje ={
                id:historicosMensajes.length+1,
                ...data
            }
            historicosMensajes.push(nuevoMensaje)
            await mensajesApi.save(historicosMensajes)
        }
        
       await io.sockets.emit("historico",await normalizarMensajes())
       
    })
})
