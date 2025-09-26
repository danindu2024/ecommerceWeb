import React, { useContext, useMemo, useState } from 'react'
import '../Pages/CSS/shopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import Item from '../Components/Item/item'
import SearchAndSort from '../Components/SearchandSort/SearchandSort'

const ShopCategory = (props) => {
  const { filteredProducts } = useContext(ShopContext)
  const [visibleCount, setVisibleCount] = useState(8) // show 8 initially

  // Filter products by category
  const categoryProducts = useMemo(() => {
    return filteredProducts.filter(item => item.category === props.category)
  }, [filteredProducts, props.category])

  const visibleProducts = categoryProducts.slice(0, visibleCount)

  const handleExploreMore = () => {
    setVisibleCount(categoryProducts.length) // show all remaining products
  }

  return (
    <div className='shopCategory'>
      {/* Banner */}
      <img className='shopCategory-banner' src={props.banner} alt={`${props.category} banner`} />
      
      {/* Search and Sort for category */}
      <div className="shopCategory-controls">
        <SearchAndSort />
      </div>

      {/* Index + Sort Info */}
      <div className="shopCategory-indexSort">
        <p>
          <span>Showing 1–{visibleProducts.length}</span> of {categoryProducts.length} products
        </p>
      </div>
      
      {/* Product Grid */}
      <div className="shopCategory-products">
        {categoryProducts.length === 0 ? (
          <div className="no-category-products">
            <h3>No {props.category} products found</h3>
            <p>Try adjusting your search terms or filters</p>
          </div>
        ) : (
          visibleProducts.map((item, i) => (
            <Item 
              key={i} 
              id={item.id} 
              name={item.name} 
              image={item.image} 
              new_price={item.new_price} 
              old_price={item.old_price}
            />
          ))
        )}
      </div>
      
      {/* Load More */}
      {visibleCount < categoryProducts.length && (
        <div className="shopCategory-loadmore" onClick={handleExploreMore}>
          Explore More
        </div>
      )}
    </div>
  )
}

export default ShopCategory
