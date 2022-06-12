const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

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
    password: {
        type: String,
        required: [true, 'user password must be provided'],
        minlength: [8, 'user password must be at least 8 characters'],
        maxlength: [16, 'user password must be at most 16 characters'],
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

    userSchema.pre('save',async function(next)  {
         if(!this.isModified('password')) next();
         const salt = await bcrypt.genSalt(10);
         this.password = await bcrypt.hash(this.password, salt);
    })

    module.exports = mongoose.model('User', userSchema)