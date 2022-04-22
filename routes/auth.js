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
      return res.status(400).json(sendError("Tại khoản đã tổn tại"))
    }
  
    const newUser = new AccountModel(req.body)
    await newUser.save()
    return res.status(200).json(sendSuccess("Tạo thành công"))

  } catch (error) {
    return res.status(500).json(sendError("Lỗi không xác định, vui lòng thử lại"))
  }

})


router.post('/login', async function(req, res, next) {
  try {
    const user = await accountServices.checkAccountExist(req.body.email)
    if(!user) {
      return res.status(400).json(sendError("Sai tài khoản hoặc mật khẩu"))
    }
<<<<<<< HEAD
    const checkPassword = await bcrypt.compareSync(req.body.password, user.password); // true
    if(checkPassword){
      user.password = undefined;
=======
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: 15 * 60 * 1000 });

    const checkPassword = await bcrypt.compareSync(req.body.password, user.password); // true
    if(checkPassword){
>>>>>>> 115744e76cef0afdbdb83d7b6dd9a5c55ad7cb86
      const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "10d" });
      return res.status(200).json(sendSuccess("Đăng nhập thành công", {token}))
    }
    return res.status(400).json(sendError("Sai tài khoản hoặc mật khẩu"))
  } catch (error) {
    return res.status(500).json(sendError("Lỗi không xác định, vui lòng thử lại"))
  }

})

module.exports = router;
