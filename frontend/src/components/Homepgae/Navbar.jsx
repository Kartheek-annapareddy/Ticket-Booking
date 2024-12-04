import React, { useEffect, useRef } from 'react'
import './Navbar.css'
import { json, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import { Autocomplete } from '@mui/material';
import store from '../../redux/store';
import { grey } from '@mui/material/colors';
import Login from '../../login/Login';
import actionCreater2 from '../../redux/action2';



function Navbar() {
  var [userdata, setuserdata] = useState({
    Location:'',
    Fullname:''
  })
  var[username,setusername]=useState('')
  var [isactive, setisactive] = useState(false);
  var[searchvalue,setsearchvalue]=useState('')
  var [city, setcity] = useState('select location');
  var[userprofile,setuserprofile]=useState(0);
  var[loginicon,setloginicon]=useState(0)


  var moviesname=useSelector((store)=>{ return(store.data)})
  // console.log(moviesname)
 
  
  var moviearray= moviesname.filter((ele)=>ele.title.toLowerCase().includes(searchvalue.length===0?null:searchvalue.toLowerCase()))
  

  function showlocbar(isactive) {

    if (isactive === false) {
      setisactive(true);
    }
    else {
      setisactive(false)
    }
  }

  function getcitycall(location) {
    if(username){
    axios.post('http://localhost:5009/Location',{city:location.city,User_id:username}).then((res)=>{
      setcity(city);
      showlocbar();
      getuserlocation(username,null);
    }).catch((err)=>{
      console.log(err)
      alert('opps there is a internal issue.. Please try after sometime')
      showlocbar()
    }) }
    else{
      showlocbar()
      getuserlocation(null,location)
    }
  }

  function getlogoutcall(){
    localStorage.removeItem('username')
    localStorage.removeItem('User_id')
    getuserdetailscall();
    setusername({
      Location:'',
      Fullname:''
    })
  }

  function getlogincall(){
    setloginicon(1)
  }

  const getloginpopoff=()=>{
    setloginicon(0)
  }
  useEffect(()=>{

    var locationdata=sessionStorage.getItem('location')
    if(locationdata){
    var data=JSON.parse(locationdata)
    console.log(data)
    if(data){ 
    setuserdata({
      ...userdata,
      Location:data.city
    })
    var action2=actionCreater2(data)
    store.dispatch(action2)
  }
  }
  else{
    console.log('nosinup call')
  }

  },[])//updates the location of when the account is not sign-in when rerenders 


   function getuserlocation(savedname,location){
    if(savedname){
    axios.get(`http://localhost:5009/homepage/${savedname}`)
    .then((res) => {
      setuserdata(res.data.message[0])
      // console.log(res.data.message[0].Location)

       var action2=actionCreater2(res.data.message[0].Location)
       store.dispatch(action2)//storing the location in redux store

    })
    .catch((err) => {console.log(err)})
  }
  else if(location){
   sessionStorage.setItem('location', JSON.stringify(location));
   console.log(location)
   storelocationdata()
  }
   }


  const handlesearchname=(e)=>{
    if(e.target.value===''){
      setsearchvalue('')
  
    }else{
    var value=e.target.value;
    setsearchvalue(value);
    }
  }
  var storedata = useSelector((store) => store)

  function getmoviecall(){
    // console.log('function is called')
    setsearchvalue('')

  }

  useEffect(() => {
    var savedname = localStorage.getItem('User_id')
    console.log(savedname)
     if(savedname){
       setusername(savedname)
     }
      getuserlocation(savedname);
  }, [])

  function getuserdetailscall() {
    if(userprofile==0){
      setuserprofile(1)
    }
    else{
      setuserprofile(0)
    }
  }
  const citys=[{labels:'Hyderabad'},{labels:'Vijayawada'},{labels:'Kolkata'},{labels:'Chennai'},{labels:'Kolkata'},{labels:'Bangaleru'},{}]

  const location = [{ img: "https://in.bmscdn.com/m6/images/common-modules/regions/hyd.png", city: "Hyderabad",language:['te','en'] }, { img: 'https://in.bmscdn.com/m6/images/common-modules/regions/pune.png', city: 'Vijayawada',language:['te','en'] }, { img: 'https://in.bmscdn.com/m6/images/common-modules/regions/chen.png', city: 'Chennai',language:['ti','en'] }, { img: 'https://in.bmscdn.com/m6/images/common-modules/regions/bang.png', city: 'Bangaleru',language:['kn','en'] }, { img: 'https://in.bmscdn.com/m6/images/common-modules/regions/ncr.png', city: 'Delhi',language:['hi','en'] }, { img: 'https://in.bmscdn.com/m6/images/common-modules/regions/koch.png', city: 'Kochi',language:['ml','en'] }]


  return (
    <div className='container-fluid nav-bar-container'>
      <div className='row'>
        <div className='col-2 navbar-logo '><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc24uoiO9o95saxJEfckq-SH37rPT5VvbPsw&s' width={'70%'} height={'100%'} /></div>
        <div className='col-5' style={{position:'relative'}}><input className='search-movies' type='text' placeholder='Search movies' value={searchvalue}  onChange={handlesearchname}/><i className="bi bi-search search-mirror"></i></div>

        <div className='col-1'></div>
        <div className='col-2'>
          <div className='navbar-location'>
            <div onClick={() => { showlocbar(isactive) }}>{userdata.Location}</div>
            <div onClick={() => { showlocbar(isactive) }}><i className="bi bi-chevron-down"></i></div>
          </div></div>
        <div className='col-2'>
          <div className='navbar-profile'>
            {
              username.length === 0 ? <div><button className='nav-login-button' onClick={getlogincall}>sign in</button></div> 
              :<div>
                <div className='user-profile-backbutton'onClick={()=>{getuserdetailscall()}} style={{display:`${userprofile===0 ?'none' : 'inline'}`}}></div>
                 <div onClick={()=>{getuserdetailscall()}}><i class="bi bi-person-circle"></i> hi, {userdata.Fullname}</div>
                 <div className='navbar-user-profile' style={{transform:`translateX(-${userprofile*375}px)`}} >
                   <span className='profile-userdata-name'><h2>Hi! {userdata.Fullname} <i class="bi bi-person-circle"></i></h2>
                   <Link to={'/user-details'} style={{textDecoration:'none',color:'black'}}><p> profile <i class="bi bi-chevron-right"></i></p></Link></span>
                   <div><a> Notifications</a></div>
                   <div><a> Your Ordes</a></div>
                   <div><a> Help & Support</a></div>
                   <div> <Link to={'/Account&Settings'}>Account & Settings</Link></div>
                   <div>< button onClick={getlogoutcall} className='user-profile-logout'>log out</button></div>
                </div>
                </div>
            }
          </div>

        </div>
      </div>
      <div id='nav-loc-container-full' className={isactive ? 'active-locbar' : 'inactive-locbar'}>
        <div id='location-bar' onClick={showlocbar}> </div>
        <div id='navbar-location-holder' className={isactive ? 'activeloccont' : 'inactiveloccont'}>
          <div className='select-location-input'><input  list={'city'} placeholder='Select Location'/>
          <datalist id='city'>
            <option value={'Delhi'}></option>
            <option value={'Hyderabad'}></option>
            <option value={'Kolkata'}></option>
            <option value={'Vijayawada'}></option>
            <option value={'Benguluru'}></option>
            </datalist></div>
          <div className='auto-detect'><i class="bi bi-crosshair2"></i> Detect my location</div>
          <hr />
          <div style={{ width: '100%', textAlign: 'center', height: '23px' }}><p>Popular Cities</p></div>
          <div className='navbar-location-image'>
            {
              location.map((ele) => {
                return <div className='loc-inner-container' onClick={() => { getcitycall({city:ele.city,language:ele.language}) }}><img src={ele.img} /><h4 style={{ fontSize: '15px' }}>{ele.city}</h4></div>
              })
            }
          </div>
        </div>
      </div>

      {
        moviearray.length===0?null:   
<div className='search-result'style={{height:'400px',overflowY:'scroll',backgroundColor:'white'}}>
<div className='d-flex flex-column' >{
  moviearray.map((ele)=>{
    return(
      <div className='w-100 bg-white ps-4' style={{height:'60px',backgroundColor:'rgba(240, 248, 255, 0.715)',boxShadow:'1px solid '}}>
       <Link to={`/${ele.id}`} style={{textDecoration:'none',color:'black'}}> <div className='searched-movie-name' onClick={getmoviecall}>
          {ele.title}
        </div></Link>
      </div>
    )
  })}</div>
  </div>
}

   <div className='Login-popup'>
    {
      loginicon===1? <div style={{position:'absolute',top:'0px',zIndex:6}}><Login getloginpopoff={getloginpopoff}/></div>:null
    }
   </div>
  </div>


  )
}

export default Navbar;
