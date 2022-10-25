const Order = require('../models/order');
const Product = require('../models/product');
const asyncHandler = require('express-async-handler')

const getAllOrders = async (req,res) => {
    const orders = await Order.find({}).populate('product').exec((err,product) => {
        if(err){
            res.status(400).json({message:err})
        }
        res.status(200).json(product)
    })
}

const getOrderbyId = async (req,res) => {
    const order = await Order.find({userId:req.params.id})
    .populate('product').exec((err,product) => {
        if(err){
            res.status(400).json({message:err})
        }
        res.status(200).json(product)
    })
}

module.exports = {
    getAllOrders,getOrderbyId
}