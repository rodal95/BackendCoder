const express = require("express")
const app = express()
const PORT = 8080

app.listen(PORT,()=> console.log("server runing"))

app.use((req,res,next)=>{
    console.log("procesando antes de la peticion")
    next()
})
const verificarRol = (req,res,next)=>{
    const rol = "admin"
    if(rol === "admin"){
        next()
    }else{
        res.send("no tienes acceso")
    }
    
}

app.get("/",(req,res)=>{
    console.log("ejecutando ruta /")
    res.send("peticion recibida")
})

app.get("/home",verificarRol,(req,res)=>{
    console.log("ejecutando ruta /home")
    res.send("peticion recibida en home")
})

app.get("/users",verificarRol, (req,res)=>{
    res.send("lista de usuarios")
})
