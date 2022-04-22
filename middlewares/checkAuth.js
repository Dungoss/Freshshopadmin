const jwt = require('jsonwebtoken');
const clientRedis = require('../config/redis.js');
const { sendError } = require('../utils/index');
const AccountModel = require('../models/accountModel')
async function checkAuth(req, res, next) {
    var token = null;
    if (req.cookies && req.cookies['token']) {
        token = req.cookies['token'];
    }

    if (req.body.token) {
        token = req.body.token;
    }

    var authHeader = req.headers.authorization || '';
    if (authHeader.startsWith('Bearer ') || authHeader.startsWith('bearer ')) {
        token = authHeader.substring(7, authHeader.length);
    }
    // check backlist token
    const tokenUsed = await clientRedis.LRANGE('token', 0, -1);
    if (tokenUsed.includes(token)) {
        return res.status(500).json(sendError(INVALID_TOKEN));
    }

    try {
        // decode token
        const decode = await jwt.verify(token, process.env.JWT_SECRET);
        if (!decode) {
            res.status(500).json(sendError(INVALID_TOKEN));
        }
        let userLocal = await AccountModel.findById(decode._id);
        userLocal.password = undefined;
        req.user = userLocal;
        next();
    
    } catch (error) {
        res.status(500).json(sendError("Bạn chưa đăng nhập"));
    }
}

let checkAdmin = (req, res, next) => {
    if (req.user.role === 'ADMIN') {
        next();
    } else {
        return res.status(403).json(sendError("Bạn không có quyền"))
    }
}

let checkStatusBlockUser = (req, res, next) => {
    if(req.user.status === "ACTIVE"){
        next();
    }else{
        return res.status(400).json(sendError("Tài khoản đã bị khóa")) 
    }
}

module.exports = { 
  checkAuth,
  checkAdmin,
  checkStatusBlockUser
};