import React, { Component, useEffect , useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';
import Link from "next/link";
import { useRouter } from 'next/router';


export default function offerImages(props) {

  const router = useRouter()

  const [banners , setBanners] = useState(props.banners);
  function redirectImage(image)
  {
    if(image.redirectLink !="#")
    {
        router.push(image.redirectLink)
    }
  }
  return (
    <Carousel showDots={false} autoPlay={true} interval={3000} showThumbs={false} infiniteLoop={true}  verticalSwipe="natural">
   {
     banners?.map((image, index)=>(
      <div onClick={(e)=>redirectImage(image)}>
            <img  src={image.imageLink} className='offerImages' />
      </div>
     ))
   }
    
     {/* <div>
              <img  src={"../assets/bannerimage.png"} className='offerImages' />
          </div>
   <div>
        <img className='offerImages' src={"../assets/bannerimage.png"} />
        
    </div>
    <div>
        <img className='offerImages' src={"../assets/bannerimage.png"} />
    </div>  */}
     </Carousel>
  )
}
