const express=require("express")
const cookieParser=require("cookie-parser")

var server=express();

server.use(cookieParser())
//cookie
server.use('/www/a.html',function(req,res){
	console.log(req.cookies)
	res.send("OK")

})
server.listen(8080)