const express = require("express")
const app = express()
app.listen(8080, ()=>console.log("andando wacho"))


app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.set("views", "./views")
app.set("view engine","ejs")


const productos = []

app.get("/", (req,res)=>{
    res.render("home")
})
app.get("/formulario",(req,res)=>{
    res.render("form")
})
app.get("/tabla",(req,res)=>{
    res.render("table",{products:productos})
})

app.post("/formulario",(req,res)=>{
    const newProduct = req.body
    
    productos.push(newProduct)
    res.redirect("/")
    console.log(productos)
})




