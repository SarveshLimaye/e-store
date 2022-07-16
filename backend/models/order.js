const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    orders:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product',
        default: [],
    }],
   
})

module.exports = mongoose.model('Order', orderSchema)