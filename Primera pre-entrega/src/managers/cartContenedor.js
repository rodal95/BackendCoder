const fs = require('fs');
const { get } = require('https');
const path = require("path")
const Contenedor = require('./contenedor');
class ContenedorCart {

    constructor(cartFile,productFile){
        this.productManager = new Contenedor(productFile);
        this.cartFile = path.join(__dirname,`../files/${cartFile}`);
    }

    createCart = async ()=>{
            if(fs.existsSync(this.cartFile)){
                const carritos = JSON.parse(fs.readFileSync(this.cartFile))
                console.log(carritos.length)
                if(carritos){
                    /* let lastCart = carritos.reduce((acc,item)=>item.id > acc ? acc = item.id : 0)
                    console.log(lastCart) */
                    let lastIdCart=carritos.length
                    const newCarrito ={
                        id:lastIdCart+1,
                        timestamp: Date.now().toString(),
                        productos:[]
                    }
                    carritos.push(newCarrito)
                    await fs.promises.writeFile(this.cartFile,JSON.stringify(carritos,null,2))
                    return newCarrito.id
                }
                else{
                    const newCarrito={
                        id:1,
                        timestamp:Date.now().toString(),
                        productos:[]
                    }
                    await fs.promises.writeFile(this.cartFile,JSON.stringify([newCarrito],null,2))
                    return newCarrito.id
                }
            }
            else{
                const newCarrito={
                    id:1,
                    timestamp:Date.now().toString(),
                    productos:[]
                }
                await fs.promises.writeFile(this.cartFile,JSON.stringify([newCarrito],null,2))
                return newCarrito.id
            }
    }
    saveProduct = async (productId,cartId)=>{
            let carritos = await JSON.parse(fs.readFileSync(this.cartFile))
            let carrito = carritos.filter(item=> item.id===parseInt(cartId))
            console.log(carrito[0])
            if(carrito){
                let getProduct = await this.productManager.getById(productId)
                console.log(getProduct)
                carrito[0].productos.push(getProduct.title)
                const newCarritos = carritos.filter(item=> item.id!==parseInt(cartId))
                newCarritos.push(carrito[0])
                console.log(carrito)
                await fs.promises.writeFile(this.cartFile, JSON.stringify(newCarritos,null,2))
            }
            else{
                console.log("no se encuentra carrito")
            }
       
    }
    deleteById = async (cartId,productId)=>{
    
        let carritos = await JSON.parse(fs.readFileSync(this.cartFile))
        let carrito = carritos.filter(item=> item.id===parseInt(cartId))
        console.log(carrito)
        if(carrito){
            let getProduct = await this.productManager.getById(parseInt(productId))
            let productosInCarrito = carrito[0].productos
            let newProductsFiltrador = productosInCarrito.filter(item=>item !== getProduct.title)
            if(newProductsFiltrador){
                carrito[0].productos=newProductsFiltrador
                /* carrito[0].productos.push(newProductsFiltrador) */
                const newCarritos = carritos.filter(item=> item.id!==parseInt(cartId))
                newCarritos.push(carrito[0])
                await fs.promises.writeFile(this.cartFile, JSON.stringify(newCarritos,null,2))
            }
        }   
    }
    deleteAll = async (cartId)=>{
        console.log(cartId)
        let carritos = await JSON.parse(fs.readFileSync(this.cartFile))
        const newCarritos = carritos.filter(item=> item.id!==parseInt(cartId))
        console.log(newCarritos)
        await fs.promises.writeFile(this.cartFile, JSON.stringify(newCarritos,null,2))
    
    }
}
module.exports= ContenedorCart;