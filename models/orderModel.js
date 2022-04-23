var mongoose = require("../config/dbConfig");
let orderSchema = mongoose.Schema({
    title: String,
    description: String,
    oid: {
      type: String,
      default: function(){
        let id = this._id.toString()
        return id.substring(id.length - 6, id.length).toUpperCase()
      }
    },
    idProduct: {
      type: String,
      ref: 'product'
    },
    idUser: {
      type: String,
      ref: 'account'
    },
    quantity: {
      type: Number,
      default: 0
    },
    price: Number,
    status: {
      type: String,
      enum: ["DONE", "DOING", "PENDING"],
      default: "PENDING"
    },
    isDelete: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Number,
      default: Date.now()
    },
    updatedAt: {
      type: Number,
      default: Date.now()
    },
    deletedAt: {
      type: Number,
      default: Date.now()
    }
});

let OrderModel = mongoose.model("order", orderSchema);
module.exports = OrderModel;
