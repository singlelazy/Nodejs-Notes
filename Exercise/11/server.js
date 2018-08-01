const express=require("express")

var server=express();

//cookie
server.use('/www/a.html',function(req,res){
	res.cookie('user',"blue",{path:"/www",maxAge:7*24*3600*1000})
	res.send("OK")
})
server.listen(8080)