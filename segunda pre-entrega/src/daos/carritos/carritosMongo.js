import { ContenedorMongoCarritos } from "../../managers/contenedorMongoCarritos.js"

class CarritoDaosMongo extends ContenedorMongoCarritos{
    constructor(carritoCollection, carritoSchema){
        super(carritoCollection, carritoSchema)
    }
}
export{CarritoDaosMongo}