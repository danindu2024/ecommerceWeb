import React from 'react'
import './footer.css'
import Footer_logo from '../Asserts/logo_big.png'
import Ig_icon from '../Asserts/instagram_icon.png'
import Whatsapp_icon from '../Asserts/whatsapp_icon.png'
import Pintester_icon from '../Asserts/pintester_icon.png'

const footer = () => {
  return (
    <div className='footer'>
      <div className="footer-logo">
        <img src={Footer_logo} alt="" />
        <p>SHOPPER</p>
      </div>
      <ul className="footer-links">
        <li>Company</li>
        <li>Products</li>
        <li>Offices</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className="footer-social-icon">
        <div className="footer-icons-container">
            <img src={Ig_icon} alt="" />
        </div>
        <div className="footer-icons-container">
           <img src={Whatsapp_icon} alt="" />
        </div>
        <div className="footer-icons-container">
            <img src={Pintester_icon} alt="" />
        </div>
      </div>
      <div className="footer-copywrite">
        <hr />
        <p>Copyright @ 2025 - Allrigh Reserved</p>
      </div>
    </div>
  )
}

export default footer
