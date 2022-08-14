const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId:{
        type:String
    },
    email : {
        type:String
    },
    product:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Product',
        }
    ],
    subTotal:{type:Number},
    total:{type:Number},
    shipping:{type:Object},
    delivery_status:{type:String , default:'pending'} ,
    payment_status:{type:String}
},{timestamps:true})

module.exports = mongoose.model('Order', orderSchema)
