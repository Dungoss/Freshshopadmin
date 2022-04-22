const UserModel = require('../models/accountModel');

const listServices = {}

listServices.checkAccountExist = (email) => {
  return UserModel.findOne({ email: email }).lean().exec()
}

listServices.getAllAccount = (paginate) => {
  const page = Number(paginate?.page) || 1
  const perPage = Number(paginate?.perPage) || 20
  return UserModel.find().select({ password: 0 }).skip((page - 1) * perPage).limit(perPage).lean().exec()
}

listServices.updateAccount = (id, newUser, user) => {
  newUser.updatedAt = Date.now()
  return UserModel.updateOne({id: id}, {newUser})
}

module.exports = listServices

