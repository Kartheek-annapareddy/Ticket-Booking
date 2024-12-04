import React, { useEffect } from 'react'
import './carojoul.css'
import { useState } from 'react'



var images=['https://assets-in.bmscdn.com/promotions/cms/creatives/1730299516327_1240x300lineupsunburn.jpg',
  'https://assets-in.bmscdn.com/promotions/cms/creatives/1730207692283_peppahyderabad1web.jpg',
  'https://assets-in.bmscdn.com/promotions/cms/creatives/1726037613244_playcardnewweb.jpg'
]
function carojoul() {
  var[currentindex,setcurrentindex]=useState(0);
  var[animi,setanimi]=useState(0)

  const getpreviouscall = () => {
    setcurrentindex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const getnextcall = () => {
    setcurrentindex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const getslideanimi=()=>{
     setanimi((prevIndex)=>{
      prevIndex===images.length-1?0:prevIndex + 1
     })
  }
  useEffect(() => {
    const interval = setInterval(() => {
      setcurrentindex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 3000);

//clean up function which is used to clear the task when the unmount takes place.
   return () => clearInterval(interval);
  }, []);

  return (
     <div className='container-fluid corousel'>
      <div className='row'>
        <div className='col-12'>
                   <div className='carousel-container'>
                    <div className='pre-btn' onClick={getpreviouscall}> &#10094;</div>
                    <div className='carousel-slide' style={{ transform: `translateX(-${currentindex* 100}%)` }}>
                    {
                      images.map((image)=>{
                        return(
                          <img src={image}  className="carousel-image"/>
                        )
                      })
                    }</div>
                      <div className='next-btn' onClick={getnextcall}>&#10095;</div>
                   </div>
        </div>
      </div>
     </div>
  )
}

export default carojoul;
