import React, { useContext } from 'react';
import './AllProducts.css';
import { ShopContext } from '../../Context/ShopContext';
import Item from '../Item/item';

const AllProducts = () => {
  const { filteredProducts, searchTerm } = useContext(ShopContext);

  return (
    <div className="all-products">
      {filteredProducts.length === 0 ? (
        <div className="no-products">
          {searchTerm ? (
            <>
              <h3>No products found for "{searchTerm}"</h3>
              <p>Try searching with different keywords or browse our categories</p>
            </>
          ) : (
            <>
              <h3>No products available</h3>
              <p>Please check back later</p>
            </>
          )}
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((item, i) => (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;