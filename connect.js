var mysql=require('mysql');
var conn=mysql.createConnection({host:"localhost",user: 'root',password: '',database: 'chitkara_sem5'});
// var conn=mysql.createConnection({host:"localhost",user:"root",password:"",database:"chitkara_sem5"})

module.exports = conn;