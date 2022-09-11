const mongoose = require('mongoose')
const { array } = require('../middleware/upload')

const Schema = mongoose.Schema

const orderSchema = new Schema({
    items: {
        type: Array,
        trim: true,
        ref: "Products"
    }, 
    date: {
        type: Date,
        required: true

    },
    total: {
        type: Number,
        required: true


    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

},
    { timestamps: true })
const Orders = mongoose.model('Orders', orderSchema)

module.exports = Orders