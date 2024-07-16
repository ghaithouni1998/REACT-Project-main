import { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import axios from 'axios'
import sound from './sold.mp3'


export default function App({auctions,count,setCount}) {
  const [oldBid, setOldBid] = useState(null);
  const [currentBid, setCurrentBid] = useState(null);
  const [newBid, setNewBid] = useState(null);
  const [timer, setTimer] = useState(0);
  const [sold, setSold] = useState(false);
  const [counter, setCounter] = useState(0);
  const [seconds, setSeconds] = useState(10);
  const [notificationSound] = useState(new Audio(sound));


  const {_id}= auctions[counter]

  const handleSubmit = (e) => {
    e.preventDefault();

    // Allow bid submission only if the item is not sold
    if ((!isNaN(newBid) && !sold && newBid - 9 > currentBid && newBid>=50) ){
      setOldBid(currentBid);
      setCurrentBid(newBid);
      // reset the timer when someone adds a new bid
      setTimer(0);
      setSeconds(10);
      console.log(auctions[counter]);
    
  }
  };

  useEffect(() => {
    let interval;

    if (currentBid !== null) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }


    console.log('render','seconds', seconds);

    if (timer==10){
      playNotificationSound()


    }

    if (timer === 11) {
      setSold(true);

      // Reset bid-related state variables for the next item after a short delay
      setTimeout(() => {
        setCounter(counter + 1);
        setOldBid(null)
        setNewBid(null);
        setTimer(0);
        setSeconds(10);
        setSold(false); // Reset the sold state
        setCount(count+1)
        console.log(_id);

        
        axios.put(`http://localhost:8000/api/auctions/buy/${_id}/${currentBid}`)
        .then(res=>console.log(res))
        .catch(error=>console.log(error))
        
        setCurrentBid(null);
        
      axios.post(`http://localhost:8000/api/buy`,{auctionId:_id} , { withCredentials: true }).then(res=>console.log(res)).catch(error=>console.log(error))
        
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [currentBid, timer, counter, sold]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Decrement the seconds every second
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [auctions]);

  useEffect(() => {
    // Cleanup function to stop the audio when the component unmounts
    return () => {
        notificationSound.pause();
        notificationSound.currentTime = 0;
    };
}, [notificationSound]);

const playNotificationSound = () => {
    // Play the notification sound
    notificationSound.volume = 1.0;
    notificationSound.play();
};

  const glassStyle = {
    background:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
    padding: '20px' // Add padding or adjust as needed
  }
  return (
    <Card elevation={10} style={glassStyle} className='w-25 h-25  '>
      <CardMedia
        component='img'
        height='auto'
        image={auctions[counter].image}
        alt='Your Image Alt Text'
      />
      <CardContent
        style={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: '5vh'
        }}
      >
        <form
          onSubmit={handleSubmit}
        >
          <div
            style={{
              height: '140px',
              textAlign: 'center'
            }}
            className='p-3'
          >
                       

       {oldBid && (
                  <h3  style={{ opacity: '60%',fontSize:"1.6em" }}>
                    Old Bid : {oldBid} EUR
                  </h3>
                )}
                {currentBid && (
                  <>
                    <h5 style={{fontSize:"1.8em"}} >Current Bid: {currentBid} EUR</h5>
                    {seconds >= 0 && seconds < 5 && (
                      <p className='text-danger fw-bold fs-5'>
                        The item is going to be sold in {seconds  }
                      </p>
                    )}
                    {sold && <p className='text-danger fw-bold fs-4'>Sold!</p>}
                  </>
                )}
          </div>
        
          <OutlinedInput
            className='mt-3 '
            placeholder='Place your Bid In Euros'
            onChange={e =>{ setNewBid(e.target.value);console.log(isNaN(newBid))}}
          />
      
        {/* Conditionally render Bid button */}
     
        &nbsp;&nbsp;<button  className="btn btn-danger  ">Place Bid</button>
       
        </form>
      </CardContent>
    </Card>
  )
}

