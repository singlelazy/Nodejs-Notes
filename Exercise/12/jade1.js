const jade=require("jade")
const fs=require("fs")

var str=jade.renderFile('./view/1.jade',{pretty:true})

fs.writeFile("./bulid/2.html",str,function(err){
	if(err)
		console.log("写入失败");
	else
		console.log("写入成功");
})