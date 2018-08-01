const ejs =require("ejs")

ejs.renderFile('./view/4.ejs',{},function(err,data){
	console.log(data)
})