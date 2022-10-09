const { application } = require('express')
const express = require('express')
const app = express()
const frutasRouter = require("./routes/frutas")
const userRouter = require("./routes/users")
app.use(express.json())
app.use(express.urlencoded({extended:true}))







app.listen(8080, ()=>{
    console.log('server en linea')
})


app.use("/users", userRouter)
app.use("/frutas", frutasRouter)