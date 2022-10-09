const express = require("express")
const userRouter = express.Router()


userRouter.get("/", (req, res)=>{
    res.send("soy a una rutita de usuaritos")
})

module.exports = userRouter