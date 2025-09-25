import React, { useEffect } from 'react'
import './popular.css'
import Item from '../Item/item'

const Popular = () => {

  const [popularProducts, setPopularProducts] = React.useState([])

  useEffect(() => {
    fetch('http://localhost:4000/popularwomen')
    .then((res) => res.json())
    .then((data) => setPopularProducts(data))
  }, [])

  return (
    <div> 
        <div className="popular">
            <h1>POPULAR IN WOWEN</h1>
            <hr />
            <div className="popular-items">
                {popularProducts.map((item, i)=>{
                    return <Item key={i} id={item.id} image={item.image} name={item.name} new_price={item.new_price} old_price={item.old_price}/>
                })}
            </div>
        </div>
    </div>
  )
}

export default Popular
