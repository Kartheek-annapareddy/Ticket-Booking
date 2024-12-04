import React, { useState } from 'react'
import './Userprofile.css'
import { useEffect } from 'react'
import Navbar from '../components/Homepgae/Navbar'
import Searchicons from '../components/Homepgae/Searchicons'
import axios from 'axios'

function Userprofile() {
    var[userprofile,setuserprofile]=useState('')
    useEffect(()=>{
     var userprofile=localStorage.getItem('Email')
     axios.post('http://localhost:5009/userprofile',{Email:userprofile})
     .then((res)=>{
        console.log(res.data.message[0])
        setuserprofile(res.data.message[0])
     })
     .catch((err)=>{
      console.log(err)
     })
    },[])
  return (
    <>
    <Navbar/>
    <Searchicons/>
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-2'></div>
        <div className='col-8'>
            <div className='user-details-container'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-12'>
                            <div className='username-heading'>
                                <p>Hi,{userprofile.Username}</p>
                            </div>
                            <div className='account-details'>
                                <p style={{fontWeight:'bold'}}>Account Details</p>
                            </div>
                            <div className='account-email-details'>
                               <div className='row'><div className='col-1'></div>
                               <div className='col-3'>Email Adersses</div>
                               <div className='col-6'>{userprofile.Email}</div>
                               <div className='col-2' style={{color:'red'}}><i class="bi bi-pencil pencil-icon"></i> Edit</div></div>
                            </div>
                            <div className='account-email-details'>
                               <div className='row'><div className='col-1'></div>
                               <div className='col-3'>Mobile Address</div>
                               <div className='col-6'>{userprofile.Phonenumber}</div>
                               <div className='col-2' style={{color:'red'}}><i class="bi bi-pencil pencil-icon"></i> Edit</div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className='container-fluid'>
              <div className='row'>
                <div className='col-12'>
                  <div className='user-profile-details-personal'>
                    <div className='row'>
                      <div className='col-12 personal-details'><p style={{fontWeight:'bold'}}>Personal Details</p></div>
                    </div>
                    <div className='row row-container' >
                      <div className='col-1'></div>
                      <div className='col-3 personal-details-frist-name'>Frist Name</div>
                      <div className='col-8 personal-details-frist-name-value'><input type='text' placeholder={userprofile.Fristname} value={''}/></div>
                    </div>
                    <div className='row row-container'>
                      <div className='col-1'></div>
                      <div className='col-3 personal-details-frist-name'>Last Name</div>
                      <div className='col-8 personal-details-frist-name-value'><input type='text' placeholder={userprofile.Lastname} value={''}/></div>
                    </div>
                    <div className='row row-container'>
                      <div className='col-1'></div>
                      <div className='col-3 personal-details-frist-name'>Birthday (Optional)</div>
                      <div className='col-8 personal-details-frist-name-value'><input type='date'/></div>
                    </div>
                    <div className='row row-container'>
                      <div className='col-1'></div>
                      <div className='col-3 personal-details-frist-name'>Identity (Optional)</div>
                      <div className='col-8 personal-details-identity-value'><div><input type='radio' name={'identity'} value={'Female'}/>Female</div> <div><input type='radio' name={'identity'} value={'male'}/>Male</div></div>
                    </div>
                    <div className='row row-container'>
                      <div className='col-1'></div>
                      <div className='col-3 personal-details-frist-name'>Married? (Optional)</div>
                      <div className='col-8 personal-details-identity-value'><div><input type='radio' name={'identity'} value={'Yes'}/>YES</div> <div><input type='radio' name={'identity'} value={'No'}/>NO</div></div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
               {/* END */}
               <div className='container-fluid'>
                 <div className='row'>
                  <div className='col-12'>
                    <div className='user-adress-details'>
                    <div className='row'>
                      <div className='col-12 personal-details'><p style={{fontWeight:'bold'}}>Adress</p></div>
                    </div>
                    <div className='row row-container' >
                      <div className='col-1'></div>
                      <div className='col-3 personal-details-frist-name'>Area Pincode</div>
                      <div className='col-8 personal-details-frist-name-value'><input type='text' placeholder={userprofile.Fristname} value={''}/></div>
                    </div>
                    <div className='row row-container'>
                      <div className='col-1'></div>
                      <div className='col-3 personal-details-frist-name'>Adress Line 1</div>
                      <div className='col-8 personal-details-frist-name-value'><input type='text' placeholder={userprofile.Lastname} value={''}/></div>
                    </div>
                    <div className='row row-container'>
                      <div className='col-1'></div>
                      <div className='col-3 personal-details-frist-name'>Adress Line 2</div>
                      <div className='col-8 personal-details-frist-name-value'><input type='text' placeholder={''}/></div>
                    </div>
                    <div className='row row-container'>
                      <div className='col-1'></div>
                      <div className='col-3 personal-details-frist-name'>Landmaek (Optional)</div>
                      <div className='col-8 personal-details-frist-name-value'><input type='text' value={''}/></div>
                    </div>
                    <div className='row row-container'>
                      <div className='col-1'></div>
                      <div className='col-3 personal-details-frist-name'>Town/City</div>
                      <div className='col-8 personal-details-frist-name-value'><input type='text' value={''}/></div>
                    </div>
                    <div className='row row-container'>
                      <div className='col-1'></div>
                      <div className='col-3 personal-details-frist-name'>State</div>
                      <div className='col-8 personal-details-frist-name-value'><input type='text' value={''}/></div>
                      </div>
                    </div>
                  </div>
                 </div>
               </div>
              
        </div>
        <div className='col-2'></div>
      </div>
    </div>
    </>
  )
}

export default Userprofile
