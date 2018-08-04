  const express=require('express');
  const mysql=require('mysql')
  const common=require('../../libs/common')
  const pathLib=require('path')
  const fs=require('fs')
  var db=mysql.createPool({host:'localhost',user:'root',password:'ys3872',database:'learn'})


  module.exports=function(){
  	var router=express.Router();
  	router.get('/',function(req,res){
      switch(req.query.act){
        case 'del':
        //删除图片
            db.query(`SELECT * FROM custom_evaluation_table WHERE ID=${req.query.id}`,(err,data)=>{
              if(err){
                console.log(err);
                res.status(500).send(err).end()
              }else{
                if(data.length==0){
                  res.status(404).send('no data').end()
                }else{
                  fs.unlink('static/upload/'+data[0].src,(err)=>{
                    if(err){
                      console.log(err)
                      res.status(500).send('file opration error').end()
                    }else{
                      db.query(`DELETE FROM custom_evaluation_table WHERE ID=${req.query.id}`,(err,data)=>{
                        if(err){
                          console.log( err);
                          res.status(500).send(err).end()
                        }else{
                          res.redirect('/admin/custom')
                        }
                      })
                    }
                  })
                }
              }
            })
          break;
        case 'mod':
        
          break;
        default:
      		db.query(`SELECT * FROM custom_evaluation_table`,(err,evaluations)=>{
      			if(err){
      				res.status(500).send(err).end()
      			}else{
      				res.render('admin/custom.ejs',{evaluations})
      			}
      		})
      }
  	})

    router.post('',function(req,res){
      var title=req.body.title;
      var description=req.body.description;
      var ext=pathLib.parse(req.files[0].originalname).ext
      var oldPath=req.files[0].path;
      var newPath=req.files[0].path+ext;
      var newFilename=req.files[0].filename+ext;

      fs.rename(oldPath,newPath,(err)=>{
        if(err){
          res.status(500).send('file opration error').end()
        }else {
          if(req.body.mod_id){//修改

          }else{
            db.query(`INSERT INTO custom_evaluation_table \
              (title,description,src)
              VALUES('${title}','${description}','${newFilename}')`,
              (err,data)=>{
                if(err){
                  res.status(500).send(err).end()
                }else{
                  res.redirect('/admin/custom')
                }
              });
          }
        }
      })

    })
  	return router;
  }