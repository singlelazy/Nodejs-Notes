const express=require("express")
const bodyParser=require("body-parser")

var server=express();

server.use(bodyParser.urlencoded({}))
server.use("/",function(req,res,next){
	console.log("a")
	next()
})
server.use("",function(req,res,next){
	console.log("b");
})

server.listen(9999)