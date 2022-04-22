var express = require('express');
var router = express.Router();
const accountServices = require("../services/account")
const { sendError, sendSuccess } = require('../utils/index');
const { checkAuth, checkAdmin, checkStatusBlockUser } = require( '../middlewares/checkAuth');

router.get('/', checkAuth, checkStatusBlockUser, checkAdmin, async function(req, res, next){
  try {
    const result = await accountServices.getAllAccount(req.query, req.user)
    return res.status(200).json(sendSuccess("Hiển thị thành công", {
      users: await result.users,
      totalCount: await result.totalCount
    }))
  } catch (error) {
    return res.status(500).json(sendError("Lỗi không xác định, vui lòng thử lại"))
  }
})

router.put('/status/:id', async function(req, res, next){
  try {
    await accountServices.updateStatus(req.params.id, req.body)
    return res.status(200).json(sendSuccess("Cập nhật thành công" ))
  } catch (error) {
    return res.status(500).json(sendError("Lỗi không xác định, vui lòng thử lại"))
  }
})

router.delete('/:id', async function(req, res, next){
  try {
    await accountServices.deleteUser(req.params.id)
    return res.status(200).json(sendSuccess("Xóa thành công" ))
  } catch (error) {
    return res.status(500).json(sendError("Lỗi không xác định, vui lòng thử lại"))
  }
})

module.exports = router;
