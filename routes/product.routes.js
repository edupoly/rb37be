var express = require('express');
var router = express.Router();
var Product = require("../models/Product.model")

router.get("/allproducts",function(req,res){
    Product.find({}).then(function(data){
        res.json(data)
    }).catch(function(){})
    
})

router.get("/best/:pn",function(req,res){
    res.send(`${req.params.pn} related products theesko`)
})

module.exports = router;