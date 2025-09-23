import React from 'react'
import './offers.css'
import Exclusive_img from '../Asserts/exclusive_image.png'

const offers = () => {
  return (
    <div className='offers'>
      <div className="offers-left">
        <h1>Exclusive</h1>
        <h1>Offers For You</h1>
        <button>Check Now</button>
      </div>
      <div className="offers-right">
        <img src={Exclusive_img} alt="" />
      </div>
    </div>
  )
}

export default offers
