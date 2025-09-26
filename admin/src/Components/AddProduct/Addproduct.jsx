import React, { useState } from 'react';
import './Addproduct.css';
import upload_area from '../../assets/upload_area.svg';

const Addproduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    description: "",
    category: "women",
    new_price: "",
    old_price: ""
  });

  const imageHandler = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setProductDetails({ ...productDetails, image: file });
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const Add_Product = async () => {
    let responseData;
    let product = productDetails;

    // Upload image first
    let formData = new FormData();
    formData.append('product', image);

    await fetch('http://localhost:4000/upload', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: formData,
    })
    .then(resp => resp.json())
    .then(data => { responseData = data; });

    if (responseData.success) {
      product.image = responseData.image_url;

      await fetch('http://localhost:4000/addProduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type':'application/json'
        },
        body: JSON.stringify(product),
      })
      .then(resp => resp.json())
      .then(data => {
        data.success ? alert("Product Added") : alert("Failed to Add Product");
      });
    }
  };

  return (
    <div className='addProduct'>
      <div className="addProduct-itemField">
        <p>Product Title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name='name'
          placeholder='Type Here'
        />
      </div>

      <div className="addProduct-itemField">
        <p>Product Description</p>
        <textarea
          value={productDetails.description}
          onChange={changeHandler}
          name="description"
          placeholder="Enter product description"
          rows={4}
          style={{ width: '100%', borderRadius: '6px', border: '1px solid #E0E0E0', padding: '8px', fontSize: '14px' }}
        />
      </div>

      <div className="addProduct-price">
        <div className="addProduct-itemField">
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name='old_price'
            placeholder='Type Here'
          />
        </div>
        <div className="addProduct-itemField">
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name='new_price'
            placeholder='Type Here'
          />
        </div>
      </div>

      <div className="addProduct-itemField">
        <p>Product Category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className='add-product-selector'
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kids">Kids</option>
        </select>
      </div>

      <div className="addProduct-itemField">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            alt=""
            className='addProduct-thumbnail-img'
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name='image'
          id='file-input'
          hidden
        />
      </div>

      <button onClick={Add_Product} className='addProduct-btn'>
        ADD
      </button>
    </div>
  );
};

export default Addproduct;
