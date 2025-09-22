import React from 'react'
import './popular.css'
import data_product from '../Asserts/data'
import Item from '../Item/item'

const popular = () => {
  return (
    <div>
        <div className="popular">
            <h1>POPULAR IN WOWEN</h1>
            <hr />
            <div className="popular-items">
                {data_product.map((item, i)=>{
                    return <Item key={i} id={item.id} image={item.image} name={item.name} new_price={item.new_price} old_price={item.old_price}/>
                })}
            </div>
        </div>
    </div>
  )
}

export default popular
