var express=require('express');
var app=express();
var bodyParser=require('body-parser');

var mysql=require('mysql');
var conn=require('./connect');
var conn;

var Usernamee;
var Passwordd;

app.set('view engine','ejs');

var jsonParser=bodyParser.json();

app.use(bodyParser.urlencoded({extended:false}));
app.get('/',function(req,res){
    res.render("signup");
    // conn=mysql.createConnection({host:"localhost",user: 'root',password: '',database: 'chitkara_sem5'});

})

app.post('/save',function(req,res){
    var name=req.body.uname;
    var pass=req.body.pass;
    var fname=req.body.fname;
    var gen=req.body.gen;
    var phno=req.body.phno;
    // conn.connect(function(error){
    //     if(error) throw error;
        conn.query("select Username from project_2 where Username=? ",[name],function(error,result){
            if (error) throw error;
            console.log(result);

            if(result.length == 0)  {
                var sql="insert into project_2(Username,Password,FirstName,Gender,PhoneNumber) values('"+name+"','"+pass+"','"+fname+"','"+gen+"','"+phno+"')";
                conn.query(sql,function(error,result1){
                    
                    if(error) throw error;
                    console.log("Record saved successfully");
                })
                // conn.end();
                res.redirect("/login");

             }
           else {
                // conn.end();
                res.render("error_page");
            }

        
        })
      
    })
    
   
// })

app.get('/login',function(req,res){
    res.render("login");
})

app.post('/validate',function(req,res){
    var uname=req.body.uuname;
    var ppass=req.body.ppass;
    conn.query("select * from project_2 where Username=? AND Password=?",[uname,ppass],function(error,result){
        // console.log(result);


        if(result.length == 0)  {
            // res.redirect("/menu");
            res.render("error_page2");
            
         }
       else {
            Usernamee=result[0].Username;
            Passwordd=result[0].Password;
            res.redirect("/menu");
        }

    
    })
})

app.get('/menu',function(req,res){
    res.render("menu");
})

app.get('/output',function(req,res){
    conn.query("select * from project_2 where Username=? AND Password=?",[Usernamee,Passwordd],function(error,result){
        // console.log(result);


        if(result.length == 0)  {
            // res.redirect("/menu");
            res.render("error_page2");
            
         }
       else {
            
            res.render("resultt",{result:result});
        }

    
    })
})

app.get('/update_pass',function(req,res){
    res.render("update_passs");
})



app.post('/update_pas',function(req,res){
        var oldpass=req.body.oldpass;
        var newpass=req.body.newpass;


        if(oldpass == Passwordd)  {
            // res.redirect("/menu");
            conn.query("update project_2 set Password=? where Username=? AND Password=?",[newpass,Usernamee,Passwordd],function(error,result){
                res.render("last_update");
            
            })

            
         }
       else {
            
        res.render("last_error");
        }

    
    })




app.listen(4444);