import React, { useEffect, useState, useRef } from 'react'
import { Card, CardContent, CardMedia } from '@mui/material'
import OutlinedInput from '@mui/material/OutlinedInput'
import Slides from './components/Slides/Slides'
import MyCardComponent from './components/MyCardComponent/MyCardComponent'
import AuctionCard from './components/AuctionCard/AuctionCard'
import axios from 'axios'
import LiveAuctionStyle from "./LiveAuction.module.css"

const LiveAuction = () => {
  // const [auctions, setAuctions] = useState([{title:"hello",image:"https://images.unsplash.com/photo-1507882690564-a51298183825?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODZ8fGF1Y3Rpb258ZW58MHwwfDB8fHww",description:"helloooooooooooooooooooooooooooooo"}])
  const [auctions, setAuctions] = useState([])
  const [count,setCount] =useState(0)
  const [sold,setSold] = useState(false)

  useEffect(() => {
    async function fetchData()  {
      try {
        const response = await axios.get(
          'http://localhost:8000/api/auctions/notsold'
        )
        console.log('RESPONSE :', response.data)
        setAuctions(response.data)
      } catch (error) {
        console.log('ERROR :', error)
      }
    }
    fetchData()

    axios.get("http://localhost:8000/api/user/auctions",{ withCredentials: true } )
    .then(res=>console.log("bought auctions",res.data))
    .catch(error=>console.log(error))
  }, [count])



  const auctionsCopy = [...auctions]
  const firstFourItems = auctionsCopy.slice(count+1, count+5)
  // console.log('copy', auctionsCopy)
  // console.log('original', auctions)
  // const timerFunction = (seconds, setSeconds, isSold,bids) => {
  //   const intervalId = setInterval(() => {

  //     if (seconds >= 1 && seconds <= 7 ) {
  //       console.log("Seconds :", seconds, "Is Sold", isSold);
  //       let old = seconds -= 1;
  //       setSeconds(old);
  //     } else {
  //       setSeconds(7);
  //       setCount(count+1)
     
  //         setSold(true)
  //         console.log('Item Sold ++++',bids[bids.length-1])

        
  //       clearInterval(intervalId); 
  //     }
  //   }, 1000);
  
  //   return () => clearInterval(intervalId);
  // };
  


  // useEffect(() => {
  //   let interval

  //   if (currentBid !== null) {
  //     interval = setInterval(() => {
  //       setTimer(prevTimer => prevTimer + 1)
  //     }, 1000)
  //   }

  //   console.log('render')

  //   if (timer === 7) {
  //     setSold(true)

  //     // Reset bid-related state variables for the next item after a short delay
  //     setTimeout(() => {
  //       setCount(count + 1)
  //       setOldBid(null)
  //       setCurrentBid(null)
  //       setNewBid(null)
  //       setTimer(0)
  //       setSeconds(7)
  //       setSold(false) // Reset the sold state
  //     }, 1000) // Adjust the delay as needed
  //   }

  //   return () => {
  //     clearInterval(interval)
  //   }
  // }, [currentBid, timer, count, sold])


  return (
    <div  className={`container-fluid m-0 p-3 ${LiveAuctionStyle.backgroundImageStyle}`}>
      {auctions.length > 0 ? (
        <>
          <div className={LiveAuctionStyle.title}>
            <h1  className=' text-center m-4 text-primary'>
              Live Auction
            </h1>
          </div>
          <div className='d-flex justify-content-around '>
            <AuctionCard auctions={auctions}  count={count} setCount={setCount}/>

           
            <div className='col-6  '>
              <MyCardComponent
                itemsArray={auctions}
                count={count}
              />
              <div className='d-flex'>
                {firstFourItems.map((item, idx) => (
                  <Slides item={item} key={idx} />
                ))}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}

export default LiveAuction