const express=require("express")
const queryString=require("querystring")

var server=express();
server.listen(9999)

server.use(function(req,res,next){
	var str="";
	req.on("data",function(data){
		str+=data;
	})
	req.on("end",function(){
		req.body=queryString.parse(str) ;
		next();
	})
})

server.use("",function(req,res){
	console.log(req.body)
})