const express = require("express");
const Contenedor = require("../managers/contenedor");
const productsRouter = express.Router();

const contenedorProductos = new Contenedor("productos.json");

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
    const product = await contenedorProductos.getById(parseInt(newProduct.id));
    if(product.id === newProduct.id){
        res.json({
            message:"producto ya existente",
            product: product
        })
    }else{
        if( newProduct.id && newProduct.title && newProduct.thumbnail && newProduct.price){
            const productos = await contenedorProductos.save(newProduct);
        res.json({
            message:"producto creado",
            response: productos
        })
    }else{
        res.json({
            message:"faltan datos"
        })
    }
    }
    
    
})

productsRouter.put("/:id", async(req,res)=>{
    const {id} = req.params;
    const product = await contenedorProductos.getById(parseInt(id));
    
    if(product){
        const newInfo = {title:req.body.title, price:isNaN(req.body.price)? Number(req.body.price):req.body.price,thumbnail:req.body.thumbnail}
        if(newInfo.title && newInfo.price && newInfo.thumbnail){
            const productosActualizados = await contenedorProductos.updateById(parseInt(id),newInfo);
            console.log(Object.keys(newInfo).length)
            res.json({
                message:`El producto con el id ${id} fue actualizado`,
                response: productosActualizados
            })
        }
        else{
            res.json({
                message:"faltan datos"
            })
        }
       
    }else{
        res.json({
            message:"producto no encontrado"
        })
    }
    
})

productsRouter.delete("/:id", async(req,res)=>{
    const {id} = req.params;
    const product = await contenedorProductos.getById(parseInt(id));
    if(product){
        const productosActualizados = await contenedorProductos.deleteById(parseInt(id));
        res.json({
            message:`El producto con el id ${id} fue eliminado`,
            response: productosActualizados
        })
    }else{
        res.json({
            message:"producto no encontrado o ya fue eliminado"
        })
    }
})


module.exports = productsRouter;