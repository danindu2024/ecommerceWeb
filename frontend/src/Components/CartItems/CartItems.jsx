import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Asserts/cart_cross_icon.png';

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);

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
      {all_product.map((e) => {
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
        } else {
          return null;
        }
      })}
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
            <p>IF you have a promo code, Enter it here</p>
            <div className="cartItems-promobox">
                <input type="text" placeholder='promo code'/>
                <button>Submit</button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default CartItems;
