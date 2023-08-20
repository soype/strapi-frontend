import React from 'react'

import foodie from '../Media/foodie.png';
import spaghetti from '../Media/spaghetti.png';

const Home = () => {
  return (
    <div className='fp-container home'>
        <h2>Begin your culinary travels</h2>
        <button className='button home-button'>Here</button>
        <img className='background-image home-img-1' src={foodie} alt="" />
        <img className='background-image home-img-2' src={spaghetti} alt="" />
    </div>
  )
}

export default Home