import mongoose from "mongoose"

const Schema = mongoose.Schema;
import uniqueValidator from "mongoose-unique-validator"

const customerSchema = mongoose.Schema({
   
    name:{
        type: String
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type: String,
        required: true,
        unique: true
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

customerSchema.plugin(uniqueValidator)
const Customer = mongoose.model('Customer', customerSchema);

module.exports = { Customer }