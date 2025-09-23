import React from 'react'
import './RealtedProducts.css'
import data_product from '../Asserts/data'
import Item from '../Item/item'

const RelatedProducts = () => {
  return (
    <div className='relatedProducts'>
      <h1>Related Products</h1>
      <hr />
      <div className="relatedProducts-item">
        {data_product.map((item, i) => {
            return <Item key={i} id={item.id} image={item.image} name={item.name} new_price={item.new_price} old_price={item.old_price}/>
        })}
      </div>
    </div>
  )
}

export default RelatedProducts
