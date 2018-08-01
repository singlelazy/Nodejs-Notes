const ejs =require("ejs")

ejs.renderFile('./view/3.ejs',{json:{arr:[
	{user:'blue',pass:"123456"},
	{user:'white',pass:"123456"},
	{user:'yellow',pass:"123456"},
]}},function(err,data){
	console.log(data)
})