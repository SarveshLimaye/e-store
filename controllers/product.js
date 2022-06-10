const Product = require('../models/product')
const jsonProduct = require('../product.json')

const getAllStaticProducts = async (req, res) => {
   res.status(200).send(jsonProduct)
   await Product.create(jsonProduct)
}

const getAllProducts = async (req, res) => {
   res.status(200).json({ msg:'products route' })
}

module.exports = {getAllProducts, getAllStaticProducts}