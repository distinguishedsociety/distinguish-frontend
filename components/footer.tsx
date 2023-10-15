import React , {useContext} from 'react';
import {Container} from '@mui/material';
import Link from 'next/link';
import {Context} from '../context/country';
import CountryPopup from './countryPopup';

export default function footer() {
  const myData= useContext(Context);
  const[open , setOpen]= React.useState(false);
    const [country , setCountry] = React.useState(myData.value.country);
    const handleClose = ()=>{
      setOpen(false)
  }
  return (
    <div className="footer ">
      <Container>
      <div className='mainContentFooter'>
        <div className='div1'>
        <img className='footerLogo' src={"../assets/TDS FINAL LOGO WHITE.png"}></img>
        <div>
          <h1>DISTINGUISHED SOCIETY</h1>
          <p>A product of Indian Origin.</p>
          </div>
        </div>
        <div className='RespDivFooter'>

        
        <div className='div2'>
          <Link href="../products">
            <p className='inline footerLink' style={{cursor : "pointer"}}>
                Our collection
            </p>
          </Link>
          <br/>
          <Link href="../products">
            <p className='inline footerLink' style={{cursor : "pointer"}}>
            New arrivals
            </p>
          </Link>
          <br/>
          <Link href="../blogs">
            <p className='inline footerLink' style={{cursor : "pointer"}}>
            Blogs
            </p>
          </Link>
          <br/>
          <p className='inline footerLink' style={{cursor : "pointer"}} onClick={()=>setOpen(true)} >
              Shipping to :  {myData.value.country}
          </p>
          <br/>
          <Link href="../AffiliateProgram">
            <p className='inline footerLink' style={{cursor : "pointer"}}>
              Become an Affiliate
            </p>
          </Link>
        </div>
        <div className='div3'>
        <Link href="../contactUs">
          <p className='inline footerLink' style={{cursor : "pointer"}}>
          Contact us
          </p>
        </Link>
          <br/>
          <Link href="../termsAndConditions">
          <p className='inline footerLink' style={{cursor : "pointer"}}>
          Terms & conditions
          </p>
          </Link>
          <br/>
          <Link href="../privacyPolicy">
          <p className='inline footerLink' style={{cursor : "pointer"}}>
          Privacy Policy
          </p>
          </Link>
          <br/>
          <Link href="../shippingAndReturn">
          <p className='inline footerLink' style={{cursor : "pointer"}}>
          Shipping and Return Policy
          </p>
          </Link>
        
        </div>
        </div>
      </div>
         <div className='subContentFooter'>
           <p>@2022 Distinguished society | All Rights Reserved</p>
           <div>
           <img src='../assets/payment.png'></img>
           <div className='mt-4 methods'>Payment methods Accepted </div>
           </div>
           
         </div>
      </Container>
      <CountryPopup open={open} handleClose={handleClose} country={country} setCountry={setCountry}/>

    </div>
  )
}
