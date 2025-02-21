import React, { useContext } from 'react'
import logo from '../assets/logo.png'
import { NavLink } from 'react-router-dom'
import { CoinContext } from '../context/CoinContext'

const Navbar = () => {

  const {setCurrency} = useContext(CoinContext)

  const currencyHandler = (e)=>{
    switch(e.target.value){
      case 'usd':
        setCurrency({name:'usd', symbol:'$'})
        break
      case 'eur':
        setCurrency({name:'eur', symbol:'€'})
        break
      case 'gbp':
        setCurrency({name:'gbp', symbol:'£'})
        break
      case 'inr':
        setCurrency({name:'inr', symbol:'₹'})
        break
      default :
        setCurrency({name:'usd', symbol:'$'})
        break
    }
  }

  return (
    <nav className=' flex justify-between items-center py-[20px] px-[10%] text-[#ddd] border-b-2 border-[#3c3c3c]'>
        <NavLink to='/'><img src={logo} alt="logo" className=' max-w-[12vw] max-h-[120px]'/></NavLink>
        <select onChange={currencyHandler} className=' py-[5px] px-[8px] rounded-[6px] border-2 border-[#fff] bg-transparent text-white'>
            <option className=' bg-[#09005c] text-white' value="usd">USD</option>
            <option className=' bg-[#09005c] text-white' value="eur">EUR</option>
            <option className=' bg-[#09005c] text-white' value="gbp">GBP</option>
            <option className=' bg-[#09005c] text-white' value="inr">INR</option>
        </select>
    </nav>
  )
}

export default Navbar