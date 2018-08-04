  const express=require('express');
  const mysql=require('mysql')
  var db=mysql.createPool({host:'localhost',user:'root',password:'ys3872',database:'learn'})

  module.exports=function(){
    var router =express.Router();

    router.get('/',(req,res)=>{
      switch(req.query.act){
        case 'mod':
          db.query(`SELECT * FROM banner_table WHERE ID=${req.query.id}`,(err,mod_data)=>{
            if(err){
              res.status(500).send("database").end()
            }else if(mod_data.length==0){
              res.status(400).send("data not found").end()
            }else{
                db.query(`SELECT * FROM banner_table`,(err,banner_data)=>{
                  if(err){
                      res.status(500).send('database error').end()
                    }else{
                      res.render('admin/banner.ejs',{banner_data:banner_data,mod_data:mod_data[0]})
                    }
                })
            }
          })
          break;
        case 'del':
            db.query(`DELETE FROM banner_table WHERE ID=${req.query.id}`,(err,data)=>{
            if(err){
              res.status(500).send("database").end()
            }else{
              res.redirect('/admin/banner')
            }
          })
          break;
        default:
          db.query(`SELECT * FROM banner_table`,(err,data)=>{
            if(err){
                res.status(500).send('database error').end()
              }else{
                res.render('admin/banner.ejs',{banner_data:data})
              }
          })
      }
    })

    router.post('/',(req,res)=>{
      var title=req.body.title;
      var description=req.body.description;
      var href=req.body.href;
      if(!title || !description || !href){
          res.status(400).send('arg error').end()
      }else{
          if(req.body.mod_id){//修改
            db.query(`UPDATE banner_table SET \
              title='${req.body.title}',\
              description='${req.body.description}',\
              href='${req.body.href}' \
              WHERE ID=${req.body.mod_id}`,
              (err,data)=>{
                if(err){
                  console.log(err)
                  res.status(500).send('database error').end()
                }else{
                  res.redirect('/admin/banner')
                }
              }
            );
          }else{
            db.query(`INSERT INTO banner_table (title,description,href) VALUE('${title}','${description}','${href}')`,(err,data)=>{
              if(err){
                res.status(500).send('database error').end()
              }else{
                res.redirect('/admin/banner')
              }
            })
          }
      }
    })

    return router;
  }