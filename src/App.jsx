import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Coin from './pages/Coin';
import Error from './pages/Error';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className=' text-white min-h-[100vh] bg-linear-to-b from-[#0b004e] via-[#1d152f] to-[#002834]'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/CryptoCurrencyPulse/' element={<Home/>}/>
        <Route path='/coin/:id' element={<Coin/>}/>
        <Route path='*' element={<Error/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App