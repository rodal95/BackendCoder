const fs = require('fs');

class Contenedor{
    constructor(nameFile){
        this.nameFile = nameFile;
    }
    save = async (product)=>{
        try {
            if(fs.existsSync(this.nameFile)){
                const contenido = await fs.promises.readFile(this.nameFile, "utf-8")
                if(contenido){
                    const productos = JSON.parse(contenido)

                    const newProduct ={
                        id:productos.length+1,
                        ...product
                    }
                    productos.push(newProduct)
                   await fs.promises.writeFile(this.nameFile, JSON.stringify(productos, null, 2))
                }else{
                    const newProduct ={
                        id:1,
                        ...product
                    }
                   await fs.promises.writeFile(this.nameFile, JSON.stringify([newProduct], null, 2))
                }
            }else{
                const newProduct ={
                    id:1,
                    ...product
                }
               await fs.promises.writeFile(this.nameFile, JSON.stringify([newProduct], null, 2))
            }
        } catch (error) {
            console.log(error)
            }
        }
    getById = async(id)=>{
        try {
            if(fs.existsSync(this.nameFile)){
                const contenido = await fs.promises.readFile(this.nameFile, "utf-8")
                if(contenido){
                    const productos = JSON.parse(contenido)
                    const producto = productos.find(item=>item.id == id)
                    return producto
                }else{
                    return "el archivo no esta"
                }
            }
        } catch (error) {
            console.log(error)
            
        }

    }
    getAll = async()=>{
        const contenido = await fs.promises.readFile(this.nameFile, "utf-8")
        const productos = JSON.parse(contenido)
        return productos
    }
    deleteById = async (id)=>{
        const contenido = await fs.promises.readFile(this.nameFile, "utf-8")
        const productos = JSON.parse(contenido)
        const nuevoselementos = productos.filter(item => item.id != id)
        await fs.promises.writeFile(this.nameFile, JSON.stringify(nuevoselementos, null, 2))
    }
    deleteAll = async ()=>{
        const contenido = await fs.promises.readFile(this.nameFile, "utf-8")
        await fs.promises.writeFile(this.nameFile, JSON.stringify([]))
    }
}


const listaProductos = new Contenedor("nombreArchivo.txt")

const producto1 ={
    title:"camisa",
    price:300,
    image:"https://w7.pngwing.com/pngs/248/711/png-transparent-t-shirt-dress-shirt-sleeve-collar-dress-shirt-blouse-sleeve-shirt.png"
}
const producto2 = {
    title:"zapato",
    price:100,
    image:"https://w7.pngwing.com/pngs/248/711/png-transparent-t-shirt-dress-shirt-sleeve-collar-dress-shirt-blouse-sleeve-shirt.png"
}

const crearProducto= async()=>{
   await listaProductos.save(producto1)
   await listaProductos.save(producto2)
   const resultadoId = await listaProductos.getById(1)
   console.log(resultadoId)
   const productos = await listaProductos.getAll()
   console.log(productos)
   await listaProductos.deleteById(3)
   await listaProductos.deleteAll()
}

crearProducto()
