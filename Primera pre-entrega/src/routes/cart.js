const express = require("express");
const carritoContenedor = require("../managers/cartContenedor");
const Contenedor = require("../managers/contenedor");
const cartRouter = express.Router();
const contenedorProductos = new Contenedor("../files/productos.json")
const contenedorCarritos = new carritoContenedor("../files/cartProducts.json","../files/productos.json");

cartRouter.post("/api/carrito/",async (req,res)=>{
    try{
        const carrito = await contenedorCarritos.createCart()
        console.log(carrito)
    }
    catch{
        console.log(error)
    }
})
cartRouter.delete("/api/carrito/:id",async (req,res)=>{
    const {id}=req.params
    contenedorCarritos.deleteAll(id)
})
cartRouter.delete("/api/carrito/:id/productos/:id_prod",async (req,res)=>{
    let {id,id_prod}=req.params
    contenedorCarritos.delete(id,id_prod)
    res.send("producto borrado del carrito")

})

cartRouter.post("/api/carrito/:id/productos",async (req,res)=>{
    const newProduct = req.body
    const product = await contenedorProductos.getById(newProduct.id)
    if(product.id === newProduct.id){
        res.json({
            message:"producto ya creado",
            product:product,
            cantidad:product.stock+1
        })
    }
})

module.exports = cartRouter;




