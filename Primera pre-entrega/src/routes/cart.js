const express = require("express");
const carritoContenedor = require("../managers/cartContenedor");
const Contenedor = require("../managers/contenedor");
const cartRouter = express.Router();
const contenedorProductos = new Contenedor("../files/productos.json")
const contenedorCarritos = new carritoContenedor("../files/cartProducts.json","../files/productos.json");

cartRouter.post("/",async (req,res)=>{
        const carrito = await contenedorCarritos.createCart()
        res.send("carrito creado")
    
    
})
cartRouter.delete("/:id",async (req,res)=>{
    const {id}=req.params
    contenedorCarritos.deleteAll(id)
    res.send("carrito borrado")
})
cartRouter.delete("/:id/productos/:id_prod",async (req,res)=>{
    let {id,id_prod}=req.params
    const product = await contenedorProductos.getById(parseInt(id_prod))
    if(product.id === parseInt(id_prod)){
        contenedorCarritos.deleteById(id,id_prod)
        res.json({
            message:"producto encontrado para eliminar"
        })
    }
    else{
        res.send("no se encontro el producto a eliminar")
    }
})
cartRouter.post("/:id/productos",async (req,res)=>{
    const {id}=req.params
    const newProduct = req.body
    const product = await contenedorProductos.getById(newProduct.id)
    if(product.id === newProduct.id){
        res.json({
            message:"producto ya creado",
            product:product,
            cantidad:product.stock+1
        })
        contenedorCarritos.saveProduct(product.id,id)
        
    }
})

module.exports = cartRouter;




