import mongoose from 'mongoose';

import {options} from '../config/dbConfig.js';

let ContenedorDaoProductos
let ContenedorDaoCarrito



let databaseType = 'mongo'

switch(databaseType){
    case "mongo":

        const mongoUrl = 'mongodb+srv://RodrigoHalo:eco95@coderbackend.fgpchrr.mongodb.net/ecomerce2?retryWrites=true&w=majority'
        
        mongoose.connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, error =>{
            if(error) throw new Error(`conexion fallida ${error}`)
            console.log('conexion exitosa');
        })

        const {ProductosDaosMongo} = await import('./productos/productosMongo.js')
        const {productosSchema} = await import('../mongoSchema/mongoSchema.js')
        const {productosCollection} = await import('../mongoSchema/mongoSchema.js')
        ContenedorDaoProductos = new ProductosDaosMongo(productosCollection,productosSchema)

        const {CarritoDaosMongo} = await import('./carritos/carritosMongo.js')
        const {carritosSchema} = await import('../mongoSchema/mongoSchema.js')
        const {carritosCollection} = await import('../mongoSchema/mongoSchema.js')
        ContenedorDaoCarrito = new CarritoDaosMongo(carritosCollection,carritosSchema)
        break;

    case "archivo":
        const {ProductosDaosArchivo} = await import('./productos/productosArchivo.js')
        ContenedorDaoProductos = new ProductosDaosArchivo(options.fileSystem.pathProductos)
        const {CarritoDaosArchivo} = await import('./carritos/carritoArchivo.js')
        ContenedorDaoCarrito = new CarritoDaosArchivo(options.fileSystem.pathPedidos)
        break;
}

export {ContenedorDaoProductos, ContenedorDaoCarrito}