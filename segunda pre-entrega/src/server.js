import express from "express";
import {rutaCarrito} from "./routes/carritos.js"
import {rutaProductos} from "./routes/products.js";

const app = express()

const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/productos', rutaProductos)
app.use('/api/carrito',rutaCarrito)

app.listen(PORT, ()=>console.log(`server ${PORT}`))

