import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Asserts/cart_cross_icon.png';
import { useAuth0 } from "@auth0/auth0-react";
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

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

  if (!isCartLoaded) {
    return (
      <div className='cartItems'>
        <div className="loading">Loading cart...</div>
      </div>
    );
  }

  const hasItemsInCart = Object.values(cartItems).some(q => q > 0);

  // Convert amount to USD for PayPal (example conversion)
  const totalUSD = (getTotalCartAmount() / 350).toFixed(2);

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
              <small>
                Note: As a guest, your cart will be cleared when you leave the site. Log in to save your cart items!
              </small>
            </p>
          )}
        </div>
      ) : (
        all_product.map((item) => {
          if (cartItems[item.id] > 0) {
            return (
              <div key={item.id} className="cartItems-format cartItems-format-main">
                <img src={item.image} alt={item.name} className='cartIcon-product-icon' />
                <p>{item.name}</p>
                <p>Rs. {item.new_price}</p>
                <button className='cartItems-quantity'>{cartItems[item.id]}</button>
                <p>Rs. {item.new_price * cartItems[item.id]}</p>
                <img
                  src={remove_icon} 
                  onClick={() => removeFromCart(item.id)} 
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

          {!isAuthenticated && (
            <div className="cart-persistence-info" style={{
              backgroundColor: '#fff4e6',
              padding: '10px',
              margin: '10px 0',
              borderRadius: '5px',
              fontSize: '14px',
              color: '#a63e00'
            }}>
              ⚠ Your cart will not be saved because you are not logged in.
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

              {/* ------------------- PayPal Buttons ------------------- */}
              <PayPalScriptProvider options={{ "client-id": `${process.env.PAYPAL_CLIENT_ID}`, currency: "LKR" }}>
                <PayPalButtons
                  style={{ layout: 'vertical', color: 'blue', shape: 'rect', label: 'pay' }}
                  createOrder={async (data, actions) => {
                    const res = await fetch('http://localhost:4000/paypal/create-order', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ amount: totalUSD })
                    });
                    const orderData = await res.json();
                    return orderData.id;
                  }}
                  onApprove={async (data, actions) => {
                    const res = await fetch(`http://localhost:4000/paypal/capture-order/${data.orderID}`, {
                      method: 'POST',
                    });
                    const captureData = await res.json();
                    console.log('Payment successful:', captureData);
                    alert('Payment Successful!');
                    clearUserCart(); // Clear cart after payment
                  }}
                  onError={(err) => {
                    console.error(err);
                    alert('Payment failed. Try again!');
                  }}
                />
              </PayPalScriptProvider>
            </div>

            <div className="cartItems-promocode">
              <p>If you have a promo code, enter it here</p>
              <div className="cartItems-promobox">
                <input type="text" placeholder='Promo code'/>
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
