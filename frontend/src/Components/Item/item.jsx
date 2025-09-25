import React from 'react';
import { Link } from 'react-router-dom';
import './item.css';

const Item = ({ id, image, name, new_price, old_price }) => {
  return (
    <div className="item">
      <Link to={`/product/${id}`}>
        <img 
          src={image} 
          alt={name} 
          onClick={() => window.scrollTo(0, 0)} 
        />
      </Link>
      <p className="item-name">{name}</p>
      <div className="item-prices">
        <span className="item-price-new">Rs. {new_price}</span>
        <span className="item-price-old">Rs. {old_price}</span>
      </div>
    </div>
  );
};

export default Item;
