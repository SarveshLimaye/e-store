const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,   
        required: [true, 'user name must be provided'],
    },
    email: {
        type: String,
        required: [true, 'user email must be provided'],
        unique: true,
        lowercase: true,        
    },
    isSeller:{
        type: Boolean,
        default: false,

    },
    image:{
        type: String,       
        default: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200',
    },
    }
    ,{timestamps: true})

   

    module.exports = mongoose.model('User', userSchema)