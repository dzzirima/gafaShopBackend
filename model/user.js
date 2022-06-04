import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        required:true,
        type:String,
        trim:true,
        validate:{
            validator:(value) =>{
                
            }
        }
    }
})