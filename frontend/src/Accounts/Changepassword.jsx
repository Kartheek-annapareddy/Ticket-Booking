import React, { useEffect, useRef, useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import  Button from '@mui/material/Button';
import TextField  from '@mui/material/TextField';
import { Snackbar,Alert } from '@mui/material';
import axios from 'axios';
import Navbar from '../components/Homepgae/Navbar';
import Searchicons from '../components/Homepgae/Searchicons';

function Changepassword() {
var[savedresponse,setsavedresponse]=useState()
var[open,setopen]=useState(false)
var[changepassword,setChangepassword]=useState({
    Oldpassword:'',
    Newpassword:'',
    Confirmnewpassword:'',
    User_id:''
});

var oldref  =  useRef(null);
var newref  =  useRef(null);
var cnewref =  useRef(null);

 useEffect(()=>{
    const User_id = localStorage.getItem('User_id')
    if(User_id){
        setChangepassword({
                ...changepassword,
                User_id:User_id
            })
    }
 },[])

    function getchangepasswordcall(e){
      setChangepassword(
        {
            ...changepassword,
            [e.target.name]:e.target.value
        }
      )
    }
    function clientrender(){
        if(changepassword.Newpassword!=changepassword.Confirmnewpassword){
            cnewref.current.focus();
            alert('conform new password should be same')
            return false;
        }
        else if(changepassword.Newpassword.length===0||changepassword.Confirmnewpassword.length===0){
            if(changepassword.Newpassword.length===0){
                alert('new password can not be empty')
                newref.current.focus();
            }
            else{
                cnewref.current.focus()
                alert('conform new password can not be empty')
            }
        }
        else{
            return true;
        }
    }

    function getupdatepassword(e){
       e.preventDefault();
       if(clientrender()){
       console.log(changepassword)
       axios.post('http://localhost:5009/Changepassword',changepassword).then((res)=>{
        console.log(res.data.message);
        setsavedresponse(res.data)
        setChangepassword({
            Oldpassword:'',
            Newpassword:'',
            Confirmnewpassword:'',
            User_id:''
        })
       }).catch((err)=>{
        // console.log(err.response.data)
        setsavedresponse(err.response.data)
        if(err.response.data.message==='Old Password is incorrect'){
            oldref.current.focus();
        }
       })
       handleOpen()

    }}

    function handleOpen(){
        setopen(true)
    }
    function handleClose(){
        setopen(false)
    }
    return (
        <>
        <Navbar/>
        <Searchicons/>
            <div className='row'>
                <div className='col-1'></div>
                <div className='col-10'>
                    <div className='row'>
                        <div className='col-12'>
                            <div className='row'><div className='col-12'><p style={{fontWeight:'bold',fontSize:'35px'}}>Account & Settings</p></div></div>
                            <div className='row'>
                                <div className='col-12'>

                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1-content"
                                            id="panel1-header"
                                        >
                                            Payment Methods
                                        </AccordionSummary>
                                        <AccordionDetails>
                                          <div className='row'>
                                            <div className='col-12'>
                                               <p style={{textAlign:'center',fontWeight:'bold'}}> No Payments Yet !</p>
                                            </div>
                                          </div>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion defaultExpanded>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel2-content"
                                            id="panel2-header"
                                        >
                                            Change Password
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <span style={{width:'50%',textAlign:'center',gap:'5'}}>
                                                <div>
                                                  <div><h4>Change Password</h4></div>
                                                  <div>
                                                    <form onSubmit={getupdatepassword}><TextField type='password' name='Oldpassword' id="outlined-basic" label="Old Password" variant="outlined" inputRef={oldref} sx={{width:'50%',marginBottom:'8px'}} onChange={(e)=>{getchangepasswordcall(e)}}/><br/>
                                                    <TextField  type='password' id="outlined-basic" name='Newpassword' label="New Password" variant="outlined" sx={{width:'50%',marginBottom:'8px'}} inputRef={newref} onChange={(e)=>{getchangepasswordcall(e)}}/><br/>
                                                    <TextField type='password' id="outlined-basic" name='Confirmnewpassword' label="Confirm New Password" variant="outlined"  sx={{width:'50%',marginBottom:'8px'}} inputRef={cnewref} onChange={(e)=>{getchangepasswordcall(e)}}/><br/>
                                
                                                    <Button type='submit' variant='outlined' color='success'>Update Password</Button>
                                                    </form>
                                                    </div>
                                                </div>
                                            </span>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel3-content"
                                            id="panel3-header"
                                        >
                                            Give Account Details
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            
                                        </AccordionDetails>
                                        <AccordionActions>
                                            <Button>Cancel</Button>
                                            <Button>Agree</Button>
                                        </AccordionActions>
                                    </Accordion>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-1'></div>


                {savedresponse ?
                    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                        <Alert
                            onClose={handleClose}
                            severity={savedresponse.status === 'true' ? 'success' : 'error'}
                            variant="filled"
                            sx={{ width: '25%' }} >
                            {
                                savedresponse.message
                            }
                        </Alert>
                    </Snackbar> : null}


            </div>
        </>
    )
}

export default Changepassword
