const { application } = require('express')
const express = require('express')
const app = express()
const frutasRouter = require("./routes/frutas")
const userRouter = require("./routes/users")
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/archivos",express.static(__dirname + "public"))
app.use("/documentos",express.static(__dirname + "document"))




app.listen(8080, ()=>{
    console.log('server en linea')
})


app.use("/users", userRouter)
app.use("/frutas", frutasRouter)