const express=require("express")
const cookieParser=require("cookie-parser")
const cookieSession=require("cookie-session")

var server=express();

server.use(cookieParser())
server.use(cookieSession({
	name:"sess",
	keys:["aaa","bbb","ccc"]
	maxAge:2*3600*1000  
}))
//cookie
server.use('/',function(req,res){
	//查看用户访问次数	
	if(req.session['count']==null){
		req.session['count']=0;
	}else{
		req.session['count']++
	}
	res.send("OK")

})
server.listen(8080)