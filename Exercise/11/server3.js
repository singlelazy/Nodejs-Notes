const express=require("express")
const cookieParser=require("cookie-parser")

var server=express();

server.use(cookieParser("wasdqwer"))
//cookie
server.use('/',function(req,res){
	req.secret='wasdqwer'
	res.cookie("user","blue",{signed:true})
	res.send("OK") 

})
server.listen(8080)