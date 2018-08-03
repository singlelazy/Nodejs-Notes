const express=require('express')
const multer=require('multer')
const multerObj=multer({dest: './static/upload'});
var server=express();
server.listen(8888)

server.use(multerObj.any())

server.use('/',(req,res)=>{
	console.log(req.file)
	res.send('ok').end()
})