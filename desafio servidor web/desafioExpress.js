const { response } = require("express")
const express = require("express")
const { request } = require("http")
const Contenedor = require("./contenedor.js")

const app = express()
const listaProductos = new Contenedor("productos.txt")

app.get("/",(request,response)=>{
    response.send("<h1 style='color:blue'>bienvenido</h1>")
})

app.get("/productos",async  (request, response)=>{
   const allProduct = await listaProductos.getAll()
   response.send(allProduct)
})

app.get("/productosRandom",async  (request, response)=>{
    let id = parseInt(Math.random()*5+1)
    const productRan = await listaProductos.getById(id)
    response.send(productRan)
})

let visitas = 0
app.get("/visitas",(request, response)=>{
    visitas ++
    response.send(`las visistas son ${visitas}`)
})
app.get("/rodrigo", (req, resp)=>{
    resp.send("holra rodrigo")
})
app.listen(8080, ()=>{
    console.log("server working")

})