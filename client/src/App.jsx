import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/commonComponents/Navbar'
import { Home } from './components/Home'
import Login from './components/userComponents/Login'
import Register from './components/userComponents/Register'
import { ToastContainer, toast } from 'react-toastify';
import ShowPassword from './components/ShowPassword'
import Dashboard from './components/userComponents/Dashboard'
import Footer from './components/commonComponents/Footer'
import AddPassword from './components/AddPassword'


const App = () => {
  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <BrowserRouter>
        <Navbar />
        <ToastContainer />
        <Routes>

          <Route path='/' element={<Home />} > </Route>
          <Route path='/user/passwords' element={<ShowPassword />} > </Route>
          <Route path='/user/register' element={<Register />} > </Route>
          <Route path='/user/login' element={<Login />} > </Route>
          <Route path='/user/dashboard' element={<Dashboard />} > </Route>
          <Route path='/user/password/add' element={<AddPassword />} > </Route>

        </Routes>
        <Footer />
      </BrowserRouter>


    </>
  )
}

export default App