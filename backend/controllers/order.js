const Order = require('../models/order');
const asyncHandler = require('express-async-handler')

const getAllOrders = async (req,res) => {
    res.status(200).json(await Order.find())
}

const getOrderbyId = asyncHandler(async (req,res) => {
    const order = await Order.find({userId:req.params.id})
    if(order){
        res.status(200).json(order)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

module.exports = {
    getAllOrders,getOrderbyId
}