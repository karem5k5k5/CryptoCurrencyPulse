import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CoinContext } from './../context/CoinContext';
import { BeatLoader } from 'react-spinners';
import LineChart from '../components/LineChart';

const Coin = () => {

  const { id } = useParams()

  const [coinData, setCoinData] = useState()
  const [historicalData, setHistoricalData] = useState()

  const { currency } = useContext(CoinContext)

  const fetchCoinData = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': '	CG-nBsgU5sMxXV1eJzG4BQZmtPh'
      }
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${id}`, options)
      .then(res => res.json())
      .then(res => setCoinData(res))
      .catch(err => console.error(err));
  }

  const fecthHistoricalData = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': '	CG-nBsgU5sMxXV1eJzG4BQZmtPh'
      }
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
      .then(res => res.json())
      .then(res => setHistoricalData(res))
      .catch(err => console.error(err));
  }

  useEffect(() => {
    fetchCoinData()
    fecthHistoricalData()
  }, [currency])


  if (coinData && historicalData) {
    return (
      <section className=' px-5'>
        <div className=' flex flex-col items-center gap-5 my-[100px] mx-auto mb-[50px]'>
          <img className=' max-w-[100px]' src={coinData.image.large} alt={coinData.name} />
          <p><b className=' text-[44px] font-medium'>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
        </div>
        <div className=' max-w-[600px] mx-auto h-[250px]'>
          <LineChart historicalData={historicalData}/>
        </div>
        <div className=' flex flex-col max-w-[600px] mx-auto my-[50px]'>
          <ul className=' flex justify-between py-2.5 border-b-2 border-[#5f5d5f] list-none'>
            <li>Crypto Market Rank</li>
            <li className=' font-semibold'>{coinData.market_cap_rank}</li>
          </ul>
          <ul className=' flex justify-between py-2.5 border-b-2 border-[#5f5d5f] list-none'>
            <li>Current Price</li>
            <li className=' font-semibold'>{currency.symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}</li>
          </ul>
          <ul className=' flex justify-between py-2.5 border-b-2 border-[#5f5d5f] list-none'>
            <li>Market Cap</li>
            <li className=' font-semibold'>{currency.symbol} {coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
          </ul>
          <ul className=' flex justify-between py-2.5 border-b-2 border-[#5f5d5f] list-none'>
            <li>24H High</li>
            <li className=' font-semibold'>{currency.symbol} {coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
          </ul>
          <ul className=' flex justify-between py-2.5 border-b-2 border-[#5f5d5f] list-none'>
            <li>24H Low</li>
            <li className=' font-semibold'>{currency.symbol} {coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
          </ul>
        </div>
      </section>
    )
  } else {
    return (
      <section className=' h-[80vh] flex justify-center items-center'>
        <BeatLoader
          loading
          margin={3}
          size={60}
          color='#fff'
        />
      </section>
    )
  }

}

export default Coin