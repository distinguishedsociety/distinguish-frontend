import React , {useEffect , useState} from 'react'
import {Container , StepContent , Typography , Stepper ,Step , StepLabel , Button} from '@mui/material'
import { Footer , Navigation, AddressDetails , ShipmentDetails,Payment } from '../../components';
import styles from './index.module.css';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import Router,{ useRouter } from "next/router"
import Link from "next/link";
import Head from "next/head";
import Cookies from 'js-cookie';

export default function OdersStatus({setCartData}) {
   const router = useRouter();
   let query , est
   const [estDate , setEstDate] = useState()
   useEffect(()=>{
    Cookies.remove('cart')
       query = router.query;
       est = query.est_date ;
       setEstDate(est)
       setCartData([])
   },[])
  return (
      <>
         {/* <Navigation/> */}
         <Head>
         {/* <meta name="description" content="Distinguished Society is for the upcoming visionaries, the ones who speak with their art and creativity. The ones who choose the harder path for a greater purpose. The ones who believe that creativity is the measure of a persons greatness. The Creative Geniuses."  ></meta> */}
        <meta name="keywords" 
            content="distinguished,distinguished society,tee of greatness,
            underrated visionaries,art,creativity,The Creative Geniuses,
            t-shirts,Nikola Tesla Beige Tee,Oversized Fit Tee,
            Heavy Ribbed Neck,Oversized Fit Tee with Heavy Ribbed Neck,
            The Tee of Peace,Puff Print,Tee with Puff Print,
            The Creators Tote Bag,Tote bag,creators tee,
            unfinished clothing brand,legacy brand,
            miseducated,Unfinished,distinguished tshirt,
            tshirt distinguished,distinguished bags,
            distinguished tote bags,distinguished society tshirt,
            tshirt distinguished society,distinguished society tote bags,
            the distingushed society" 
        />
        <meta name="robots" content="noindex,nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

              <title>Order Status | Distinguished Society</title>
            </Head>
         <Container>
            <div className={styles.mainGrid}>
                <h1 className='heading'> Your order is confirmed!</h1>
                 {/* <h2>
                    Your order ID is 265354
                 </h2> */}
                 <div className={styles.iconBackground}>
                 <DoneRoundedIcon className={styles.done}/>
                 </div>
                
                 {/* <p>You paid total amount 1820 INR </p> */}
                 <p>Your order will be delivered by {estDate}</p>
                 <Link href="/" >
                      <Button className={styles.continueButton} variant="outlined" >
                         Countinue Shopping
                     </Button>
                 </Link>
                
            </div>
         </Container>
        <Footer/>
      </>
   

  )
}
