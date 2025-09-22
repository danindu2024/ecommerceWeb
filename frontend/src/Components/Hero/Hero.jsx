import React from 'react'
import './Hero.css'
import hand_icon from '../Asserts/hand_icon.png'
import arrow_icon from '../Asserts/arrow.png'
import hero_img from '../Asserts/hero_image.png'

const Hero = () => {
  return (
    <div className='hero'>
      <div className="hero-left">
        
        <div>
            <div className="hero-hand-icon">
                <p>New</p>
                <img src={hand_icon} alt="" />
            </div>
            <p>collection</p>
            <p>for everyone</p>
        </div>
        <div className="hero-latest-btn">
            <div>Latest Collection</div>
            <img src={arrow_icon} alt="" />
        </div>
      </div>
      <div className="hero-right">
        <img src={hero_img} alt="" />
      </div>
    </div>
  )
}

export default Hero
