import React from 'react'
import './Hero.css'
import Hand_icon from '../Asserts/hand_icon.png'
import Arrow_icon from '../Asserts/arrow.png'
import Hero_img from '../Asserts/hero_image.png'

const Hero = () => {
  return (
    <div className='hero'>
      <div className="hero-left">
        
        <div>
            <div className="hero-hand-icon">
                <p>Hey you</p>
                <img src={Hand_icon} alt="" />
            </div>
            <p>Ready to Wear Confidence?</p>
        </div>
        <div className="hero-latest-btn">
            <div>Latest Collection</div>
            <img src={Arrow_icon} alt="" />
        </div>
      </div>
      <div className="hero-right">
        <img src={Hero_img} alt="" />
      </div>
    </div>
  )
}

export default Hero
