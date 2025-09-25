import React, { useEffect, useState } from 'react'
import './newCollections.css'
import Item from '../Item/item'

const NewCollections = () => {

  const [new_collection, setNew_collection] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/newcollection')
    .then((res) => res.json())
    .then((data) => setNew_collection(data))
  }, [])

  return (
    <div className='new-collections'>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {new_collection.map((item, i) => {
          return <Item key={i} id={item.id} image={item.image} name={item.name} new_price={item.new_price} old_price={item.old_price}/>
        })}
      </div>
    </div>
  )
}

export default NewCollections
