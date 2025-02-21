import React from 'react'

const Footer = () => {

    const year = new Date().getFullYear()
  return (
    <footer className=' w-[80%] mx-auto text-center border-t-2 border-[#989898] py-4 text-[16px]'>
        <p className=' capitalize'>{year} &copy; CryptoCurrencyPulse , all rights reserved</p>
    </footer>
  )
}

export default Footer