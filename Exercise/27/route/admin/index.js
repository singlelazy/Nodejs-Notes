const express=require('express');
const common=require('../../libs/common');

module.exports=function (){
var router=express.Router();

//检查登陆状态
  router.use((req,res,next)=>{
  	if(!req.session['admin_id']&& req.url!='/login'){
  		res.redirect('/admin/login') 
  	}else{
  		next();
  	}
  })  
//
  router.get('/',(req,res)=>{
    res.render('admin/index.ejs',{})
  })

  router.use('/login',require('./login.js')())
  router.use('/banner',require('./banner.js')())
  router.use('/custom',require("./custom.js")())



  return router;
};
