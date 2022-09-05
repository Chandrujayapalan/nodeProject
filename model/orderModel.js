const mongoose = require('mongoose')
const { array } = require('../middleware/upload')

const Schema = mongoose.Schema

const  orderSchema = new Schema({
    items: {
        type: Array,
        trim: true
    }, 
    date :{
        type: Date
     
    }, 
    total: {
        type: Number,
      
      
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref:'userModel'
    }

},
{ timestamps: true })
const Orders = mongoose.model('Orders', orderSchema)

module.exports = Orders