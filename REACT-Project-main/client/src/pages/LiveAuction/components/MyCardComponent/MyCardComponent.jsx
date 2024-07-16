import React from 'react'
import { Card, CardContent, CardMedia } from '@mui/material'


const MyCardComponent = (props) => {
    const {itemsArray,count}=props

    
  const glassStyle = {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
    padding: '20px', // Add padding or adjust as needed
  };
    return (
      <Card elevation={10} style={ glassStyle} className='w-100 '>
        <CardContent style={{textAlign:"center",display:"flex",flexDirection:"column",gap:"5vh"}}>
          <h1 style={{height:"1.5em"}} className='m-3 text-bg-danger rounded-3'> {itemsArray[count].title}</h1>
          <h4 style={{fontSize:"2em"}}> Description : {itemsArray[count].description}</h4>
          <h5  style={{fontSize:"2em"}}>Estimated : <span style={{color:"orange"}} className=' fw-bold'>{itemsArray[count].price} - {itemsArray[count].price+100} EUR</span></h5>
          {/* <h5>Current Bid : {currentBid>0 ?<span className='text-danger fw-bold'>{currentBid}</span>:<span>0</span>}</h5> */}
        
        </CardContent>
      </Card>
    );
}

export default MyCardComponent