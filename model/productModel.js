const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
    productsName: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true,
    },
    productDescription: {
        type: String,
        required: true
    },
    productReviews: {
        type: String,
        required: true
    }
   
},
{ timestamps: true })
const Products = mongoose.model('Products', productSchema)

module.exports = Products