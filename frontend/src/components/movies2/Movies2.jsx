import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import './movies2.css'
import { Link } from 'react-router-dom';
import actionCreater from '../../redux/action';
import store from '../../redux/store';
import getallmovies from '../../tmdb/tmdbmovies'
import { useSelector } from 'react-redux';


function Movies2() {
  var [moviesdata, setmoviesdata] = useState([]);
  var [scrollmovie, setscrollmovie] = useState(0)

  useEffect(() => {
    getallmovies().then((res)=>{
      if(res){
      setmoviesdata(res)
      }
    })
   }, [])

   var locationdata =useSelector((store)=>{return store.location.city})
  //  console.log(locationdata)
 
   const teluguMovies=moviesdata.filter((ele)=>{return ele.original_language==="te"})//12//13
   const tamilMovies=moviesdata.filter((ele)=>{return ele.original_language==='ta'})//30//13
   const hindiMovies=moviesdata.filter((ele)=>{return ele.original_language==='hi'})//25//12
   const kanadaMovies=moviesdata.filter((ele)=>{return ele.original_language==='kn'})
   const malluMovies=moviesdata.filter((ele)=>{return ele.original_language==='ml'})
   const englishMovies=moviesdata.filter((ele)=>{return ele.original_language==='en'})



  function getscrollmovies1() {
    if (scrollmovie === 0) {
      setscrollmovie(1);
    }
    else {
      setscrollmovie(0);
    }
  }

  var movietitles=moviesdata.map((ele)=>{
    return({title:ele.title,id:ele.id})
  })

  var actionobj=actionCreater(movietitles)
  store.dispatch(actionobj)

  //gets moviesinfo based on the location
  function getmovieinfo(){
    if(locationdata==='Vijayawada'||locationdata==='Hyderabad'){
      var recomendedmovies=[...teluguMovies,...englishMovies]
      // console.log(recomendedmovies)
      return recomendedmovies
    
    }
    else if(locationdata==='Chennai'){
      var recomendedmovies=[...tamilMovies,...englishMovies]
      // console.log(recomendedmovies)
      return recomendedmovies
    }
    else if(locationdata==='Delhi'){
      var recomendedmovies=[...hindiMovies,...englishMovies]
      // console.log(recomendedmovies)
      return recomendedmovies
    }
    else if(locationdata==='Bangaleru'){
      var recomendedmovies=[...kanadaMovies,...englishMovies]
      // console.log(recomendedmovies)
      return recomendedmovies
    }
    else if(locationdata==='Kochi'){
      var recomendedmovies=[...malluMovies,...englishMovies]
      // console.log(recomendedmovies)
      return recomendedmovies
    }
    else{
       var recomendedmovies=[...teluguMovies,...tamilMovies]
       return recomendedmovies
    }
  }

var getmovies=getmovieinfo()



  return (
    <div className='container-fluid movies2-container '>
      <div className='row'>
        <div className='col-12'>
          <div className='Recomended-movies-heading'>
            <h2>You Might Also Like</h2>
          </div>
          <div className='recomended-movies-display'>
            <div className='recomended-movies-container' style={{transform:`translateX(-${scrollmovie*50}%)`}}>
              {
                
                  getmovies.filter((data, index) => index > 10 && index<20) 
                  .map((data) => {
                    return (
                      <>
                         <div className='movies2-img-title-container'>
                          <Link to={`/${data.id}`} style={{textDecoration:'none',color:'black'}}>
                        <div className='movies-img-container'>
                          <img src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} width={"100%"} height={'350px'} />
                          <p className='movies-votes'><i class="bi bi-star-fill star-icon"></i> {data.vote_average.toFixed(1)}/10  {data.vote_count}vote</p>
                        </div>
                        <div className='movies2-title-container'><p>{data.title}</p></div>
                        </Link>
                        </div>
                      </>)
                  })}
                 
             </div>
             {
                (scrollmovie === 1 ?(<div className='pre-btn-m2' onClick={getscrollmovies1}><i class="bi bi-chevron-left"></i></div>):(<div className='next-btn-m2' onClick={getscrollmovies1}><i class="bi bi-chevron-right"></i></div>))
              }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Movies2



//api key = ea82902854df64de97bf78fcce420594
