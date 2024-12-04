import React from 'react'
import Navbar from '../Homepgae/Navbar'
import Carojoul from '../carojoul/carojoul'
import Movies from '../movies/movies'
import Movies2 from '../movies2/Movies2'
import Searchicons from '../Homepgae/Searchicons'

function Home() {
  return (
    <div>
      <Navbar/>
      <Searchicons/>
      <Carojoul/>
      <Movies/>
      <Movies2/>
    </div>
  )
}

export default Home
