import mongoose from "mongoose"
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    productName: {
        type: String,
        maxlength:50,
        required:true
    },
    price:{
        type: Number,
        default: 0,
        required:true
    },
    images: {
        type: Array,
        default: []
    },
    totalQty:{
        type: Number,
        required:true
    },
    availableQty:{
        type: Number,
        required:true
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

productSchema.index({ 
    productName:'text'
}, {
    weights: {
        productName: 5
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = { Product }