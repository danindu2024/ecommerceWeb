import React from 'react';
import './Breadcrumb.css';
import arrow_icon from '../Asserts/breadcrum_arrow.png';
import { Link } from 'react-router-dom'; // Optional if you want clickable breadcrumbs

const Breadcrumb = ({ product }) => {
  if (!product) return null; // Handle missing product

  return (
    <div className='breadcrumb'>
      <Link to="/">Home</Link>
      <img src={arrow_icon} alt="arrow" />
      
      <Link to={`/${product.category.toLowerCase()}`}>{product.category}</Link>
      <img src={arrow_icon} alt="arrow" />
      
      <span>{product.name}</span>
    </div>
  );
};

export default Breadcrumb;
