import React from 'react'
import './newCollections.css'
import New_collection from '../Asserts/new_collections'
import Item from '../Item/item'

const newCollections = () => {
  return (
    <div className='new-collections'>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {New_collection.map((item, i) => {
          return <Item key={i} id={item.id} image={item.image} name={item.name} new_price={item.new_price} old_price={item.old_price}/>
        })}
      </div>
    </div>
  )
}

export default newCollections
