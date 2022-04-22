const jwt = require('jsonwebtoken');
// const clientRedis = require('../config/redis');
// const util = require('util');
// clientRedis.get = util.promisify(clientRedis.get);
const { sendError } = require('../utils/index');

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
    clientRedis.lrange('token', 0, -1, async(err, result) => {
        if (result.includes(token)) {
            return res.status(500).json(sendError(INVALID_TOKEN));
        }

        try {
            // decode token
            const decode = await jwt.verify(token, process.env.JWT_SECRET);
            if (!decode) {
                res.status(500).json(sendError(INVALID_TOKEN));
            }
            req.id = decode._id
            let userLocal = await AccountModel.findById(decode._id);
            userLocal.password = undefined;
            req.user = userLocal;
            next();
        
        } catch (error) {
            res.status(500).json(sendError(LOGIN));
        }
    });
}

let checkActive = (req, res, next) => {
    if(req.user.status == 'active') {
        next();
    } else {
        return res.status(400).json(sendError(NEED_ACTIVE));
    }
}



let checkAdmin = (req, res, next) => {
    if (req.user.role == 'ADMIN') {
        next();
    } else {
        return res.status(400).json(sendError(NOT_PERMISSON))
    }
}

let checkStatusBlockUser = (req, res, next) => {
    if(req.user.status !== "BLOCK"){
        next();
    }else{
        return res.status(400).json(sendError()) 
    }
}

module.exports = { 
  checkAuth,
  checkActive,
  checkAdmin,
  checkStatusBlockUser
};