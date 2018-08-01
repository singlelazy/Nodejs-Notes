const ejs =require("ejs")

ejs.renderFile('./view/1.ejs',{name:"blue"},function(err,data){
	console.log(data)
})