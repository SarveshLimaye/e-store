const User = require('../models/user');
const asyncHandler = require('express-async-handler')


const getAllUsers = async (req,res) => {
    res.status(200).json(await User.find())
   
}

const deleteCart = async (req,res) => {
  await User.findOneAndUpdate({email:req.params.email},{$pull:{cart:req.params.id}},{new:true})
  res.status(200).json({message:'item deleted from cart'})
}

const getCart = async (req,res) => {
  await User.findOne({email:req.params.email},
    (err,cart) => {
      if(err){
        console.log(err)
      }
      cart.populate("cart").execPopulate(() => {
        res.status(200).json(cart)
      })
    })
}

const updateCart = async (req,res) => {
     
     const {email,cart} = req.body
     const user = await User.findOne({email})
     let cartExist = false
    
     if(user && user.cart){
      let cartitem = req.body.cart
      for(const element of user.cart){
        if(element == cartitem){
          cartExist=true
        }
      }
     }
     
     if(cartExist === true){
       res.status(400).json({message:'item already in cart'})
     }
      else{
         const cartItem = await User.findOneAndUpdate({email},{$push:{cart:cart}},{new:true})
          res.status(201).json(cartItem)
        }
          
        
     


     }

const checkCart = async (item,index,arr ,res) => {
  if(arr[index] == item){
    console.log('item already in cart')
  };
}


const getUserbyId = async (req,res) => {
    res.status(200).json(await User.findOne({_id:req.params.id}))   
}

const addUser = asyncHandler(async (req,res) => {
    const {name,email,image,isSeller} = req.body;
    const userExist = await User.findOne({email})
    if(userExist){
        res.status(400);
        throw new Error('User already exist')
    }

    const user = await User.create({name,email,image,isSeller});

    if(user){
        res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        isSeller: user.isSeller,
    })

    }else {
        res.status(400)
        throw new Error('User not created')
    }
})


module.exports = {getAllUsers , addUser , updateCart , getUserbyId ,getCart,deleteCart}