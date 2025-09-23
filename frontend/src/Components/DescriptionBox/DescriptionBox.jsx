import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionBox'>
      <div className="descriptionBox-navigator">
        <div className="descriptionBox-nav-box">Description</div>
        <div className="descriptionBox-nav-box fade">Reviews (22)</div>
      </div>
      <div className="descriptionBox-description">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium rerum expedita deleniti eaque, laborum repudiandae quam, itaque iure pariatur id ducimus asperiores minima corrupti perspiciatis minus tempore. Laudantium, doloribus aliquid.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, dolore, consectetur autem itaque sed nesciunt iure voluptatibus aliquam possimus corporis illo quam atque, qui fugit maiores? Architecto cumque consectetur sapiente.</p>
      </div>
    </div>
  )
}

export default DescriptionBox
