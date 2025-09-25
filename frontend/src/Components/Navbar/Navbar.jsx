import React, { useContext, useState, useRef } from 'react'
import './Navbar.css'

import Logo from '../Asserts/logo.png'
import Cart_logo from '../Asserts/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import nav_dropdown from '../Asserts/nav_dropdown.png'
import { useAuth0 } from "@auth0/auth0-react"   // ✅ import Auth0 hook

const Navbar = () => {
  const [menu, setMenu] = useState("shop")
  const { getTotalCartItems } = useContext(ShopContext)
  const menuRef = useRef()
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0() // ✅ Auth0 state

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open')
  }

  return (
    <div className='navbar'>
      <div className="nav_logo">
        <img src={Logo} alt="logo" />
        <p>SHOPPER</p>
      </div>

      <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />

      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => setMenu("shop")}><Link style={{ textDecoration: 'none' }} to='/'>SHOP</Link> {menu === "shop" ? <hr /> : <></>}</li>
        <li onClick={() => setMenu("men")}><Link style={{ textDecoration: 'none' }} to='/men'>MEN</Link> {menu === "men" ? <hr /> : <></>}</li>
        <li onClick={() => setMenu("women")}><Link style={{ textDecoration: 'none' }} to='/women'>WOMEN</Link> {menu === "women" ? <hr /> : <></>}</li>
        <li onClick={() => setMenu("kids")}><Link style={{ textDecoration: 'none' }} to='/kids'>KIDS</Link> {menu === "kids" ? <hr /> : <></>}</li>
      </ul>

      <div className="nav-login-cart">
        {isAuthenticated ? (
          <>
            {/* ✅ Show user info when logged in */}
            <span className="user-name">Hi, {user.name || user.email}</span>
            <button 
              onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
            >
              Logout
            </button>
          </>
        ) : (
          <button onClick={() => loginWithRedirect()}>Login</button>
        )}

        <Link style={{ textDecoration: 'none' }} to='/cart'>
          <img src={Cart_logo} alt="cart_logo" />
        </Link>
        <div className="nav-cart-court">{getTotalCartItems()}</div>
      </div>
    </div>
  )
}

export default Navbar
