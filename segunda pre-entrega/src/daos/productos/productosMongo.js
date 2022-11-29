import {ContenedorMongoProductos} from '../../managers/contenedorMongoProductos.js'


class ProductosDaosMongo extends ContenedorMongoProductos{
    constructor(collection,schema){
        super(collection,schema)
    }
}
export{ProductosDaosMongo}