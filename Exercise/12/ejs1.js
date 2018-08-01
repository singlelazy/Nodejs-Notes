const ejs=require("ejs")

var str=ejs.renderFile('./view/1.ejs',{name:'blue'},function(err,data){
	if(err)
		console.log("编译失败")
	else
		console.log(data)
})

console.log(str)