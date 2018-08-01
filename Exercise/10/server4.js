const express=require("express")
const myPlugin=require("./libs/my-plugin")

var server=express();
server.listen(9999)

server.use(myPlugin.aaa())

server.use("",function(req,res){
	console.log(req.body)
})