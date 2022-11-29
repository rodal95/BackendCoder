import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const options ={
    fileSystem: {
        pathProducts: path.join(__dirname,'../files/productos.json'),
        pathCarts: path.join(__dirname,'../files/carritos.json')
    }

}




