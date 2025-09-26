import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDisplay.css';
import star_icon from '../Asserts/star_icon.png';
import star_dull_icon from '../Asserts/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = () => {
  const { productId } = useParams();
  const { addToCart } = useContext(ShopContext);
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null); // selected size

  useEffect(() => {
    fetch(`http://localhost:4000/product/${productId}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.log(err));
  }, [productId]);

  if (!product) return <p>Loading...</p>;

  const sizes = ["S", "M", "L", "XL", "XXL"];

  return (
    <div className='productDisplay'>
      {/* Left Side */}
      <div className="productDisplay-left">
        <div className="productDisplay-img-list">
          {[...Array(4)].map((_, idx) => (
            <img key={idx} src={product.image} alt={product.name} />
          ))}
        </div>
        <div className="prductDisplay-img">
          <img className='productDisplay-main-img' src={product.image} alt={product.name} />
        </div>
      </div>

      {/* Right Side */}
      <div className="productDisplay-right">
        <h1>{product.name}</h1>

        <div className="productDisplay-right-star">
          {[...Array(4)].map((_, idx) => <img key={idx} src={star_icon} alt="star" />)}
          <img src={star_dull_icon} alt="star" />
          <p>(122)</p>
        </div>

        <div className="productDisplay-right-prices">
          <div className="productDisplay-right-price-old">Rs. {product.old_price}</div>
          <div className="productDisplay-right-price-new">Rs. {product.new_price}</div>
        </div>

        <div className="productDisplay-right-description">
          {product.description || "No description available."}
        </div>

        {/* Sizes */}
        <div className="productDisplay-right-size">
          <h1>Select Size</h1>
          <div className="productDisplay-right-sizes">
            {sizes.map(size => (
              <div
                key={size}
                className={selectedSize === size ? "size-option selected" : "size-option"}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        <button onClick={() => addToCart(product.id)}>ADD TO CART</button>

        <p className='productDisplay-right-category'>
          <span>Category :</span> {product.category}
        </p>

        <p className='productDisplay-right-category'>
          <span>Tags :</span> {product.tags?.join(", ") || "Modern, Latest"}
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
