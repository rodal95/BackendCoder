const fs = require('fs');

class Contenedor{
    constructor(nameFile){
        this.nameFile = nameFile;
    }
    getById = async (id)=>{
                    const contenido = await fs.promises.readFile(this.nameFile, "utf-8")
                    const productos =JSON.parse(contenido)
                    const producto = productos.find(item=>item.id == id)
                    return producto
    }
    getAll = async()=>{
        const contenido = await fs.promises.readFile(this.nameFile, "utf-8")
        const productos = JSON.parse(contenido)
        return productos
    }
}
module.exports = Contenedor