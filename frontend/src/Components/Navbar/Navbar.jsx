import React, { useState } from 'react'
import './Navbar.css'

import logo from '../Asserts/logo.png'
import cart_logo from '../Asserts/cart_icon.png'
import { Link } from 'react-router-dom'

const Navbar = () => {

    const [menu, setMenu] = useState("shop")

  return (
    <div className='navbar'>
      <div className="nav_logo">
        <img src={logo} alt="logo" />
        <p>SHOPPER</p>
      </div>
      <ul className="nav-menu">
        <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration: 'none'}} to='/'>SHOP</Link> {menu==="shop"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("men")}}><Link style={{textDecoration: 'none'}} to='/men'>MEN</Link> {menu==="men"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("women")}}><Link style={{textDecoration: 'none'}} to='/women'>WOMEN</Link> {menu==="women"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("kids")}}><Link style={{textDecoration: 'none'}} to='/kids'>KIDS</Link> {menu==="kids"?<hr/>:<></>}</li>
      </ul>
      <div className="nav-login-cart">
        <Link style={{textDecoration: 'none'}} to='/login'><button>Login</button></Link>
        <Link style={{textDecoration: 'none'}} to='/cart'><img src={cart_logo} alt="cart_logo" /></Link>
        <div className="nav-cart-court">0</div>
      </div>
    </div>
  )
}

export default Navbar
