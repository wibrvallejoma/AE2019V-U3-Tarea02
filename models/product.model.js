const mongoose = require("mongoose");
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

let productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  brand: {
    type: ObjectId,
    ref: "Brand"
  }
});

const productModel = mongoose.model("Product", productSchema, "products");

module.exports = productModel;
