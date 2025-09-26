import React, { useContext, useEffect, useState } from 'react';
import './DescriptionBox.css'
import { useParams } from 'react-router-dom';

const DescriptionBox = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
      fetch(`http://localhost:4000/product/${productId}`)
        .then(res => res.json())
        .then(data => setProduct(data))
        .catch(err => console.log(err));
    }, [productId]);

    if (!product) return <p>Loading...</p>;

  return (
    <div className='descriptionBox'>
      <div className="descriptionBox-navigator">
        <div className="descriptionBox-nav-box">Description</div>
        <div className="descriptionBox-nav-box fade">Reviews (22)</div>
      </div>
      <div className="descriptionBox-description">
        {product.description || "No description available."}
      </div>
    </div>
  )
}

export default DescriptionBox
