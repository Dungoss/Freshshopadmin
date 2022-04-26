const OrderModel = require('../models/orderModel');
const ProductModel = require('../models/productModel');
const UserModel = require('../models/accountModel');
const listServices = {}

listServices.createOrder = async (newOrder) => {
  const product = await ProductModel.findOne({ pid: String(newOrder.pid) }).lean().exec()
  if(!product) {
    throw new Error("Không tìm thấy sản phẩm vui lòng thử lại")
  }
  const user = await UserModel.findOne({email: newOrder.user}).lean().exec()
  if(!user) {
    throw new Error("Không tìm thấy người dùng vui lòng thử lại")
  }
  if(Number(product.quantity) < Number(newOrder.quantity)){
    throw new Error("Số sản phẩm không đủ vui lòng thử lại")
  }
  newOrder.idUser = user._id
  newOrder.idProduct = product._id
  await OrderModel.create(newOrder);
  await ProductModel.updateOne({_id: product._id}, {
    $inc: {
      quantity: -newOrder.quantity,
      selled: newOrder.quantity,
      totalPrice: newOrder.quantity * newOrder.price,
    }
  })
  return true
}

listServices.getAllOrder = (query, userLocal) => {
  const current = Number(query?.current) || 1
  const pageSize = Number(query?.pageSize) || 5
  let body = {}
  body.isDelete = false;
  if(query.start && query.end) {
    body = {
      ...body,
      ...{
        $and: [{
          createdAt: {
            $gte: query.start
          }
        },{
          createdAt: {
            $lte: query.end
          }
        }]
      }
    }
  }
  if(query?.oid){
    body.oid = query.oid
  }

  if(query?.status){
    body.status = query.status
  }
  if(userLocal.role === "ADMIN"){
    const orders = OrderModel.find(body)
                  .skip((current - 1) * pageSize)
                  .limit(pageSize)
                  .populate(["idUser", "idProduct"])
                  .sort({ createdAt: -1 })
                  .lean().exec()
    const totalCount = OrderModel.countDocuments(body).lean().exec()
    return {
      orders,
      totalCount
    }
  }

  body.idUser = userLocal._id
  const orders = OrderModel.find(body).skip((current - 1) * pageSize).limit(pageSize).sort({ updatedAt: -1 }).lean().exec()
  const totalCount = OrderModel.countDocuments(body).lean().exec()
  return {
    orders,
    totalCount
  }
}

listServices.updateProduct = async (id, newProduct) => {
  const product = await OrderModel.findOne({_id: id}).lean().exec();
  if(!product){
    throw new Error('Sản phẩm không tồn tại vui lòng thử lại')
  }
  newProduct.updatedAt = Date.now()
  return OrderModel.updateOne({_id: id}, newProduct).lean().exec()
}

listServices.updateStatusOrder = async (id, newStatus) => {
  const product = await OrderModel.findOne({_id: id}).lean().exec();
  if(!product){
    throw new Error('Order không tồn tại vui lòng thử lại')
  }
  return OrderModel.updateOne({_id: id}, { status: newStatus, updatedAt: Date.now()}).lean().exec()
}


listServices.deleteProduct = (id) => {
  return OrderModel.updateOne({_id: id}, {
    deletedAt: Date.now(),
    isDelete: true
  }).lean().exec()
}

module.exports = listServices