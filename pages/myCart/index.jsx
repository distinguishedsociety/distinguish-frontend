import React, { useEffect, useState, useContext } from 'react'
import { Footer, Navigation } from '../../components'
import ProductCard from '../../components/productCard'
import styles from './index.module.css'
import {
  Button,
  IconButton,
  Grid,
  TextField,
  Container,
  TableContainer,
  Table,
  Paper,
  TableCell,
  TableHead,
  TableRow,
  MenuItem,
  TableBody,
  Select,
} from '@mui/material'
import Link from 'next/link'
import axios from 'axios'
import Router, { useRouter } from 'next/router'
import { getCart, updateCart } from '../../services/userServices'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Triangle } from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import { useSession, getSession } from 'next-auth/react'
import { Context } from '../../context/country'
import Head from 'next/head'
import Cookies from 'js-cookie'

export default function myCart({ cart, setCartData}) {
  console.log('cart',cart)
  const { data: session } = useSession()
  const [cartItems, setCartItems] = useState(cart)
  let [isLoading, setLoading] = useState(false)
  const myData = useContext(Context)

  useEffect(() => {
    if (!session) {
      if (Cookies.get('cart')) setCartItems(JSON.parse(Cookies.get('cart')))
    }
  }, [])

  async function handleUpdate(id, qty, size, index) {
    if (session) {
      var { cart, error } = await updateCart(id, qty, size, session.id)

      if (cart) {
        console.log('caretupdate', cart)
        setCartItems(cart)
        setCartData([...cart])
        if (qty == 0) {
          toast.success('Item removed', {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        }
      } else {
        toast.error('Item not available', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
    } else {
      const userCart = []
      let currCart
      currCart = JSON.parse(Cookies.get('cart'))
      currCart.map((item, i) => {
        console.log(item)
        if (i == index) {
          if (qty != 0) {
            item.qty = qty
            item.size = size
            userCart.push(item)
          } else if (qty == 0) {
            toast.success('Product removed from cart', {
              position: 'top-center',
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          } else if (item.inventory[size] < qty) {
            toast.error('Product not available!', {
              position: 'top-center',
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          }
        } else {
          userCart.push(item)
        }
        console.log('userCart', userCart)
        Cookies.set('cart', JSON.stringify(userCart))
        const updatedCart = JSON.parse(Cookies.get('cart'))
        console.log('Final cart', userCart)
        setCartItems(updatedCart)
        setCartData([...userCart])
      })
    }
  }

  function validateCart() {
    let check = 0
    cartItems.map((item) => {
      if (item.qty > item.product.inventory[item.size]) {
        check++
      }
    })
    if (check > 0) {
      toast.error('Please remove or update out of stock items', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else {
      Router.push('../checkout')
    }
  }
  if (isLoading) {
    return (
      <div className="mainpage d-flex justify-content-center align-items-center flex-column">
        <Triangle color="black" height={60} width={60} />
      </div>
    )
  }

  if (cartItems.length == 0) {
    return (
      <div classNamae={styles.empty}>
        {/* <Navigation/> */}
        <img className={styles.emptyCart} src="../assets/empty.svg"></img>
        <h2 className={styles.emptyText}>Cart is empty!</h2>
        <Footer />
      </div>
    )
  }
  return (
    <>
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

        <title> My Cart | Distinguished Society</title>
      </Head>
      <ToastContainer />

      {/* <Navigation/> */}
      <Container>
        <div className={styles.arrivalGrid}>
          <h1 className="heading">MY CART</h1>
          <p className="breadCrumb">
            <Link href="/">Home</Link> &#62; My Cart
          </p>
        </div>

        <TableContainer>
          <Table
            sx={{ minWidth: 650 }}
            aria-label="simple table"
            className={styles.desktop}
          >
            <TableHead>
              <TableRow>
                <TableCell className={styles.tableHead}>Product</TableCell>
                <TableCell className={styles.tableHead} align="left">
                  Product Details
                </TableCell>
                <TableCell className={styles.tableHead} align="left">
                  Size
                </TableCell>
                <TableCell className={styles.tableHead} align="left">
                  Quantity
                </TableCell>
                <TableCell className={styles.tableHead} align="left">
                  Remove
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <img
                      className={styles.tableImg}
                      src={item.product.images[0]}
                    ></img>
                  </TableCell>
                  <TableCell>
                    <div>
                      <h1 className={styles.tableMainText}>
                        {item.product.title}
                      </h1>
                      <p className={styles.tablePriceText}>
                        {' '}
                        {myData.value.currency}{' '}
                        {(
                          item.product.price * myData.value.currencyRate
                        ).toFixed(2)}
                      </p>
                      {item.qty > item.product.inventory[item.size] ? (
                        <span className="stockStatus">Item out of stock</span>
                      ) : (
                        <></>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Select
                      onChange={(event) => {
                        handleUpdate(
                          item._id,
                          item.qty,
                          event.target.value,
                          index
                        )
                      }}
                      labelId="select-size"
                      id="select-size-id"
                      className="w-4/5"
                      label="Select"
                      placeholder="Select"
                      value={item.size}
                    >
                      <MenuItem value={'XS'}>XS</MenuItem>
                      <MenuItem value={'S'}>S</MenuItem>
                      <MenuItem value={'M'}>M</MenuItem>
                      <MenuItem value={'L'}>L</MenuItem>
                      <MenuItem value={'XL'}>XL</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className={styles.qtyDiv}>
                      <IconButton
                        className={styles.qtyElementAdd}
                        aria-label="add item"
                        onClick={() =>
                          handleUpdate(item._id, item.qty + 1, item.size, index)
                        }
                      >
                        <AddOutlinedIcon />
                      </IconButton>
                      <div>{item.qty}</div>
                      <IconButton
                        className={styles.qtyElementMinus}
                        aria-label="remove item"
                        onClick={() =>
                          handleUpdate(item._id, item.qty - 1, item.size, index)
                        }
                      >
                        <RemoveRoundedIcon />
                      </IconButton>
                    </div>
                  </TableCell>
                  <TableCell>
                    <IconButton className={styles.removeDiv}>
                      <CloseRoundedIcon
                        onClick={() =>
                          handleUpdate(item._id, 0, item.size, index)
                        }
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer>
          <Table
            sx={{ minWidth: 650 }}
            className={styles.mobile}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell className={styles.tableHead}></TableCell>
                <TableCell
                  className={styles.tableHead}
                  align="left"
                ></TableCell>
                <TableCell
                  className={styles.tableHead}
                  align="left"
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item, index) => (
                // console.log(product)
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell
                    className={styles.imgCol}
                    component="th"
                    scope="row"
                  >
                    <img
                      className={styles.tableImg}
                      src={item.product.images[0]}
                    ></img>
                  </TableCell>
                  <TableCell>
                    <div>
                      <h1 className={styles.tableMainText}>
                        {item.product.title}
                      </h1>
                      <p className={styles.tablePriceText}>
                        {myData.value.currency}{' '}
                        {(
                          item.product.price * myData.value.currencyRate
                        ).toFixed(2)}
                      </p>
                      {item.qty > item.product.inventory[item.size] ? (
                        <span className="stockStatus">Item out of stock</span>
                      ) : (
                        <></>
                      )}
                    </div>
                    <Select
                      onChange={(event) => {
                        handleUpdate(
                          item._id,
                          item.qty,
                          event.target.value,
                          index
                        )
                      }}
                      labelId="select-size"
                      id="select-size-id"
                      className="w-full md:w-4/5"
                      label="Select"
                      placeholder="Select"
                      value={item.size}
                    >
                      <MenuItem value={'XS'}>XS</MenuItem>
                      <MenuItem value={'S'}>S</MenuItem>
                      <MenuItem value={'M'}>M</MenuItem>
                      <MenuItem value={'L'}>L</MenuItem>
                      <MenuItem value={'XL'}>XL</MenuItem>
                    </Select>
                    <div className={styles.qtyDiv}>
                      <IconButton
                        className={styles.qtyElementAdd}
                        aria-label="add item"
                        onClick={() =>
                          handleUpdate(item._id, item.qty + 1, item.size)
                        }
                      >
                        <AddOutlinedIcon
                          onClick={() =>
                            handleUpdate(
                              item._id,
                              item.qty + 1,
                              item.size,
                              index
                            )
                          }
                        />
                      </IconButton>
                      <div>{item.qty}</div>
                      <IconButton
                        className={styles.qtyElementMinus}
                        aria-label="remove item"
                        onClick={() =>
                          handleUpdate(item._id, item.qty - 1, item.size)
                        }
                      >
                        <RemoveRoundedIcon
                          onClick={() =>
                            handleUpdate(
                              item._id,
                              item.qty - 1,
                              item.size,
                              index
                            )
                          }
                        />
                      </IconButton>
                    </div>
                  </TableCell>

                  <TableCell>
                    <IconButton className={styles.removeDiv}>
                      <CloseRoundedIcon
                        onClick={() =>
                          handleUpdate(item._id, 0, item.size, index)
                        }
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <Link href="../Checkout"> */}
        <Button
          onClick={() => validateCart()}
          className="buttonInvert moveToCartBtn mt-5"
          variant="outlined"
        >
          Buy now
        </Button>
        {/* </Link> */}
      </Container>
      <Footer />
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  try {
    var { cart, error } = await getCart(session.id)
    if (error || !cart) {
      return { props: { cart: [] } }
    }
    return {
      props: {
        cart: cart,
      },
    }
  } catch (e) {
    return {
      props: {
        cart: [],
      },
    }
  }
}
