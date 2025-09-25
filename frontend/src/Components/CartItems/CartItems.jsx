import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Asserts/cart_cross_icon.png';
import { useAuth0 } from "@auth0/auth0-react";

const CartItems = () => {
  const { 
    getTotalCartAmount, 
    all_product, 
    cartItems, 
    removeFromCart, 
    clearUserCart,
    isCartLoaded 
  } = useContext(ShopContext);
  const { isAuthenticated } = useAuth0();

  // Show loading state while cart is being loaded
  if (!isCartLoaded) {
    return (
      <div className='cartItems'>
        <div className="loading">Loading cart...</div>
      </div>
    );
  }

  const hasItemsInCart = Object.values(cartItems).some(quantity => quantity > 0);

  return (
    <div className='cartItems'>
      <div className="cartItems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      
      {!hasItemsInCart ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          {!isAuthenticated && (
            <p className="guest-notice">
              <small>Note: As a guest, your cart will be cleared when you leave the site. 
              Log in to save your cart items!</small>
            </p>
          )}
        </div>
      ) : (
        all_product.map((e) => {
          if (cartItems[e.id] > 0) {
            return (
              <div key={e.id} className="cartItems-format cartItems-format-main">
                <img src={e.image} alt={e.name} className='cartIcon-product-icon' />
                <p>{e.name}</p>
                <p>Rs. {e.new_price}</p>
                <button className='cartItems-quantity'>{cartItems[e.id]}</button>
                <p>Rs. {e.new_price * cartItems[e.id]}</p>
                <img
                  src={remove_icon} 
                  onClick={() => removeFromCart(e.id)} 
                  alt="Remove" 
                  className='cartItems-remove-icon'
                />
              </div>
            );
          }
          return null;
        })
      )}

      {hasItemsInCart && (
        <>
          <div className="cart-actions">
            <button 
              className="clear-cart-btn"
              onClick={clearUserCart}
              style={{
                backgroundColor: '#ff6b6b',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                margin: '10px 0',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Clear Cart
            </button>
          </div>
              {isAuthenticated && (
              <div className="cart-persistence-info" style={{
                backgroundColor: '#e8f5e8',
                padding: '10px',
                margin: '10px 0',
                borderRadius: '5px',
                fontSize: '14px',
                color: '#2d5a2d'
              }}>
          ✓ Your cart is automatically saved and will be restored when you return!
        </div>
      )}
          <div className="cartItems-down">
            <div className="cartItems-total">
              <h1>Cart Totals</h1>
              <div>
                <div className="cartItems-total-item">
                  <p>Subtotal</p>
                  <p>Rs. {getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cartItems-total-item">
                  <p>Shipping Fee</p>
                  <p>Free</p>
                </div>
                <hr />
                <div className="cartItems-total-item">
                  <h3>Total</h3>
                  <h3>Rs. {getTotalCartAmount()}</h3>
                </div>
              </div>
              <button>PROCEED TO CHECKOUT</button>
            </div>
            <div className="cartItems-promocode">
              <p>If you have a promo code, Enter it here</p>
              <div className="cartItems-promobox">
                <input type="text" placeholder='promo code'/>
                <button>Submit</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartItems;