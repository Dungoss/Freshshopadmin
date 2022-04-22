var express = require('express');
var router = express.Router();
const accountServices = require("../services/account")
const { sendError, sendSuccess } = require('../utils/index');
const AccountModel = require('../models/accountModel');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/', async function(req, res, next){
  try {
    const result = await accountServices.getAllAccount(req.query)
    return res.status(200).json(sendSuccess("Hiển thị thành công", {
      users: result
    }))
  } catch (error) {
    return res.status(500).json(sendError("Lỗi không xác định, vui lòng thử lại"))
  }
})


module.exports = router;
