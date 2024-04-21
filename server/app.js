//import libraries
const express=require("express");
const app=express();
const routes=require("./routes/routers");
// const mysql=require("mysql")
// const bodyparser=require("body-parser");
const bodyParser = require("body-parser");

//define middleware
app.use(bodyParser.json())

//configure the application
//CORS settings
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'content-type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

//define url handler
app.use("/",routes)

//start the server
app.listen(3001,()=>{
    console.log("server is running on port 3001")
})

module.exports=app;


