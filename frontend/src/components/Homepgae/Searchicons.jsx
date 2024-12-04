import React from 'react';
import './Searchicons.css';

function Searchicons() {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <nav className='header-content'>
          <div className='col-7'>
            <div className='header-icons-1'>
              <a href='#'>Movies</a>
              <a href='#'>Streams</a>
              <a href='#'>Events</a>
              <a href='#'>Plays</a>
              <a href='#'>Sports</a>
              <a href='#'>Activities</a>
            </div>
          </div>
          <div className='col-2'></div>
          <div className='col-3'>
            <div className='header-icons-2'>
              <a href='#'>Lists</a>
              <a href='#'>Offers</a>
              <a href='#'>Gift Cards</a>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Searchicons;
