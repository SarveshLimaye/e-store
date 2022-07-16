const Order = require('../models/order');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');


const getAllOrders = async (req,res) => {
    res.status(200).json(await Order.find())
}


const getOrderByMail = async (req,res) => {
    await Order.findOne({email:req.params.email},
        (err,order)=>{
            if(err){
                console.log(err)
            }else{
                order.populate("orders").execPopulate(() =>{
                    res.status(200).json(order)
                })
            }
        })
}
const addOrder = asyncHandler (async (req,res) => {
   const {email,orders,quantity} = req.body
   const order = await Order.findOne({email})
   const user = await User.findOne({email})

   if(order){
    const orderItem = await Order.findOneAndUpdate({email},{$push:{orders:orders}},{new:true}) 
    await Order.findOneAndUpdate({email},{$set:{quantity:quantity}},{new:true}) 
    await User.findOneAndUpdate({email},{$pull:{cart:orders}},{new:true})
    res.status(201).json(orderItem)
   }else{
    const orderItem = await Order.create({email,orders})
    await User.findOneAndUpdate({email},{$pull:{cart:orders}},{new:true})
    res.status(201).json(orderItem)
   }

})

module.exports = {getAllOrders,addOrder ,getOrderByMail}