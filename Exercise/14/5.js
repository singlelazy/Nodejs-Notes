const ejs =require("ejs")

ejs.renderFile('./view/5.ejs',{},function(err,data){
	console.log(data)
})