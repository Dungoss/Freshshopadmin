var express = require('express');
var router = express.Router();
const accountServices = require("../services/account")
const { sendError, sendSuccess } = require('../utils/index');
const AccountModel = require('../models/accountModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
router.post('/sign-up', async function(req, res, next) {
  try {
    const user = await accountServices.checkAccountExist(req.body.email)
    if(user) {
      return res.status(400).json(sendError({message:"Tại khoản đã tổn tại"}))
    }
    req.body.role = "USER"
    const newUser = new AccountModel(req.body)
    await newUser.save()
    return res.status(200).json(sendSuccess({message: "Tạo thành công"}))
  } catch (error) {
    return res.status(500).json(sendError({message: "Lỗi không xác định, vui lòng thử lại"}))
  }

})


router.post('/login', async function(req, res, next) {
  try {
    const user = await accountServices.checkAccountExist(req.body.email)
    if(!user) {
      return res.status(400).json(sendError({message: "Sai tài khoản hoặc mật khẩu"}))
    }
    const checkPassword = await bcrypt.compareSync(req.body.password, user.password); // true
    if(checkPassword){
      user.password = undefined;
      const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "10d" });
      return res.status(200).json(sendSuccess({message: "Đăng nhập thành công"}, {token, user}))
    }
    return res.status(400).json(sendError({message: "Sai tài khoản hoặc mật khẩu"}))
  } catch (error) {
    return res.status(500).json(sendError({message: "Lỗi không xác định, vui lòng thử lại"}))
  }

})

module.exports = router;
