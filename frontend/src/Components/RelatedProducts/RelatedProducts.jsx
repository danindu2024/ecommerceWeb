import React, { useContext } from 'react';
import './RealtedProducts.css';
import { ShopContext } from '../../Context/ShopContext';
import Item from '../Item/item';

const RelatedProducts = ({ category, currentProductId }) => {
  const { all_product } = useContext(ShopContext);

  // Filter related products by same category, excluding current product
  const relatedProducts = all_product.filter(
    (product) => product.category === category && product.id !== currentProductId
  );

  if (relatedProducts.length === 0) return null; // No related products

  return (
    <div className='relatedProducts'>
      <h1>Related Products</h1>
      <hr />
      <div className="relatedProducts-item">
        {relatedProducts.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            image={item.image}
            name={item.name}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
