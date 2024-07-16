import React from 'react'
import slidesStyle from './Slides.module.css'


const Slides = (props) => {


    const {item} =props
    console.log(item);

  return (
    <div>
      <div className={slidesStyle.cardContainer}>
      <div className={slidesStyle.card}>
        <div className={slidesStyle.cardInner}>
          <div className={slidesStyle.cardFront}>
            <img style={{borderRadius:"8px",border:"2px solid black"}} src={item.image} alt="" />
          </div>
          <div className={slidesStyle.cardBack}>
            {/* don't remove the img tag!!!!!!!!!!!!!!! */}
            <h3 className='mt-3'>{item.title}</h3>
            <img  src="3.png" alt="" /> 
            <p>Estimated price :</p>
            <p className='mt-3'>{item.price} - {item.price+100} EUR</p>
          </div>
        </div>
      </div>

     
      
      
    </div>
    </div>
  )
}
export default Slides
