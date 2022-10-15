const express =require("express")
const handlebars = require("express-handlebars")
const app = express()
app.listen(8080, ()=>{
    console.log("server ready")
})


app.engine("handlebars", handlebars.engine())

app.set("views","./views")

app.set("view engine", "handlebars")

app.get("/",(req,res)=>{
    res.render("home",{
        nombre:"pablo",
        apellido:"alday",
        edad:25,
        email:"aaa@agasd",
        telefono:4234234

    })
})

app.get("/contact", (req,res)=>{
    res.render("contact")
})

app.get("/usuarios",(req,res)=>{
    res.render("usuarios",{
        estudiantes:[
            {name:"pedro"},
            {name:"romina"},
            {name:"rodrigo"}
        ]
    })
})


