const ProductModel = require('../models/productModel');
const listServices = {}

listServices.createProduct = (newProduct) => {
  return ProductModel.create(newProduct)
}

listServices.findProductById = (id) => {
  return ProductModel.findOne({_id: id}).lean().exec()
}
listServices.getAllProduct = (query, userLocal) => {
  const current = Number(query?.current) || 1
  const pageSize = Number(query?.pageSize) || 5
  const body = {}
  body.isDelete = false
  if(query?.pid){
    body.pid = query.pid
  }
  const products = ProductModel.find(body).skip((current - 1) * pageSize).limit(pageSize).sort({ updatedAt: -1 }).lean().exec()
  const totalCount = ProductModel.countDocuments(body).lean().exec()
  return {
    products,
    totalCount
  }
}

listServices.updateProduct = async (id, newProduct) => {
  const product = await ProductModel.findOne({_id: id}).lean().exec();
  if(!product){
    throw new Error('Sản phẩm không tồn tại vui lòng thử lại')
  }
  newProduct.updatedAt = Date.now()
  return ProductModel.updateOne({_id: id}, newProduct).lean().exec()
}


listServices.deleteProduct = (id) => {
  return ProductModel.updateOne({_id: id}, {
    deletedAt: Date.now(),
    isDelete: true
  }).lean().exec()
}

module.exports = listServices