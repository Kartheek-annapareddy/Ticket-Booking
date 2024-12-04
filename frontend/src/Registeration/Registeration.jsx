import React, { useRef } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import "./Registeration.css"
import axios from 'axios'

function Registeration() {
  var[registerdata,setregisterdata]=useState({
    Fullname:"",
    Email:"",
    Phonenumber:"",
    Password:"",
    Conformpassword:""
  })

  const Fullname=useRef(null);
  const Password=useRef(null);
  const Phonenumber=useRef(null);
  const Conformpassword=useRef(null);

  
  
  function changeregisterform(e){
    setregisterdata({
      ...registerdata,
      [e.target.name]:e.target.value
    })
    }



  function checkregisterform(){

     if(/\s|\d/.test(registerdata.Fullname)){ 
        Fullname.current.focus();
        return false;
      }

   else if(!/^\d{10}$/.test(registerdata.Phonenumber)){
      Phonenumber.current.focus();
      return false;
   }
   
  else if(registerdata.Password.length<8){
      Password.current.focus();
    return false;
   }
   else if(registerdata.Password !=registerdata.Conformpassword){
      Conformpassword.current.focus();
      return false;
  }
  else{
    return true;
  }
  }
  function handleregisteration(e){
      e.preventDefault();
      if(checkregisterform()){
        console.log(registerdata);
        axios.post('http://localhost:5009/register',registerdata).then((res)=>{
         console.log(res.data)
         if(res.data.sucesses==='false'){
          alert(res.data.message);
         }
         else{
         alert(res.data.message[0]);}
         if(res.data.sucesses==='true'){
           setregisterdata({
            Fullname:"",
            Email:'',
            Phonenumber:"",
            Password:"",
            Conformpassword:""
          })
         }
        }).catch((err)=>{
          console.log(err);
          alert(err.response.data.message)
        })
      }
  }
 
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-12'>
         <div className='registeration-container'>
          <div className='register-heading text-center'><img src='https://cdn.prod.website-files.com/600ee75084e3fe0e5731624c/65b6384089ec9e265952391f_bookmyshow-logo-vector-removebg-preview%20(1).png' width={'120px'} height={'50px'}/></div>
          <div className='register-form text-align-center'>
            <form onSubmit={(e)=>{handleregisteration(e)}}>
              <div className='form-block-container'>
              <label>Full Name*</label><br/>
              <input type='text' name="Fullname" required ref={Fullname} value={registerdata.Fullname} placeholder='enter your frist name' onChange={(e)=>{changeregisterform(e)}}/>{
              (registerdata.Fullname.length>0 && /\s|\d/.test(registerdata.Fullname) )?<div className='error-data'>spaces and numbers are not allowed</div>:null
              }
             </div>

              <div className='form-block-container'> <label>Email*</label>
              <input type='email' name='Email'required value={registerdata.Email} placeholder='Enter your email' onChange={(e)=>{changeregisterform(e)}}/>
             </div>
             
             <div className='form-block-container'><label>Phonenumber*</label>
              <input type='tel' name='Phonenumber' maxLength={10} ref={Phonenumber} required value={registerdata.Phonenumber} placeholder='Enter your mobile number' onChange={(e)=>{changeregisterform(e)}}/>
              {
                (registerdata.Phonenumber.length>0 && !/^\d{10}$/.test(registerdata.Phonenumber)?<div className='error-data'>Enter vaild phoneNumber</div>:null)
              }
           </div>
              <div className='form-block-container'><label>Password*</label>
              <input type='password' name='Password' required ref={Password} value={registerdata.Password} placeholder='Enter your Password' onChange={(e)=>{changeregisterform(e)}}/>
              {
                (registerdata.Password.length>0 && registerdata.Password.length<8 )?<div className='error-data'>Password should be minimum of 8 characters</div>:null
              
              }
             </div>
              <div className='form-block-container'><label>Conform Password*</label>
              <input type='password' name='Conformpassword' required ref={Conformpassword} placeholder='Conform your Password' value={registerdata.Conformpassword} onChange={(e)=>{changeregisterform(e)}}/>
              {
                (registerdata.Conformpassword.length>0 && registerdata.Conformpassword!=registerdata.Password )?<div className='error-data'>Conform password should be same as Password</div>:null
              
              }
             </div>
              <div className='form-block-container-submit'><input type='submit' value='Register'/></div>
            </form>
          </div>
              <div style={{display:'flex',justifyContent:'space-evenly'}}><Link to={'/login'}>Goto login page?</Link><Link to={'/'}>Skip for now?</Link></div>
         </div>
        </div>
      </div>
    </div>
  )
}

export default Registeration;
