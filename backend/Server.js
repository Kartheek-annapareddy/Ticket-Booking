// VITE vX.X.X  ready in X ms  .
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
   const { Fullname, Email, Phonenumber, Password } = req.body;
   const checkexistdata = `SELECT * from sampletable2 WHERE email=?`;
   const sql = `INSERT INTO  sampletable2 (Fullname,Email,Phonenumber,Password) VALUES (?,?,?,?)`
   const sql2=`INSERT INTO personaldetails (User_id) VALUE (?)`
   const sql3=`INSERT INTO generdetails (User_id) VALUE (?)`
   try {
      server.query(checkexistdata, [Email], (err, result) => {
         if(err){
            console.log(err);
         }
        else if (result.length > 0) {
            return res.status(200).json({ sucesses: "false", message: "email already exists" })
         }
         else {
            
            server.query(sql, [Fullname,Email, Phonenumber, Password], (error, result) => {
               if (error) {
                  console.log('database error:', error)
                  return res.status(400).json({ sucesses: 'false', message: 'registeration failed' })
               }
               else {
                  console.log('sucessfully registered',result)
                  const user_id= result.insertId
                    console.log(user_id)
                  // return res.status(200).json({ sucesses: 'true', message: 'registeration done' })
                  server.query(sql2,[user_id],(err,result)=>{
                     if(err){
                        console.log('database error',err)
                        return res.status(400).json({sucesses:'false',message:'email doesnt added in the personal details'})
                     }
                     else{
                        console.log('email added sucessfully')
                     //    return res.status(200).json({sucesses:'true',message:['Registered Sucessfully','email added in presonal details']})
                       server.query(sql3,[user_id],(err,result3)=>{
                        if(err){
                           console.log(err,'database error')
                           return res.status(400).json({sucesses:'false',message:'error',err})
                        }
                        else{
                           console.log('susessfully added in three')
                           return (res.status(200).json({sucesses:'true',message:['Registered Sucessfully','email added in presonal details and gener details']}))                  
                        }
                       })
                  }
                  })
               }

            })
          }} )
          
   } catch (error) {
      console.log('catch'+error);
   }
})

app.post('/login',(req,res)=>{
   const{Email,password}=req.body;
   const checklogindetails = `SELECT * from sampletable2 WHERE Email=? AND Password=?`
   try{
       server.query(checklogindetails,[Email,password],(err,result)=>{
         if(err){
            return res.status(400).json({sucesses:'loginuser-false' , message:'sorry , please try again later'})
         }
         else if(result.length === 0){
            return res.status(400).json({sucesses:'user-false',message:'invalid user name or password'})
         }
         else if(result.length != 0){
            const User_id=result[0].User_id;
            return res.status(200).json({sucesses:'true',message:'you logged in sucessfully',User_id})
         }
       })
   }
   catch(error){
      console.log(error)
   }
})
 
app.get('/homepage/:User_id',(req,res)=>{
   const User_id = req.params.User_id;
   const getusedata= `SELECT * from sampletable2 WHERE User_id=?`
   try{
      server.query(getusedata,[User_id],(err,result)=>{
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

app.get('/userprofile/:User_id',(req,res)=>{
   const User_id=req.params.User_id
   const getuserdata=`SELECT * FROM sampletable2 INNER JOIN personaldetails ON sampletable2.User_id=personaldetails.User_id WHERE sampletable2.User_id=?`
   const getgenerdata=`SELECT * FROM generdetails WHERE User_id=?`

   try{
      server.query(getuserdata,[User_id],(err,result)=>{
         if(err){
            return( res.status(400).json({status:'false',message:'err'}))
            
         }
         else if(result.length===0){
            return( res.status(400).json({status:'false',message:'no attempts for login'}))
         }
         else if(result.length>0){ 
               var userdata = result[0]
               server.query(getgenerdata,[User_id],(genererr,result2)=>{
                  if(genererr){
                     console.log(22222)
                      return (res.status(400).json({status:'false',message:'error in fetching generdetails'}))
                  }
                  else{
                     var generdata = result2[0]
                     return (res.status(200).json({status:'true',message:{userdata:userdata,gener:[generdata]}}))
                  }
               })
                    }

      })
   }
   catch(error){
     console.log(error)
   }
})

//updating location
app.post('/Location',(req,res)=>{
   const{city,User_id}=req.body
   const updatelocation =`UPDATE sampletable2 SET Location=? WHERE User_id=?`
   server.query(updatelocation,[city,User_id],(err,result)=>{
      if(err){
         return res.status(400).json({status:'false',message:'error in updating the location'})
      }
      else if(result.affectedRows===1){
         console.log('res',result)
         return res.status(200).json({status:'true',message:'location updated'})
      }
   })
})

//edit profile
app.post('/editprofile', (req, res) => {
    const { userinfo,selectedGeners}=req.body
   const { User_id, Fullname, Email, Phonenumber, Age, Gender,Physicaladress } = userinfo;
   const query1 = `UPDATE sampletable2 SET Fullname=?, Email=?, Phonenumber=? WHERE User_id=?`;
   const query2 = `UPDATE personaldetails SET Age=?, Gender=?, Physicaladress=? WHERE User_id=?`;
   const query3=`DELETE FROM generdetails WHERE User_id=? `;
   const genersinfo=selectedGeners.toString();
   const query4 = `INSERT INTO generdetails (User_id,Favourategener) VALUES (?,?)`;
  
   // Validate required fields
   if (User_id===''|| Fullname==='' || Email==='' || Phonenumber==='') {
       return res.status(200).json({
           status: 'false',
           message: 'Accountdetails cannot be empty'
       });
   }

 else{
            

           // First query to update sampletable2
           server.query(query1, [Fullname, Email, Phonenumber,User_id], (err, result1) => {
           
               if (err) {
                   return res.status(400).json({
                           status: 'false',
                           message: 'Error updating main user details'
                         })};
            
          // Second query to update personaldetails table
               server.query(query2, [Age, Gender, Physicaladress, User_id], (err, result2) => {
                  console.log(result2)
                 
                   if(err){
                     return res.status(400).json({status:'false',message:'error in updating'})
                   }
                   else{
                      // third query to delete favourate geners
                      server.query(query3,[User_id],(err,result)=>{
                          if(err){
                           return res.status(400).json({status:'false',message:'error in deleting'})
                          }
                           console.log(genersinfo);
                          // fourth query to update geners details
                          server.query(query4,[User_id,genersinfo],(err2,result3)=>{
                           if(err2){
                              console.log(err2)
                              return res.status(400).json({status:'false',message:'error in updating',err2})
                           }
                           else{
                              // console.log(genersinfo)
                              return res.status(200).json({
                                 status:'true',
                                 message:'your profile updated'
                              })
                        
                          }})
                      }) 
                   }
                      
               });
           });
       };
  
});

//for changepassword api
 app.post('/Changepassword',(req,res)=>{
   var{Oldpassword,Newpassword,Confirmnewpassword,User_id}=req.body
   var oldpasswordcheck=`SELECT * FROM sampletable2 WHERE Password=? `
   var updatepassword=`UPDATE sampletable2 SET Password=? WHERE User_id=?`

   server.query(oldpasswordcheck,[Oldpassword],(err,result1)=>{
        if(result1.length===0){
         return res.status(400).json({status:'false',message:'Old Password is incorrect'})
        }
        else{
          server.query(updatepassword,[Newpassword,User_id],(err,result2)=>{
            if(err){
               return res.status(400).json({status:'false',message:'Failed to update password Please try after sometime'})
            }
            else{
               console.log(result2)
               return res.status(200).json({status:'true',message:'Password has been Updated Sucessfully'})
            }
          })
        }
   })
 })


app.listen(port, () => {
   console.log(`server is running ${port}`)
})
