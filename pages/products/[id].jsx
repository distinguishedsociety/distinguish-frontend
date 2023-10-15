import React, { useState, useEffect, useContext } from 'react'
import { Footer, Size, CountryPopup } from '../../components'
import ProductCard from '../../components/productCard'
import styles from './[id].module.css'
import {
  Button,
  Grid,
  TextField,
  Container,
  IconButton,
  Select,
  MenuItem,
} from '@mui/material'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import axios from 'axios'
import { Triangle } from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  getAllProducts,
  getProduct,
  addItemToCart,
} from '../../services/userServices'
import { Context } from '../../context/country'
import { signOut, useSession, signIn } from 'next-auth/react'
import Head from 'next/head'
import Cookies from 'js-cookie'
import NewReleaseProductCorousel from '../../components/NewReleaseProductCorousel' 

export default function productDetailsPage({ products, product, index }) {
  const { data: session } = useSession()
  let [quantity, setQuantity] = useState(1)
  let [size, setSize] = useState(
    index !== -1 ? Object.keys(product.inventory)[index] : Object.keys(product.inventory)[1]
  )
  console.log("Size state : ", size)
  console.log("Index : ", index)
  let [images, setImages] = useState(product.images)
  let [inventory, setInventory] = useState(product.inventory)
  let [selectedImage, setSelectedImage] = useState(0)
  const [open, setOpen] = React.useState(false)
  const [sizeOpen, setSizeOpen] = React.useState(false)
  const [auth, setAuth] = React.useState('')
  const myData = useContext(Context)

  const handleClose = () => {
    setOpen(false)
  }

  const handleSizeClose = () => {
    setSizeOpen(false)
  }

  function handleUpdate(value) {
    if (inventory[size] < value && value != 0) {
      toast.error('Quantity not available!', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else if (value == 0) {
    } else {
      setQuantity(value)
    }
  }

  const handleChange = (event) => {
    const value = event.target.value
    setSize(value)
  }

  async function addToCart(value) {
    if (session) {
      var { cart, error } = await addItemToCart(
        product,
        size,
        quantity,
        session.id
      )
      if (error || !cart) {
        console.log('error', error)
        toast.error('Something went wrong. Please try again!', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        //signOut();
        signIn()
      }
      if (cart) {
        if (value == 1) {
          Router.push('../myCart')
        } else {
          toast.success('Item added to cart', {
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
    } else {
      const userCart = []
      let currCart
      let isPresent = false
      const newProduct = {
        product: product,
        size: size,
        qty: quantity,
      }
      if (product.inventory[size] == 0 || product.inventory[size] < quantity) {
        toast.error('Product out of stock!', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      } else {
        if (Cookies.get('cart')) {
          currCart = JSON.parse(Cookies.get('cart'))
          currCart.map((item, i) => {
            if (
              item.product.title == newProduct.product.title &&
              item.size == newProduct.size
            ) {
              item.qty = quantity
              isPresent = true
              userCart.push(item)
            } else {
              userCart.push(item)
            }
          })
        }
        if (isPresent == false || userCart.length == 0) {
          userCart.push(newProduct)
        }
        console.log('userCart', userCart)
        Cookies.set('cart', JSON.stringify(userCart))
        const updatedCart = JSON.parse(Cookies.get('cart'))
        console.log('Final cart', updatedCart)
        toast.success('Item added to cart', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        if (value == 1) {
          Router.push('../myCart')
        }
      }
    }
  }

  return (
    <>
      <Head>
        <meta name="description" content={product.description}></meta>
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
        <meta name="robots" content="all" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>{product.title} | Distinguished Society</title>
      </Head>
      <ToastContainer />
      {/* <Navigation/> */}
      <CountryPopup
        open={open}
        handleClose={handleClose}
        setAuth={setAuth}
      ></CountryPopup>
      <Size sizeOpen={sizeOpen} handleSizeClose={handleSizeClose} />

      <Container>
        <div className={styles.arrivalGrid}>
          <h1 className="heading"> Product Details</h1>
          <p className="breadCrumb">
            <Link href="/">Home</Link> &#62; Product details
          </p>
        </div>
        <hr className="insideHr"></hr>
        {/* Product Details */}

        <div className={styles.mainGrid}>
          <div className={styles.imgGrid}>
            <div className='productImage'>
            <img
              className={styles.productImage}
              src={images[selectedImage]}
            ></img>
             {
                 inventory[size] == 0 || inventory[size]<quantity
                  ?
                  <p className={styles.stockNotAvailable}>Out of Stock</p>
                  :<></>
            }
            </div>
          

            <div className={styles.imgViewGrid}>
              {images.map((image, index) => (
                <img
                  className={
                    index == selectedImage
                      ? styles.productImageThumbSelected
                      : styles.productImageThumb
                  }
                  src={image}
                  onClick={() => setSelectedImage(index)}
                ></img>
              ))}
            </div>
          </div>
          <div className={styles.contentGrid}>
            <h2 className={styles.productName}>{product.title}</h2>
            <p className={styles.description}>{product.description}</p>
            <hr className={styles.divider}></hr>
            <p style={{color: "#12B76A" , fontSize:"18px"}}>{product.collectionName.title}</p>

           { 
           product.isLimitedEdition
           ?
           <div className='row' style={{margin:'24px 0px'}}>
                <span className={styles.stockAvailable}>{product.noOfUnitsOfLimitedEdition} drops only</span>
                <span className={styles.limitedEdition}>Limited Edition</span>
            </div>
            :
            <></>
          }
          
            <p className={styles.productPrice}>
              {typeof window !== 'undefined'
                ? myData.value.currency +
                  ' ' +
                  (product.price * myData.value.currencyRate).toFixed(2)
                : product?.price}
            </p>
            <div className={styles.sizeGrid}>
              <Select
                onChange={(event) => {
                  handleChange(event)
                }}
                labelId="select-size"
                id="select-size-id"
                className={styles.size}
                placeholder="Select"
                value={size}
                variant='outlined'
              >
                <MenuItem value={'S'}>Size: S</MenuItem>
                <MenuItem value={'M'}>Size: M</MenuItem>
                <MenuItem value={'L'}>Size: L</MenuItem>
                <MenuItem value={'XL'}>Size: XL</MenuItem>
              </Select>

              <div className={styles.qtyDiv}>
                <IconButton
                  className={styles.qtyElementAdd}
                  aria-label="add item"
                  onClick={() => handleUpdate(quantity + 1)}
                >
                  <AddOutlinedIcon />
                </IconButton>
                <div>{quantity}</div>
                <IconButton
                  className={styles.qtyElementMinus}
                  aria-label="remove item"
                  onClick={() => handleUpdate(quantity - 1)}
                >
                  <RemoveRoundedIcon />
                </IconButton>
              </div>
            </div>
            <p
              style={{ marginBottom: '30px', color: 'blue', cursor: 'pointer' }}
              onClick={() => setSizeOpen(true)}
            >
              Size Chart
            </p>
            {/* <p className={styles.desc}>Description</p>
            <p className="productPrice">{product.description}</p> */}
            <div className={styles.sizeGrid}>
              <Button
                style={{width: '50%'}}
                className="buttonInvert "
                onClick={() => addToCart(0)}
                variant="outlined"
              >
                Add to Cart
              </Button>
              <Button
               style={{width: '50%'}}
                className="buttonInvert "
                variant="outlined"
                onClick={() => addToCart(1)}
              >
                Buy Now
              </Button>
            </div>

            <p className={styles.ship}>
              Get free shipping on orders above Rs. 899(Only for Indian orders)
            </p>
            <p className="breadCrumb mt-5 mb-1">Make payment using</p>
            <img
              className={styles.paymentImg}
              src="../assets/payment.png"
            ></img>
          </div>
        </div>
        {/* Product details */}
        {/* <Model model={product.modelName}/> */}
        {/* Recommended products */}
        <div className={styles.arrivalGrid}>
          <h1 className="heading mt-5">Recommended Products</h1>
          <p className="breadCrumb"></p>
        </div>
        <hr className="insideHr"></hr>
        <div className={styles.latestArrivalsDiv}>
        <NewReleaseProductCorousel products={products}/>
        </div>
      </Container>
      <Footer />
    </>
  )
}

export async function getStaticPaths() {
  const { products, errorsProducts } = await getAllProducts()

  const paths = products.map((product) => ({
    params: { id: product.slug.toString() },
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export async function getStaticProps({ params }) {
  try {
    const { products, errorsProducts } = await getAllProducts()
    const { product, index, errorsProduct } = await getProduct(params.id)
    if (errorsProducts || !products) {
      return { props: { products: [] } }
    }
    if (errorsProduct || !product) {
      return { props: { product: [] } }
    }
    return {
      props: {
        products,
        product,
        index,
      },
      revalidate: 1,
    }
  } catch (e) {
    return {
      props: {
        products: [],
        product: [],
      },
      revalidate: 1,
    }
  }
}
