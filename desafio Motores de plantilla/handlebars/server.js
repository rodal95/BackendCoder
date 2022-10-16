const express = require("express")

const handlebars = require("express-handlebars")

const app = express()

app.listen(8080,()=>{
    console.log("server andando")
})
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.engine("handlebars", handlebars.engine())

app.set("views","./views")

app.set("view engine", "handlebars")
const productos = []
app.get("/", (req,res)=>{
    res.render("home")
})

app.get("/formulario",(req,res)=>{
    res.render("formulario")
})
app.get("/tabla",(req,res)=>{
    res.render("tabla",{productos})

    
})

app.post("/formulario",(req,res)=>{
    const newProduct = req.body
    productos.push(newProduct)
    res.redirect("/")
    console.log(productos)


})