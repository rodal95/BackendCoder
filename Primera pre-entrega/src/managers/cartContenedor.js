const fs = require('fs');
const path = require("path")
const Contenedor = require('./contenedor');
const { writeHeapSnapshot } = require('v8');
class ContenedorCart {

    constructor(nameFile,productFile){
        this.productManager = new Contenedor(productFile)
        this.nameFile = path.join(__dirname,`../files/${nameFile}`);
    }
    createCart = async ()=>{
        try{
            if(fs.existsSync(this.nameFile)){
                const carritos = fs.readFileSync(this.nameFile)
                if(carritos){
                    let lastIdCart = carritos.reduce((acc,item)=>item.id > acc ? acc = item.id : 0)
                    const newCarrito ={
                        id:lastIdCart+1,
                        timestamp: Date.now().toString(),
                        productos:[]
                    }
                    carritos.push(newCarrito)
                    await fs.promises.writeFile(this.nameFile,JSON.stringify(carritos,null,2))
                    return newCarrito.id
                }
                else{
                    const newCarrito ={
                        id:1,
                        timestamp:Date.now().toString(),
                        productos:[]
                    }
                    await fs.promises.writeFile(this.nameFile,JSON.stringify(newCarrito,null,2))
                    return newCarrito.id
                }
            }
        }
        catch{
            console.log(error)
        }
    }
    saveProduct = async (productId,cartId)=>{
        try{
            let carritos = await this.readFileSync()
            let index = carritos.findIndex(cartId)
            if(index){
                let getProduct = await this.productManager.getById(productId)
                carritos[index].productos.push(getProduct)
            }
            else{
                console.log("no se encuentra carrito")
            }
        }
        catch{
            console.log(error)
        }
    }
    deleteById = async (cartId,productId)=>{
        try{
            let carritos = await this.readFileSync()
            let index = carritos.findIndex(cartId)
            if(index){
                let deleteProduct = carritos.productos.findIndex((product)=>product.id == productId)
                if(deleteProduct){
                    carritos[index].productos.splice(deleteProduct,1)
                }
                else{
                    console.log("no se encuentra producto para borrar")
                }
            }
            else{
                console.log("error delete")
            }
        }
        catch{
            console.log(error)
        }
    }
    deleteAll = async (cartId)=>{
        let carritos = await this.readFileSync()
        let index = carritos.findIndex(cartId)
        if(index){
            carritos[index]={}
        }
    }
}
module.exports= ContenedorCart;