const UserModel = require('../models/accountModel');
const bcrypt = require('bcrypt');
const listServices = {}

listServices.checkAccountExist = (email) => {
  return UserModel.findOne({ email: email }).lean().exec()
}
listServices.createNewAccount = async (body) => {
  const user = await UserModel.findOne({ email: body.email }).lean().exec()
  if (user) {
    throw new Error("Tài khoản đã tồn tại")
  }
  const newUser = new UserModel(body)
  await newUser.save()
  return true

}



listServices.getAllAccount = (paginate, userLocal) => {
  const current = Number(paginate?.current) || 1
  const pageSize = Number(paginate?.pageSize) || 5
  const users = UserModel.find({ _id: { $ne: userLocal.id } }).select({ password: 0 }).skip((current - 1) * pageSize).limit(pageSize).sort({ updatedAt: -1}).lean().exec()
  const totalCount = UserModel.countDocuments({ _id: { $ne: userLocal.id } }).lean().exec()
  return {
    users,
    totalCount
  }
}

listServices.updateAccount =async (id, newUser) => {
  let user = await UserModel.findOne({ _id: id }).lean().exec()
  if (!user) {
    throw new Error("Tài khoản không tồn tại")
  }
  if(newUser?.password){
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newUser.password, salt);
    newUser.password = hash
  }
  newUser.updatedAt = Date.now()
  return UserModel.findByIdAndUpdate(id, newUser)
}
listServices.updateStatus = (id, newUser) => {
  newUser.updatedAt = Date.now()
  return UserModel.updateOne({ _id: id }, newUser)
}

listServices.deleteUser = (id) => {
  return UserModel.deleteOne({ _id: id })
}

module.exports = listServices

