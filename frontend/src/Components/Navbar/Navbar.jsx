import React, { useState } from 'react'
import './Navbar.css'

import logo from '../Asserts/logo.png'
import cart_logo from '../Asserts/cart_icon.png'

const Navbar = () => {

    const [menu, setMenu] = useState("shop")

  return (
    <div className='navbar'>
      <div className="nav_logo">
        <img src={logo} alt="logo" />
        <p>SHOPPER</p>
      </div>
      <ul className="nav-menu">
        <li onClick={()=>{setMenu("shop")}}>SHOP {menu==="shop"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("men")}}>MEN {menu==="men"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("women")}}>WOMEN {menu==="women"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("kids")}}>KIDS {menu==="kids"?<hr/>:<></>}</li>
      </ul>
      <div className="nav-login-cart">
        <button>Login</button>
        <img src={cart_logo} alt="cart_logo" />
        <div className="nav-cart-court">0</div>
      </div>
    </div>
  )
}

export default Navbar
