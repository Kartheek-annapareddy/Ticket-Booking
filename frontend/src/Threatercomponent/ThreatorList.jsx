import React, { useEffect, useState } from 'react'
import Navbar from '../components/Homepgae/Navbar.jsx'
import threatercall from './threateorsaxios.js'
import { useParams } from 'react-router-dom'
import Searchicons from '../components/Homepgae/Searchicons.jsx'
import axios from 'axios'
import './Threatercomponent.css'
import dates from './dates.js'


function Threatercomponent() {
    const [moviedata, setmoviedata] = useState({})
    const [datesopen, setdatesopen] = useState(0)
    const { bookingcity, id } = useParams();
    // console.log(bookingcity)
    // var[location,setlocation]=useState({})

    const datedetails = dates();
    //    console.log(datedetails); extracting the information of dates in the outerfunction

    //handling the dates layaout visibility
    function getdateshandle() {
        if (datesopen) {
            setdatesopen(0)
        }
        else {
            setdatesopen(1)
        }
    }

    useEffect(() => {

        threatercall(bookingcity).then((res) => {
            // console.log(res.data)
        }).catch((err) => {
            console.log(err)
        })

        if (id) {
            axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=41c953dc7d1c21d27df7b693e9740a3c`)
                .then((res) => {
                    console.log(res.data.spoken_languages)
                    setmoviedata(res.data)

                }
                ).catch((err) => { console.log(err) })
        }
    }, [])
    return (
        <div>
            <Navbar />
            <Searchicons />
            <div>
                <div className='row'>
                    <div className='col-12 movie-header'>
                        {moviedata ? <p>{moviedata.title}</p> : null}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12 whole-dates-container'>
                        <div className='dates-header'>
                            <div className='pre-date-button' onClick={()=>{getdateshandle(0)}}><i class="bi bi-chevron-left"></i></div>
                            <div className='dates-container'>
                                {
                                    datedetails.map((ele) => {
                                        return (
                                            <div className='date-visible-holder'style={{transform:`translateX(-${datesopen*90}px)`}}>
                                                <div>{ele.day}</div>
                                                <div style={{ fontWeight: 'bolder' }}>{ele.date}</div>
                                                <div>{ele.month}</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className='post-date-button' onClick={()=>{getdateshandle(1)}}><i class="bi bi-chevron-right"></i></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Threatercomponent;
