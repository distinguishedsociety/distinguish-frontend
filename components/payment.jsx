import React , {useEffect} from 'react'
import {Container , Button , TextField } from '@mui/material'
import axios from 'axios';
import Cookies from 'js-cookie';
import { useSession, getSession } from 'next-auth/react'

export default function payment(props) 
{
  const { data: session } = useSession()

  console.log("data" , data)
    console.log("session" , session)
    const data = {
        address: props.address.address,
        landmark: props.address.landmark,
        state: props.address.state,
        city: props.address.city,
        isInternational: props.address.isInternational,
        pincode: props.address.pincode,
        delivery_country: props.address.delivery_country,
        order_type: props.address.order_type,
        phoneNumber: props.address.phoneNumber,
    }
    async function placeOrder()
    {
        let res;
       res = await axios(
        {
            url: `https://localhost:9000/internal/api/users/placeOrder` ,
            method: "POST",
            headers: {
              'authorization' : localStorage.getItem('user') ?? ""
                },
            data : data
        }
      )
      if(res.data.status == 'success')
      {
       
      }
      else
      {
       
      }
    }

    async function placeGuestOrder()
    {
      const guestCart = JSON.parse(Cookies.get("cart"))
      const guestData = {...data , guestCart};
      console.log("guest data" , guestData)
      //   let res;
      //  res = await axios(
      //   {
      //       url: `https://www.thedistinguishedsociety.com/internal/api/users/placeGuestOrder` ,
      //       method: "POST",
      //       headers: {
      //         'authorization' : localStorage.getItem('user') ?? ""
      //           },
      //       data : data
      //   }
      // )
      // if(res.data.status == 'success')
      // {
       
      // }
      // else
      // {
       
      // }
    }
    useEffect(()=>{
       
       session? placeOrder() : placeGuestOrder()
    },[])
  return (
    <Container>payment</Container>
  )
}
