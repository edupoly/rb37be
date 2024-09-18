const express = require('express')
const router = express.Router()

router.get("/",function(req,res){
    res.send("this is default route")
})

router.get("/allOrders",function(req,res){
    res.send("all orders theesko")
})

router.get("/allReturnOrders",function(req,res){
    res.send("ivi nuvvu return chesina orders");
})

router.get("/allCurrentOrders",function(req,res){
    res.send("ivi ippudu transit lo unna orders")
})

router.get("**",function(req,res){
    res.send("404 error")
})

module.exports = router;
// route and root(/)