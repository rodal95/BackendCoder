import mongoose from "mongoose";

const userCollection = "users"
const userSchema =  new mongoose.Schema({
    name:String,
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})


export const userModel = mongoose.model(userCollection,userSchema)