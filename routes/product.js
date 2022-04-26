var express = require('express');
var router = express.Router();
const productServices = require("../services/product")
const { sendError, sendSuccess } = require('../utils/index');
const { checkAuth, checkAdmin, checkStatusBlockUser } = require( '../middlewares/checkAuth');
const {  checkDir, checkFileType } = require('../services/upload/checkDir')
const {  createThumb } = require('../services/upload')
router.get('/', checkAuth, checkStatusBlockUser, async function(req, res, next){
  try {
    const result = await productServices.getAllProduct(req.query, req.user)
    return res.status(200).json(sendSuccess("Hiển thị thành công", {
      products: await result.products,
      totalCount: await result.totalCount
    }))
  } catch (error) {
    return res.status(500).json(sendError("Lỗi không xác định, vui lòng thử lại"))
  }
})


router.get('/top-ten', checkAuth, checkStatusBlockUser, checkAdmin, async function(req, res, next){
  try {
    const result = await productServices.getTopTenProduct()
    return res.status(200).json(sendSuccess("Hiển thị thành công", {
      products: result,
    }))
  } catch (error) {
    if(error?.message){
      return res.status(500).json(sendError({message: error.message}))
    }
    return res.status(500).json(sendError("Lỗi không xác định, vui lòng thử lại"))
  }
})


router.get('/pid/:pid', checkAuth, checkStatusBlockUser, async function(req, res, next){
  try {
    const result = await productServices.getProductByPID(req.params.pid)
    return res.status(200).json(sendSuccess("Hiển thị thành công", {
      product: result,
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
    const result = await productServices.createProduct(req.body)
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
    const result = await productServices.updateStatusProduct(req.params.id, req.body.status)
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
    const result = await productServices.updateProduct(req.params.id, req.body)
    return res.status(200).json(sendSuccess("Cập nhật thành công"))
  } catch (error) {
    if(error?.message){
      return res.status(500).json(sendError({message: error.message}))
    }
    return res.status(500).json(sendError("Lỗi không xác định, vui lòng thử lại"))
  }
})

router.post('/upload-thumb', checkAuth, checkStatusBlockUser, checkAdmin, async function(req, res, next){
  checkDir()
  createThumb(req, res)
})

router.delete('/:id',checkAuth, checkStatusBlockUser, checkAdmin, async function(req, res, next){
  try {
    await productServices.deleteProduct(req.params.id)
    return res.status(200).json(sendSuccess("Xóa thành công" ))
  } catch (error) {
    if(error?.message){
      return res.status(500).json(sendError({message: error.message}))
    }
    return res.status(500).json(sendError("Lỗi không xác định, vui lòng thử lại"))
  }
})

module.exports = router;
