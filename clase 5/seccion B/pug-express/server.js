const express = require("express")
const app = express()
app.listen(8080, ()=> console.log("server andando"))

app.set("views","./views")
app.set("view engine", "pug")



app.get("/home",(req,res)=>{
    const {edad} = req.query
    res.render("home",{
        name:"mirtha",
        apellido:"jusen",
        edad:edad
    })
})

