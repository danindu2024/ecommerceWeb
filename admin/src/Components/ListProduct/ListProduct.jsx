import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([])

  const fetchInfo = async () => {
    await fetch('http://localhost:4000/allProducts')
      .then((res) => res.json())
      .then((data) => {setAllProducts(data)})
  }

  useEffect(() => {
    fetchInfo()
  }, [])

  const removeProduct = async (id) => {
    await fetch('http://localhost:4000/removeProduct', {
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({id:id})
    })
    await fetchInfo()
  }

  return (
    <div className='listProduct'>
      <h1>All product List</h1>
      <div className="listProduct-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listProduct-allProducts">
        <hr />
        {allproducts.map((product, index) => {
          return <>
          <div key={index} className='listProduct-format-main listProduct-format'>
            <img src={product.image} alt="" className="listProduct-product-icon" />
            <p>{product.name}</p>
            <p>Rs. {product.old_price}</p>
            <p>Rs. {product.new_price}</p>
            <p>{product.category}</p>
            <img onClick={() => {removeProduct(product.id)}} className='listProduct-remove-icon' src={cross_icon} alt="" />
          </div>
          <hr />
          </>
        })}
      </div>
    </div>
  )
}

export default ListProduct
