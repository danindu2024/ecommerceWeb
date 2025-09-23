import React, { useContext } from 'react'
import './CSS/shopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import dropdwon_icon from '../Components/Asserts/dropdown_icon.png'
import Item from '../Components/Item/item'

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  return (
    <div className='shop-category'>
      <img className='shopCategory-banner' src={props.banner} alt="Category Banner" />
      <div className="shopCategory-indexSort">
        <p>
          <span>Showing 1 - 12</span> out of 36 products
        </p>
        <div className="shopCategory-sort">
          Sort by <img src={dropdwon_icon} alt="" />
        </div>
      </div>
      <div className="shopCategory-products">
        {all_product.map((item, i) => {
          if (props.category === item.category) {
            return <Item key={i} id={item.id} image={item.image} name={item.name} new_price={item.new_price} old_price={item.old_price}/>
          }
          else{
            return null;
          }
        })}
      </div>
      <div className="shopCategory-loadmore">
        Explore More
      </div>
    </div>
  )
}

export default ShopCategory