import React, {createContext, useEffect, useState} from 'react';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300; index++) {
    cart[index] = 0;  // safer: use product ids instead of index
  }
  return cart;
};

const ShopContextProvider = (props) => {
    const [all_product, setAll_Product] = useState([])
    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(() => {
      fetch('http://localhost:4000/allProducts')
      .then((res) => res.json())
      .then((data) => setAll_Product(data))
    }, [])

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