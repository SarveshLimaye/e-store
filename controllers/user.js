const User = require('../models/user');
const asyncHandler = require('express-async-handler')

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
    })

    }else {
        res.status(400)
        throw new Error('User not created')
    }
})

module.exports = {registerUser}