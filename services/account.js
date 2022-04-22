const UserModel = require('../models/accountModel');

const listServices = {}

listServices.checkAccountExist = (email) => {
  return UserModel.findOne({ email: email }).lean().exec()
}

listServices.getAllAccount = (paginate, userLocal) => {
  const current = Number(paginate?.current) || 1
  const pageSize = Number(paginate?.pageSize) || 5
  const users = UserModel.find({_id: { $ne: userLocal.id }}).select({ password: 0 }).skip((current - 1) * pageSize).limit(pageSize).lean().exec()
  const totalCount = UserModel.countDocuments({_id: { $ne: userLocal.id }}).lean().exec()
  return {
    users,
    totalCount
  }
}

listServices.updateAccount = (id, newUser, user) => {
  newUser.updatedAt = Date.now()
  return UserModel.updateOne({_id: id}, newUser)
}
listServices.updateStatus = (id, newUser) => {
  newUser.updatedAt = Date.now()
  return UserModel.updateOne({_id: id}, newUser)
}

listServices.deleteUser = (id) => {
  return UserModel.deleteOne({_id: id})
}

module.exports = listServices

