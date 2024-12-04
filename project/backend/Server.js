const express = require('express');
const mysql = require("mysql")


const app = express();
const port = 5009;
const cors = require('cors');
app.use(cors())
app.use(express.json())

const server = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'sample database'
})
server.connect((err) => {
   if (err) {
      console.log("error", err)
   }
   else {
      console.log("db is connected")
   }
})

app.post('/register', (req, res) => {
   const { Fristname, Lastname, Username, Email, Password, Conformpassword } = req.body;
   const checkexistdata = `SELECT * from sampletable2 WHERE email=?`;
   const sql = `INSERT INTO sampletable2(Fristname,Lastname,Username,Email,Password,Conformpassword) VALUES (?,?,?,?,?,?)`
   try {
      server.query(checkexistdata, [Email], (err, result) => {
         if(err){
            console.log(err);
         }
        else if (result.length > 0) {
            return res.status(200).json({ sucesses: "flase", message: "email already exists" })
         }
         else {
            server.query(sql, [Fristname, Lastname, Username, Email, Password, Conformpassword], (error, result) => {
               if (error) {
                  console.log('database error:', error)
                  return res.status(400).json({ sucesses: 'false', message: 'registeration failed' })
               }
               else {
                  console.log('sucessfully registered')
                  return res.status(200).json({ sucesses: 'true', message: 'registeration done' })
               }
            })
      
         }
      })
   
     
   } catch (error) {
      console.log('catch'+error);
   }
})

app.post('/login',(req,res)=>{
   const{username,password}=req.body;
   const checklogindetails = `SELECT * from sampletable2 WHERE Username=? AND Password=?`
   try{
       server.query(checklogindetails,[username,password],(err,result)=>{
         if(err){
            return res.status(400).json({sucesses:'loginuser-false' , message:'sorry , please try again later'})
         }
         else if(result.length === 0){
            return res.status(400).json({sucesses:'user-false',message:'invalid user name or password'})
         }
         else if(result.length != 0){

            return res.status(200).json({sucesses:'true',message:'you logged in sucessfully'})
         }
       })
   }
   catch(error){
      console.log(error)
   }
})
 
app.post('/homepage',(req,res)=>{
   const {username} = req.body;
   const getusedata= `SELECT * from sampletable2 WHERE Username=?`
   try{
      server.query(getusedata,[username],(err,result)=>{
         if(err){
            console.log(err);
            return res.status(400).json({sucesses:'false',message:'Trouble in login,please try again'})
         }
         else if(result.length===0){
            console.log(result)
            return res.status(400).json({sucesses:'false',message:'no attempt for login'})
         } 
         else if(result){
            console.log(result)
           return (res.status(200).json({sucesses:'true',message: result }))
         }
      })
   }
   catch(error){
      console.log(error)
   }
})



app.listen(port, () => {
   console.log(" server is running")
})
