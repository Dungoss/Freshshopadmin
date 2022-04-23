var mongoose = require("../config/dbConfig");
let productSchema = mongoose.Schema({
    title: String,
    description: String,
    thumbnail: {
      type: String,
      default: "https://fakeimg.pl/250x100"
    },
    pid: {
      type: String,
      default: function(){
        let id = this._id.toString()
        return id.substring(id.length - 6, id.length).toUpperCase()
      }
    },
    isDelete: {
      type: Boolean,
      default: false
    },
    quantity: {
      type: Number,
      default: 0
    },
    price: Number,
    selled: { 
      type: Number,
      default: 0
    },
    totalPrice: Number,
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

let ProductModel = mongoose.model("product", productSchema);
module.exports = ProductModel;
