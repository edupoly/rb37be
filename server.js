var express = require('express');
var cookieParser = require('cookie-parser')
var session = require('express-session')
var orders = require('./routes/orders.routes');
var products = require('./routes/product.routes')
var os = require('os')
var mongoose = require('mongoose');
var app = express();
var users = [
    {
        username:'nani',
        password:"123"
    },
    {
        username:'sony',
        password:"234"
    }
]
var cors = require('cors')
var bodyParser = require('body-parser');
mongoose.connect(process.env.MONGO_URL);
console.log("environment variables are::",process.env['MONGO_URL'])
app.use(cors())
app.use(cookieParser())
app.use(session({
    secret: 'Edo okati'
}))

app.use(bodyParser.urlencoded({extended:false}))//formdata
app.use(bodyParser.json())
app.use(express.static(__dirname+"/public"))

app.get("/getServerDetails",function(req,res){
    res.send(JSON.stringify(os.networkInterfaces()))
})
app.get("/freememorydetails",function(req,res){
    console.log(os.freemem())
    res.send(JSON.stringify(os.freemem()))
})
app.use("/orders",orders)
app.use("/products",products)

app.use(function(req,res,next){
    if(req.session.count){
        req.session.count++;
    }
    else{
        req.session.count=1;
    }
    console.log(req.session.count)
    next();
})

app.get("/login",function(req,res){
    console.log(session)

    var x = users.some(function(user){
        if(user.username===req.query.username && user.password===req.query.password){
            return true
        }
    })
    if(x===true){
        req.session.username=req.query.username;
        req.session.password=req.query.password;
        res.redirect("/home.html")
    }
    else{
        res.redirect("./errorlogin.html")
    }

})
function checkLogin(req,res,next){
    if(req.session.username){
        console.log(req.session.username+" sent the request")
        next()
    }
    else{
        res.redirect("/login")
    }
}

app.use(checkLogin)

app.get("/",function(req,res){
    res.redirect("/home.html")
})



app.get("/pqr",function(req,res){
    res.send("Yes pqr is online")
})



app.get("/abc",function(req,res){
    console.log("abc route for get method called")
    res.send("Hello .... ABC request received")
})

app.get("/abc/:x/:y",function(req,res){
    console.log("abc route for get method called")
    res.send("Hello .... ABC with"+req.params.x+" request received")
})

// app.use(function(req,res,next){
//     console.log('hello first middleware')
//     next();
// })

app.get("/add",function(req,res){
    console.log(req.params)
    console.log(req.query)
    res.send("Addition is::"+(+req.query.num1+ +req.query.num2))
})
//dynamic rounting
//parameterised Routing
app.get("/add/:a/:b",function(req,res){
    
    res.send("addition"+(+req.params.a+ +req.params.b))
    
})

app.post("/add",function(req,res){
    console.log(req.body)
    res.json({ans:(+req.body.num1+ +req.body.num2)})
})

app.post("/xyz",function(req,res){
    console.log("post req for xyz")
    res.json("Received POST request for xyz route")
})

app.get("/xyz",function(req,res){
    console.log("xyz route for get method called")
    res.send("Hello .... request received and this is response from xyz route")
})

app.listen(process.env.PORT)

// params
// queryparams
// payload
// formdata
// body