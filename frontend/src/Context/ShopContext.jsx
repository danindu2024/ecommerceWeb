import React, { createContext, useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [isCartLoaded, setIsCartLoaded] = useState(false);
  const { isAuthenticated, user, isLoading } = useAuth0();

  // Fetch all products
  useEffect(() => {
    fetch('http://localhost:4000/allProducts')
      .then((res) => res.json())
      .then((data) => setAll_Product(data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  // Load cart when authentication state changes
  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated && user) {
        loadUserCart(user.sub);
      } else {
        // For guest users, start with empty cart
        setCartItems(getDefaultCart());
        setIsCartLoaded(true);
      }
    }
  }, [isAuthenticated, user, isLoading]);

  // Save cart to backend when cart changes (only for authenticated users)
  useEffect(() => {
    if (isCartLoaded && isAuthenticated && user) {
      const debounceTimer = setTimeout(() => {
        saveUserCart(user.sub, cartItems);
      }, 1000); // Debounce to avoid too many API calls

      return () => clearTimeout(debounceTimer);
    }
  }, [cartItems, isAuthenticated, user, isCartLoaded]);

  // Load user cart from backend
  const loadUserCart = async (userId) => {
    try {
      const response = await fetch(`http://localhost:4000/cart/${userId}`);
      const data = await response.json();
      
      if (data.success) {
        // Convert the Map object to regular object with numeric keys
        const loadedCart = { ...getDefaultCart() };
        if (data.cartItems) {
          Object.entries(data.cartItems).forEach(([key, value]) => {
            loadedCart[key] = value;
          });
        }
        setCartItems(loadedCart);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      setCartItems(getDefaultCart());
    } finally {
      setIsCartLoaded(true);
    }
  };

  // Save user cart to backend
  const saveUserCart = async (userId, cart) => {
    try {
      // Only save non-zero items to reduce data size
      const nonEmptyCart = {};
      Object.entries(cart).forEach(([key, value]) => {
        if (value > 0) {
          nonEmptyCart[key] = value;
        }
      });

      await fetch('http://localhost:4000/cart/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          cartItems: nonEmptyCart
        })
      });
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  };

  // Clear user cart
  const clearUserCart = async () => {
    if (isAuthenticated && user) {
      try {
        await fetch('http://localhost:4000/cart/clear', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.sub
          })
        });
      } catch (error) {
        console.error('Error clearing cart:', error);
      }
    }
    setCartItems(getDefaultCart());
  };

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
    }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const itemInfo = all_product.find(
          (product) => product.id === Number(itemId)
        );
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[itemId];
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
    clearUserCart,
    isCartLoaded
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;