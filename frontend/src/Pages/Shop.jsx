import React, { useRef } from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/popular'
import Offers from '../Components/Offers/offers'
import NewCollections from '../Components/NewCollections/newCollections'

const Shop = () => {
  const newCollectionRef = useRef(null)

  const scrollToNewCollection = () => {
    if (newCollectionRef.current) {
      const navbarHeight = 50
      const offsetTop = newCollectionRef.current.offsetTop - navbarHeight
      window.scrollTo({ top: offsetTop, behavior: 'smooth' })
    }
  }

  return (
    <div>
      <Hero onShopClick={scrollToNewCollection} />
      <Popular />
      <Offers />
      <div ref={newCollectionRef}>
        <NewCollections />
      </div>
    </div>
  )
}

export default Shop
