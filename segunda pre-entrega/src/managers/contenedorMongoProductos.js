import mongoose, {mongo} from 'mongoose'

class ContenedorMongoProductos{
    constructor(datacollection,dataschema){
        this.model = mongoose.model(datacollection,dataschema)
    }
    async getById(id){
        try{
            const data = await this.model.findById(id)
            return data
        }catch(err){
            console.log(err);
        }
    }
    async getAll(){
        try{
            const data = await this.model.find()
            return data
        }catch(err){
            console.log(err);
        }
    }
    async save(data){
        try{
            const newData = await this.model.create(data)
            return newData
        }catch(err){
            console.log(err);
        }
    }
    async deleteById(id){
        try{
            const data = await this.model.findByIdAndDelete(id)
            return data

        }catch(err){
            console.log(err);
        }
    }
    async putById(id,modificacion){
        try{
            const data = await this.model.findByIdAndUpdate(id,modificacion)
            const newData = await this.getById(id)
            return newData
        }catch(err){
            console.log(err);
        }
    }
}



export {ContenedorMongoProductos}

