const Order = require('../models/order');
const Product = require('../models/product');
const asyncHandler = require('express-async-handler')

const getAllOrders = async (req,res) => {
    res.status(200).json(await Order.find())
}

const getOrderbyId = async (req,res) => {
    const order = await Order.findOne({userId:req.params.id},
     (err,product) => {
         if(err){
            console.log(err)
         }
         product.populate("product").execPopulate(() => {
            console.log(product)
            res.status(200).json(product)
         })
     }        
        
)
}

module.exports = {
    getAllOrders,getOrderbyId
}