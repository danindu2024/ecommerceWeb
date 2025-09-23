import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom'
import Breadcrumb from '../Components/BreadCrumb/Breadcrumb'
import ProductDispaly from '../Components/ProductDisplay/ProductDispaly'

const Product = () => {
  const {all_product} = useContext(ShopContext)
  const {productId} = useParams()
  const product = all_product.find(product => product.id === Number(productId))
  return (
    <div>
      <Breadcrumb product={product} />
      <ProductDispaly product={product} />
    </div>
  )
}

export default Product
