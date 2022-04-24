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
        return res.status(500).json(sendError({ message: 'Token không tồn tại'}));
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
        return next();
    
    } catch (error) {
        return res.status(401).json(sendError({ message: "Bạn chưa đăng nhập" }));
    }
}

let checkAdmin = (req, res, next) => {
    if (req.user.role === 'ADMIN') {
        return next();
    } else {
        return res.status(403).json(sendError({ message: "Bạn không có quyền" }))
    }
}

let checkStatusBlockUser = (req, res, next) => {
    if(req.user.status === "ACTIVE"){
        return next();
    }else{
        return res.status(400).json(sendError({message: "Tài khoản đã bị khóa"})) 
    }
}

module.exports = { 
  checkAuth,
  checkAdmin,
  checkStatusBlockUser
};