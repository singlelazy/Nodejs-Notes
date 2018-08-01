const express=require("express")
const expresStatic=	require("express-static")
var server=express();

var users={
	"blue":"123456",
	"yellow":"12213213",
	"white":"9876876"
}
server.get("/login",function(req,res){
	var user=req.query['user']
	var pass=req.query['pass']
	console.log(res)
	if(users[user]==null){
		res.send({ok:false,msg:"用户名不存在"})
	}else{
		if(users[user]!=pass){
			res.send({ok:false,msg:"密码错误"})
		}else{
			res.send({ok:true,msg:"登陆成功"})
		}
	}
})
server.use(expresStatic('./www'))
server.listen(8080)

