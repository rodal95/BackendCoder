const express = require("express")
const Contenedor = require("./contenedor.js")
const handlebars = require("express-handlebars")

const app = express()
const listaProductos = new Contenedor('productos.txt')
app.listen(8080,()=>{
    console.log("server andando")
})
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.engine("handlebars", handlebars.engine())

app.set("views","./views")

app.set("view engine", "handlebars")

app.get("/", (req,res)=>{
    res.render("home")
})

app.get("/formulario",(req,res)=>{
    res.render("formulario")
})

app.get("/tabla",async (req,res)=>{
    const productos = await listaProductos.getAll()
    console.log(productos)
    res.render("tabla",{productos})

    
})

app.post("/formulario",(req,res)=>{
    const newProduct = req.body
    listaProductos.save(newProduct)
    console.log(newProduct)
    res.redirect("/")

})