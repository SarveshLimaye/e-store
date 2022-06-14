const Product = require('../models/product')
const jsonProduct = require('../product.json')

const getAllStaticProducts = async (req, res) => {
   res.status(200).send(jsonProduct)
   // await Product.create(jsonProduct)
}

const searchProducts = async (req,res) => {

   let searchData = await Product.find({"$or":[{name:req.query.name},{company:req.query.company}]})
   res.status(200).send(searchData)
}



const getAllProducts = async (req, res) => {
   res.status(200).json(await Product.find())
}

module.exports = {getAllProducts, getAllStaticProducts ,searchProducts}