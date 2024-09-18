var mongoose = require('mongoose');
var ProductSchema = mongoose.Schema(
{
    "id":Number,
    "title":String,
    "price":Number,
    "description":String,
    "image":String
})
var Product = mongoose.model("product",ProductSchema);
module.exports=Product;