import React from 'react'
import Leftnav from './Components/Leftnav'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/StaticPage'
import DynamicPage from './pages/Static'
import Footer from './pages/Footer'
import './App.css'

const App = () => {
  
  return (
    <>
      <BrowserRouter>
      <Leftnav/>
      <Routes>
      <Route path="/company-information/:page" element={<DynamicPage />} />
        <Route path="/more-from-rubix/:page" element={<DynamicPage />} />
        <Route path="/addfooter" element={<Footer />} />
        <Route path="/" element={<Home />} />
        <Route path='/contact' element={<Contact/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App