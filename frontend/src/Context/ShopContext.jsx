import React, {createContext, useState} from 'react';
import all_product from "../Components/Asserts/all_product";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < all_product.length; index++) {
    cart[all_product[index].id] = 0;  // safer: use product ids instead of index
  }
  return cart;
};

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());

    const addToCart = (itemId) => {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: (prev[itemId] || 0) + 1, // safe increment
      }));
      console.log(cartItems);
      
    };

    const removeFromCart = (itemId) => {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: prev[itemId] - 1, // safe increment
      }));
    };

    const getTotalCartAmount = () => {
      let totalAmount = 0;
      for (const itemId in cartItems) {
        if (cartItems[itemId] > 0) {
          const itemInfo = all_product.find(
            (product) => product.id === Number(itemId)
          );
          totalAmount += itemInfo.new_price * cartItems[itemId];
        }
      }
      return totalAmount;
    };

    const getTotalCartItems = () =>{
      let totaItem = 0
      for(const item in cartItems){
        if(cartItems[item]>0){
          totaItem += cartItems[item]
        }
      }
      return totaItem
    }

    const contextValue = {
      all_product,
      cartItems,
      addToCart,
      removeFromCart,
      getTotalCartAmount,
      getTotalCartItems   // ✅ make it available
    };
    
  return (
    <ShopContext.Provider value={contextValue}>
        {props.children}
    </ShopContext.Provider>
  )
};

export default ShopContextProvider;