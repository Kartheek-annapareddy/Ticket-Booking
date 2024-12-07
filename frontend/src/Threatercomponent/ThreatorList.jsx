import React, { useEffect, useState } from 'react'
import Navbar from '../components/Homepgae/Navbar.jsx'
import threatercall from './threateorsaxios.js'
import { useParams } from 'react-router-dom'
import Searchicons from '../components/Homepgae/Searchicons.jsx'
import axios from 'axios'
import './Threatercomponent.css'


function Threatercomponent() {
    const [moviedata,setmoviedata]=useState({})
    const { bookingcity,id } = useParams();
    // console.log(bookingcity)
    // var[location,setlocation]=useState({})
  

    useEffect(()=>{
    threatercall(bookingcity).then((res)=>{
            // console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })

        if(id){
            axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=41c953dc7d1c21d27df7b693e9740a3c`)
            .then((res)=>{console.log(res.data.spoken_languages)
                setmoviedata(res.data)

            }
        ).catch((err)=>{console.log(err)})
        }
    },[])
  return (
    <div>
        <Navbar/>
        <Searchicons/>
    <div>
        <div className='row'>
            <div className='col-12 movie-header'>
               { moviedata?<p>{moviedata.title}</p>:null}
            </div>
        </div>
    </div>
      
    </div>
  )
}

export default Threatercomponent;
