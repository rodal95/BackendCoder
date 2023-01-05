const dotenv = require("dotenv")

dotenv.config({
    path:".env"
})
console.log(process.env.BASESESIONES)

const bases = {
    usuarios: process.env.BASEUSUARIOS,
    sesiones:process.env.BASESESIONES
}

module.exports = {bases}

