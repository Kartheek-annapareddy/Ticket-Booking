import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Navbar from '../Homepgae/Navbar';
import { useSelector } from 'react-redux';
import './Selectedmovie.css';
import Searchicons from '../Homepgae/Searchicons';
import getAllMovies from '../../tmdb/tmdbmovies';

function Selectedmovie() {
  const { id } = useParams();
  var [moviedata, setmoviedata] = useState('')
  var [intrest, setintrest] = useState(0)
  var[selectedMovie,setSelectedMovie]=useState([])

  var language =useSelector((store)=>{ 
    // console.log(store.location.language)
     return store}) //extracting the language from the redux store
  console.log(language)


  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=41c953dc7d1c21d27df7b693e9740a3c`)
      .then((res) => {
        console.log(res.data)
        setmoviedata(res.data)
      }).catch((err) => { console.log(err) })
  }, [id])
  
 

  function getintrestcall() {
    if (intrest === 0) {
      setintrest(1);
    }
    else {
      setintrest(0);
    }
  }

  return (
    <div>
      <Navbar />
      <Searchicons />
      <div>
        <div className='container-fluid selected-movies' style={{ backgroundImage: `linear-gradient(90deg, #1A1A1A 24.97%, #1A1A1A 38.3%, rgba(26, 26, 26, 0.0409746) 97.47%, #1A1A1A 100%),url('https://image.tmdb.org/t/p/w500/${moviedata.backdrop_path}'` }}>
          <div className='row'>
            <div className='col-4'>
              <div className="selectedmovie-img-container">
                <img src={`https://image.tmdb.org/t/p/w500/${moviedata.poster_path}`} />
                <p>{moviedata.status}</p>
              </div>
            </div>
            <div className='col-4'>
              <div className='selectedmovie-title-container'>
                <h1>{moviedata.title}</h1>
                <div className='selectedmovie-title-votes'>{moviedata.vote_average === 0 ? (<><div className='d-flex flex-column mx-3'><p style={{ fontSize: '19px', marginTop: '10px' }}><i class="bi bi-hand-thumbs-up-fill" style={{ color: 'green' }}></i>{intrest === 1 ? ('You & 108 k are intrested') : ('108 k are intrested')}</p><p style={{ fontSize: '12px', marginTop: '-15px' }}>{intrest === 1 ? ("We'll notify you when it releases") : ('Are you instreted in this movie?')}</p></div><div className='mx-4 my-2'><button onClick={getintrestcall} style={{ marginLeft: '38px', marginTop: '10px', backgroundColor: 'white', borderRadius: '10px', padding: '3px' }}>{intrest === 1 ? "undo" : "I'm intrested"}</button></div></>) : (<div className='rate-vote-container'><div className='voting-layout'><h4><i class="bi bi-star-fill moviedetails-star-icon"></i> {moviedata.vote_average ? `${moviedata.vote_average.toFixed(1)}/10` : null}</h4> <h4>({`${moviedata.vote_count}k votes`})</h4 ></div><div className='rate-button-container'><button className='rate-button'>Rate</button></div></div>)}</div>
                <div className='genere-details'><p>{Math.floor(moviedata.runtime / 60)}hr {(moviedata.runtime % 60).toFixed(0)}min</p>.<p> {moviedata.genres ? moviedata.genres.map((gen) => { return gen.name }).join(' / ') : null} </p>.<p>{moviedata.release_date}</p></div>
                <div className='booktickets'><button>Book Tickets</button></div>
              </div>
              <div className='col-4'></div>
            </div>
          </div>
        </div>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-1'></div>
            <div className='col-9'>
              <div className='overview-movie'><p>About The Movie</p></div>
              <div><p>{moviedata.overview}</p></div>
              <hr />
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Selectedmovie;
