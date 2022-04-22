const UserModel = require('../models/accountModel');

const listServices = {}

listServices.checkAccountExist = (email) => {
  return UserModel.findOne({email: email}).lean().exec()
}

module.exports = listServices

