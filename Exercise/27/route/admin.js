const express=require('express');
const common=require('../libs/common');
var mysql=require('mysql')

var db=mysql.createPool({host:'localhost',user:'root',password:'ys3872',database:'learn'})
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
  router.get('/login',function(req,res){
    res.render('admin/login.ejs',{});
  })
  router.post('/login', function (req, res){
  	var username=req.body.username;
    var password=common.md5(req.body.password+common.MD5_SUFFIX);

    db.query(`SELECT * FROM admin_table WHERE username='${username}'`,(err,data)=>{
      if(err){
                res.status(500).send(err).end()
      }else{
        if(data.length==0){
          res.status(400).send('no this admin').end()
        }else{
          if(data[0].password==password){
            //成功
            req.session["admin_id"]=data[0].ID;
            res.redirect('/admin/')
          }else{
            res.status(400).send('密码错误').end()
          }
        }
      }
    })
  });

  router.get('/',(req,res)=>{
    res.render('admin/index.ejs',{})
  })
  router.get('/banner',(req,res)=>{
    res.render('admin/banner.ejs',{})
  })
  return router;
};
