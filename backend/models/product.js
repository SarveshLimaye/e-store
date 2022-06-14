const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'product name must be provided'],
  },
  price: {
    type: Number,
    required: [true, 'product price must be provided'],
  },
  freedelivery: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  image:{
    type: String,
    default: 'https://4.imimg.com/data4/AA/HC/MY-26596027/men-s-fancy-t-shirt-500x500.jpg',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    required: [true, 'company name must be provided']
  },
})

module.exports = mongoose.model('Product', productSchema)