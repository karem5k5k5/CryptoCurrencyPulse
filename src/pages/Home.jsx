import React, { useContext, useEffect, useState } from 'react'
import { CoinContext } from '../context/CoinContext'
import { Link } from 'react-router-dom'


const Home = () => {

    const { allCoin, currency } = useContext(CoinContext)
    const [displayCoin, setDisplayCoin] = useState([])
    const [input, setInput] = useState('')

    const inputHandler = (e) => {
        setInput(e.target.value)
        if (e.target.value===''){
            setDisplayCoin(allCoin)
        }
    }

    const searchHandler = async (e) => {
        e.preventDefault()
        const coins = await allCoin.filter((item) => (
            item.name.toLowerCase().includes(input.toLowerCase())
        ))
        setDisplayCoin(coins)
    }

    useEffect(() => {
        setDisplayCoin(allCoin)
    }, [allCoin])

    return (
        <div className=' px-[10px] pb-[100px]'>
            <div className=' max-w-[600px] my-[80px] mx-auto flex flex-col text-center items-center gap-[30px]'>
                <h1 className=' text-3xl md:text-5xl lg:text-7xl font-bold leading-10 md:leading-14 lg:leading-20 tracking-wide'>Welcome to <br />CryptoCurrencyPulse</h1>
                <p className='w-3/4 text-[#e3e3e3] text-sm md:text-lg font-medium tracking-wide'>Stay updated with live crypto currency rates and track currency trends like a pro with a global view of currency markets</p>
                <form onSubmit={searchHandler} className=' p-2 w-[80%] bg-white rounded-[5px] text-[20px] flex justify-between items-center gap-2.5'>
                    <input onChange={inputHandler} type="text" list='coinList' placeholder='Search for crypto...' className=' text-[16px] outline-none border-none pl-2.5 w-full text-black' value={input} required />
                    <datalist id='coinList'>
                        {allCoin.map((item , idx)=>(<option key={idx} value={item.name}/>))}
                    </datalist>
                    <button type="submit" className=' border-none bg-[#7927ff] sm:py-2.5 sm:px-8 text-[16px] py-1 px-4 rounded-[5px] cursor-pointer'>Search</button>
                </form>
            </div>
            <div className=' max-w-[800px] mx-auto bg-linear-to-b from-[rgba(84,3,255,0.15)] to-[rgba(105,2,153,0.15)] rounded-[16px]'>
                <div className=' grid grid-cols-[0.5fr_2fr_1fr_1fr] md:grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr] py-4 px-5 items-center border-b-2 border-[#3c3c3c]'>
                    <p>#</p>
                    <p>Coins</p>
                    <p>Price</p>
                    <p className=' text-center'>24H Change</p>
                    <p className=' hidden md:block text-right'>Market Cap</p>
                </div>
                {
                    displayCoin.slice(0, 10).map((item, idx) => (
                        <Link to={`/coin/${item.id}`} key={idx} className='grid grid-cols-[0.5fr_2fr_1fr_1fr] md:grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr] py-4 px-5 items-center border-b-2 border-[#3c3c3c] last:border-none'>
                            <p>{item.market_cap_rank}</p>
                            <div className=' flex items-center gap-2.5'>
                                <img src={item.image} className=' w-[35px]' alt={item.name} />
                                <p>{item.name + " - " + item.symbol}</p>
                            </div>
                            <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
                            <p className={item.price_change_percentage_24h > 0 ? 'text-green-500 text-center' : 'text-red-500 text-center'}>{Math.floor(item.price_change_percentage_24h * 100) / 100}</p>
                            <p className=' hidden md:block text-right'>{currency.symbol} {item.market_cap.toLocaleString()}</p>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default Home