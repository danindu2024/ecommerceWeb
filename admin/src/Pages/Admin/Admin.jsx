import React from 'react'
import './Admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom'
import ListProduct from '../../Components/ListProduct/ListProduct'
import Addproduct from '../../Components/AddProduct/Addproduct'

const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar />
      <Routes>
        <Route path='/addProduct' element={<Addproduct />}/>
        <Route path='/listProduct' element={<ListProduct />}/>
      </Routes>
    </div>
  )
}

export default Admin
