const User = require('../models/user');
const asyncHandler = require('express-async-handler')
const generateToken = require('../utils/generateToken')

const getAllUsers = async (req,res) => {
    res.status(200).json(await User.find())
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


module.exports = {getAllUsers , addUser}