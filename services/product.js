const e = require('express');
const ProductModel = require('../models/productModel');
const listServices = {}

listServices.createProduct = (newProduct) => {
  return ProductModel.create(newProduct)
}

listServices.findProductById = (id) => {
  return ProductModel.findOne({_id: id}).lean().exec()
}
listServices.getTopTenProduct = () => {
  return ProductModel.find().sort({"totalPrice": -1}).limit(10).lean().exec()
}

listServices.getProductByPID = (pid) => {
  return ProductModel.findOne({pid}).lean().exec()
}
listServices.getAllProduct = (query, userLocal) => {
  const current = Number(query?.current) || 1
  const pageSize = Number(query?.pageSize) || 5
  const body = {}
  body.isDelete = false
  if(query?.pid){
    body.pid = query.pid
  }
  if(query?.status){
    body.status = query.status
  }
  if(!query?.order){
    query.order = { createdAt: -1 }
  }else{
    query.order = JSON.parse(query.order)
  }
  const products = ProductModel.find(body).skip((current - 1) * pageSize).limit(pageSize).sort(query.order).lean().exec()
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

listServices.updateStatusProduct = async (id, status) => {
  const product = await ProductModel.findOne({_id: id}).lean().exec();
  if(!product){
    throw new Error('Sản phẩm không tồn tại vui lòng thử lại')
  }
  return ProductModel.updateOne({_id: id}, { status, updatedAt: Date.now() }).lean().exec()
}


listServices.deleteProduct = async (id) => {
  const product = await ProductModel.findOne({_id: id}).lean().exec();
  if(!product){
    throw new Error('Sản phẩm không tồn tại vui lòng thử lại')
  }
  return ProductModel.updateOne({_id: id}, {
    deletedAt: Date.now(),
    isDelete: true
  }).lean().exec()
}

module.exports = listServices