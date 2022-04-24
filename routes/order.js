var express = require('express');
var router = express.Router();
const productServices = require("../services/product")
const orderServices = require("../services/order")
const { sendError, sendSuccess } = require('../utils/index');
const { checkAuth, checkAdmin, checkStatusBlockUser } = require( '../middlewares/checkAuth');
router.get('/', checkAuth, checkStatusBlockUser, async function(req, res, next){
  try {
    const result = await orderServices.getAllOrder(req.query, req.user)
    return res.status(200).json(sendSuccess("Hiển thị thành công", {
      orders: await result.orders,
      totalCount: await result.totalCount
    }))
  } catch (error) {
    if(error?.message){
      return res.status(500).json(sendError({message: error.message}))
    }
    return res.status(500).json(sendError("Lỗi không xác định, vui lòng thử lại"))
  }
})

router.post('/', checkAuth, checkStatusBlockUser, checkAdmin, async function(req, res, next){
  try {
    const result = await orderServices.createOrder(req.body)
    return res.status(200).json(sendSuccess("Tạo thành công"))
  } catch (error) {
    if(error?.message){
      return res.status(500).json(sendError({message: error.message}))
    }
    return res.status(500).json(sendError("Lỗi không xác định, vui lòng thử lại"))
  }
})

router.put('/status/:id', checkAuth, checkStatusBlockUser, checkAdmin, async function(req, res, next){
  try {
    const result = await orderServices.updateStatusOrder(req.params.id, req.body.status)
    return res.status(200).json(sendSuccess("Cập nhật thành công"))
  } catch (error) {
    if(error?.message){
      return res.status(500).json(sendError({message: error.message}))
    }
    return res.status(500).json(sendError("Lỗi không xác định, vui lòng thử lại"))
  }
})

router.put('/:id', checkAuth, checkStatusBlockUser, checkAdmin, async function(req, res, next){
  try {
    const result = await orderServices.updateProduct(req.params.id, req.body)
    return res.status(200).json(sendSuccess("Cập nhật thành công"))
  } catch (error) {
    if(error?.message){
      return res.status(500).json(sendError({message: error.message}))
    }
    return res.status(500).json(sendError("Lỗi không xác định, vui lòng thử lại"))
  }
})

router.delete('/:id',checkAuth, checkStatusBlockUser, checkAdmin, async function(req, res, next){
  try {
    await orderServices.deleteProduct(req.params.id)
    return res.status(200).json(sendSuccess("Xóa thành công" ))
  } catch (error) {
    if(error?.message){
      return res.status(500).json(sendError({message: error.message}))
    }
    return res.status(500).json(sendError("Lỗi không xác định, vui lòng thử lại"))
  }
})

module.exports = router;
