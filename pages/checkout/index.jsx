import React, { useEffect, useState, useContext } from 'react'
import {
  Footer,
  Navigation,
  AddressDetails,
  ShipmentDetails,
  Payment,
} from '../../components'
import {
  Container,
  StepContent,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
} from '@mui/material'
import styles from './index.module.css'
import axios from 'axios'
import useRazorpay from 'react-razorpay'
import Router, { useRouter } from 'next/router'
import { Triangle } from 'react-loader-spinner'
import { countries } from '../../utils/countries'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSession, getSession } from 'next-auth/react'
import { getCart, updateCart } from '../../services/userServices'
import { Context } from '../../context/country'
import Head from 'next/head'
import Cookies from 'js-cookie';
import { Country, State, City }  from 'country-state-city';

export default function checkout({ cart }) {
  const { data: session } = useSession()
  const myData = useContext(Context)
  console.log(myData)
  const steps = ['Order details', 'Shipping details', 'Payment']
  let [shippingRate, setShippingRate] = useState(0)
  const [activeStep, setActiveStep] = React.useState(0)
  const [skipped, setSkipped] = React.useState(new Set())
  let [cartItems, setCartItems] = useState(cart)
  let [isLoading, setLoading] = useState(false)
  let [no_of_products, setProducts] = useState(0)
  var [subtotal, setSubtotal] = useState(0)
  var [tax, setTax] = useState(0)
  var [total, setTotal] = useState(0)
  let [address, setAddress] = useState({})
  const [countryCode, setCountryCode] = useState()
  const [country, setCountry] = useState(Country.getCountryByCode(myData.value.countryCode))
  let sum = 0
  const Razorpay = useRazorpay()

  const BASE_URL = 'https://www.thedistinguishedsociety.com/internal/api/users'
  // const BASE_URL = 'http://localhost:3002/internal/api/users'

  const [deliveryOptions, setDeliveryOptions] = useState()

  useEffect(() => {
    if(!session)
    {
      if(Cookies.get("cart"))
        cart = JSON.parse(Cookies.get("cart")); 
    } 
    if (cart) {
      setCartItems(cart)
      setProducts(Object.keys(cart).length)
      cart.map((product, index) => {
        sum = parseInt(sum) + parseInt(product.product.price)
      })
      setSubtotal(sum)
      setTax(0.12 * parseInt(subtotal))
      setTotal(parseInt(subtotal) + parseInt(shippingRate))
      localStorage.setItem('order_type', 'Prepaid')
      setLoading(false)
    } else {
      setLoading(false)
    }

    //getCartProducts();
  }, [])

  async function checkShippingPrice() {
    setLoading(true)
    if (country.isoCode== 'IN') {
      setShippingRate(0)
      setLoading(false)
      activeStep == 0 && handleNext();
    } else {
    //   const country = await countries.filter(function (i, n) {
    //     return i.countryName == address.delivery_country
    //   })
      const code = country.isoCode
      setCountryCode(code)
      setShippingRate(823.22)
      console.log("to check order type" , code)
      // if (code) {
      //   let shippingData = {
      //     pincode: address.pincode,
      //     delivery_country: country.isoCode,
      //     order_type: "Prepaid",
      //     cart : JSON.parse(Cookies.get("cart"))
      //   }
      //   console.log("shipping details" ,shippingData )
      //   let res = await axios({
      //     url: `https://www.thedistinguishedsociety.com/internal/api/users/fetchCartDeliveryOptions`,
      //     method: 'POST',
      //     // headers: {
      //     //   authorization: `Bearer ${session.id}`,
      //     // },
      //     data: shippingData,
      //   })
      //   if (res.data.status == 'success') {
      //     setLoading(false)
      //     setShippingRate(res.data.data.rate.rate)
      //     setDeliveryOptions(res.data.data)
      //     handleNext()
      //   } else {
      //     setLoading(false)
      //     toast.error('Something went wrong. Please try again', {
      //       position: 'top-center',
      //       autoClose: 2000,
      //       hideProgressBar: false,
      //       closeOnClick: true,
      //       pauseOnHover: true,
      //       draggable: true,
      //       progress: undefined,
      //     })
      //   }
      //   setLoading(false)
      // } else {
      //   setLoading(false)
      //   toast.error('Something went wrong. Please try again', {
      //     position: 'top-center',
      //     autoClose: 2000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //   })
      // }
      setLoading(false)
      handleNext()
    }
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  async function proceedToPay() {
   
    setLoading(true)
    const data = {
      firstname: address.firstname,
      lastname: address.lastname,
      email: address.email,
      address: address.address,
      landmark: address.landmark,
      state: address.state.name,
      city: address.city,
      isInternational: address.isInternational,
      pincode: address.pincode,
      country: country.name,
      delivery_country: country.isoCode,
      order_type: address.order_type,
      phoneNumber: address.phoneNumber,
    }
    console.log(address)
    console.log("data" , data)
    const cart = JSON.parse(Cookies.get("cart"))
    const guestData = {...data , cart};
    console.log("guest data" , guestData)
    let res
    await axios(session?{
      url: `${BASE_URL}/placeOrder`,
      method: 'POST',
      headers: {
        authorization: `Bearer ${session.id}`,
      },
      data: data,
    }:
    {
      url: `${BASE_URL}/placeGuestOrder`,
      method: 'POST',
      data: guestData,
    }
    )
      .then((res) => {
        console.log("response" , res)
        if (data.order_type == 'Prepaid' || guestData.order_type == 'Prepaid') {
         console.log("inside")
          setLoading(false)
          var options = {
            key_id: 'rzp_live_HRTCJnxkRyWNF2',
            amount: res.data.data.paymentId.amount * myData.value.currencyRate,
            currency: 'INR',
            name: 'Distinguished Society',
            description: 'Order Payment',
            order_id: res.data.data.paymentId.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            handler: function (response) {
              if (response.razorpay_payment_id) {
                setLoading(true)
                Router.push({
                  pathname: '../orderStatus',
                  query: { amount: total, est_date: res.data.data.etd },
                })
              }
            },
            prefill: {
              name: address.firstname,
              email: address.email,
              contact: address.phoneNumber,
            },
            notes: {
              address: 'Razorpay Corporate Office',
            },
          }

          console.log("payment options" , options)
          const paymentObject = new window.Razorpay(options)
          paymentObject.open()

          paymentObject.on('payment.failed', function (res) {})
        } else {
          setLoading(true)
          Router.push({
            pathname: '../orderStatus',
            query: { amount: total, est_date: res.data.data.etd },
          })
          setLoading(false)
        }
      })
      .catch((error) => {
        setLoading(false)
        toast.error('Something went wrong. Please try again', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      })

    if (!res) {
      toast.error('Something went wrong. Please try again', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  function displayStepContent(index) {
    switch (index) {
      case 0:
        return (
          <AddressDetails
            handleNext={handleNext}
            handleBack={handleBack}
            setAddress={setAddress}
            address={address}
            setLoading={setLoading}
            checkShippingPrice={checkShippingPrice}
            country = {country}
            setCountry = {setCountry}
          />
        )
        break
      case 1:
        return (
          <ShipmentDetails
            handleNext={handleNext}
            handleBack={handleBack}
            address={address}
            setAddress={setAddress}
            checkShippingPrice={checkShippingPrice}
            country = {country}
            setCountry = {setCountry}
          />
        )
        break
      case 2:
        return (
          <Payment
            handleNext={handleNext}
            handleBack={handleBack}
            address={address}
            setAddress={setAddress}
          />
        )
        break;
    }
  }

  if (isLoading) {
    return (
      <div className="mainpage d-flex justify-content-center align-items-center flex-column bg-gray-50">
        <Triangle color="black" height={60} width={60} />
      </div>
    )
  }
  return (
    <>
      <ToastContainer/>
      {/* <Navigation/> */}
      <Head>
        {/* <meta name="description" content="Distinguished Society is for the upcoming visionaries, the ones who speak with their art and creativity. The ones who choose the harder path for a greater purpose. The ones who believe that creativity is the measure of a persons greatness. The Creative Geniuses."  ></meta> */}
        <meta
          name="keywords"
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

        <title> Checkout | Distinguished Society</title>
      </Head>
      <Container>
        <div className={styles.arrivalGrid}>
          <h1 className="heading">Checkout</h1>
        </div>
        <Stepper activeStep={activeStep} className={styles.stepper}>
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            )
          })}
        </Stepper>
        <div className={styles.mainGrid1}>
          <div>
            <React.Fragment>
              {displayStepContent(activeStep)}
              {activeStep != 0 ? (
                <Button
                  className={styles.backButton}
                  onClick={() => handleBack()}
                  variant="outlined"
                >
                  Back
                </Button>
              ) : (
                <></>
              )}
            </React.Fragment>
          </div>
          <div className={styles.billGrid}>
            <div className={styles.arrivalGrid}>
              <h2 className={styles.subHeadText}>Order Summary</h2>
            </div>
            <div className={styles.bill}>
              <table>
                <tr>
                  <td className={styles.tableKey}>Products</td>
                  <td className={styles.tableValue}>{no_of_products}</td>
                </tr>
                <tr>
                  <td className={styles.tableKey}>Subtotal</td>
                  <td className={styles.tableValue}>
                    {(subtotal * myData.value.currencyRate).toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className={styles.tableKey}>Shipping</td>
                  <td className={styles.tableValue}>
                    {(shippingRate * myData.value.currencyRate).toFixed(2)}
                  </td>
                </tr>
                {/* <tr>
                  <td className={styles.tableKey}>Taxes</td>
                  <td className={styles.tableValue}>
                    {(
                      0.12 *
                      parseInt(subtotal) *
                      myData.value.currencyRate
                    ).toFixed(2)}
                  </td>
                </tr> */}
                <tr>
                  <td className={styles.tableKey}>
                    <hr />
                  </td>
                  <td className={styles.tableValue}>
                    <hr />
                  </td>
                </tr>

                <tr>
                  <td className={styles.tableKey}>Total</td>
                  <td className={styles.tableValue}>
                    {(
                      (parseFloat(subtotal) + parseFloat(shippingRate)) *
                      myData.value.currencyRate
                    ).toFixed(2)}
                  </td>
                </tr>
              </table>
            </div>
            {activeStep != 0 ? (
              <Button
                className={styles.continueButton}
                onClick={() => proceedToPay()}
                variant="outlined"
              >
                Proceed to Pay
              </Button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </Container>
      <Footer />
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  try { 
    var {cart , error}  = await getCart(session.id)
    if (error || !cart) {
      return {  props : {cart : []} };
    }   
    return { props: 
                  { 
                      cart : cart
                  } 
            };
  } catch (e) {
    return { props : 
                {
                    cart : []
                } 
            };
  }
}
