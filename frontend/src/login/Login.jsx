import React from 'react'
import "./Login.css"
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'



function Login({getloginpopoff}) {
    var[response,setresponse]=useState("")
    var[logindata,setlogindata]=useState({
        Email:"",
        password:""
    })
   
    var navigate=useNavigate();

    function getonchange(e){
        setresponse("")
        setlogindata({
            ...logindata,
          [e.target.name]:e.target.value
        })
    }

    function getlogincall(e){
        e.preventDefault();
       axios.post('http://localhost:5009/login',logindata).then((res)=>{
        console.log(res.data)
        setresponse(res.data.message)
        var User_id=res.data.User_id;
        alert(res.data.message)
        setlogindata({
            Email:"",
            password:"" 
        })
        getloginpopoff();
        // navigate('/')
        localStorage.setItem('Email',logindata.Email)
        localStorage.setItem('User_id',User_id)
        // var actionobj=actionCreater(logindata.username,res.data.status)  
        //  store.dispatch(actionobj)
       })
       .catch((err)=>{ console.log(err.response.data.message)
          setresponse(err.response.data.message)
          alert(err.response.data.message)
       })
    }
  return (
    <div className='container-fluid login-container-fluid' onClick={()=>{getloginpopoff()}}>
        <div className='row'>
            <div className='col-12'>
                <div className='login-container' onClick={(e)=>{e.stopPropagation()}}>
                    <form onSubmit={(e)=>{getlogincall(e)}}>
                       <div className='text-center'><img src='https://cdn.prod.website-files.com/600ee75084e3fe0e5731624c/65b6384089ec9e265952391f_bookmyshow-logo-vector-removebg-preview%20(1).png' width={'120px'} height={'50px'}/></div>
                       <div><label>Email*</label></div>
                       <div><input type='email' placeholder='enter username' name="Email" value={logindata.Email} onChange={(event)=>{getonchange(event)}}/></div>
                       <div><label>Password*</label></div>
                       <div><input type='password' placeholder='enter password' name="password" value={logindata.password} onChange={(event)=>{getonchange(event)}}/></div>
                       <div><input type='submit' value='login'/></div>
                    </form>
                    <div className='link-containers'>
                    <div><Link to={'/register'}>create account?</Link></div><div><Link to={''}>forgot password?</Link></div>
                    </div>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default Login
