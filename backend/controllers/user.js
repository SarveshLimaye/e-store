const User = require('../models/user');
const asyncHandler = require('express-async-handler')
const generateToken = require('../utils/generateToken')

const registerUser = asyncHandler(async (req,res) => {
    const {name,email,password ,image} = req.body;
    const userExist = await User.findOne({email})
    if(userExist){
        res.status(400);
        throw new Error('User already exist')
    }

    const user = await User.create({name,email,password,image});

    if(user){
        res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        isSeller:user.isSeller,
        token: generateToken(user._id)
    })

    }else {
        res.status(400)
        throw new Error('User not created')
    }
})

const authUser = asyncHandler(async (req,res) => {
    const {email,password} = req.body;
    const user = await User.findOne({email})
    if(user && user.isValidPassword(password)){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            image: user.image,
            isSeller:user.isSeller,
            token: generateToken(user._id)  
        });
    }else{
        res.status(400);
        throw new Error('Invalid credentials')
    }
        
 })

module.exports = {registerUser , authUser}