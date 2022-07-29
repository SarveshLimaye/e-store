const Product = require('../models/product')
const jsonProduct = require('../product.json')

const getAllStaticProducts = async (req, res) => {
   res.status(200).send(jsonProduct)
   // await Product.create(jsonProduct)
}

const searchProducts = async (req,res) => {

   let searchData = await Product.find({"$or":[{name:{"$regex":req.query.name,"$options":"i"}},{company:req.query.company}]})
   res.status(200).send(searchData)
}

const getProductbyId = async (req,res) => {
   let product = await Product.findOne({_id:req.params.id})
   res.status(200).send(product)
}



const getAllProducts = async (req, res) => {
   res.status(200).json(await Product.find())
}

module.exports = {getAllProducts, getAllStaticProducts ,searchProducts ,getProductbyId}