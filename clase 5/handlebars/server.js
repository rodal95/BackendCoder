const express = require("express")
const app = express()
app.listen(8080, ()=>console.log("server listening"))


app.use(express.static("public"))