const express = require("express");
const Contenedor = require("../contenedorProductos");
const productsRouter = express.Router();

const contenedorProductos = new Contenedor("productos.txt");

productsRouter.get("/",async(req,res)=>{
    try {
        const products = await contenedorProductos.getAll();
        console.log(products)
        res.send(products)
    } catch (error) {
        res.status(500).send("hubo un error en el servidor")
    }
})

productsRouter.get("/:id", async(req,res)=>{
    const {id} = req.params;
    const product = await contenedorProductos.getById(parseInt(id));
    if(product){
        res.json({
            message:"producto encontrado",
            product: product
        })
    }else{
        res.json({
            message:"producto no encontrado"
        })
    }
})

productsRouter.post("/",async(req,res)=>{
    const newProduct = req.body;
    const productos = await contenedorProductos.save(newProduct);
    res.json({
        message:"producto creado",
        response: productos
    })
})

productsRouter.put("/:id", async(req,res)=>{
    const {id} = req.params;
    const newInfo = req.body;
    const productosActualizados = await contenedorProductos.updateById(parseInt(id),newInfo);
    res.json({
        message:`El producto con el id ${id} fue actualizado`,
        response: productosActualizados
    })
})

productsRouter.delete("/:id", async(req,res)=>{
    const {id} = req.params;
    
    const productosActualizados = await contenedorProductos.deleteById(parseInt(id));
    res.json({
        message:`El producto con el id ${id} fue eliminado`,
        response: productosActualizados
    })
})


module.exports = productsRouter;