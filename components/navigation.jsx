import React, { useEffect, useContext } from 'react'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import { FiLogOut } from 'react-icons/fi'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import { FiShoppingCart } from 'react-icons/fi'
import Link from 'next/link'
import CountryPopup from './countryPopup'
import * as material from '@mui/material'
import { Badge, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
// import {MenuIcon} from 'react-icons/gi';
import MenuIcon from '@mui/icons-material/Menu'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { signOut, useSession, signIn, getSession } from 'next-auth/react'
import { Context } from '../context/country'
import { makeStyles } from '@material-ui/core/styles'
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt'
import { getProfile, getCart } from '../services/userServices'
import Cookies from 'js-cookie';

export default function navigation({ cartData }) {
  const myData = useContext(Context)
  const { data: session } = useSession()
  const [drawerState, setDrawerState] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [cartCount, setCartCount] = React.useState(0)
  const [country, setCountry] = React.useState(myData.value.country)

  useEffect(() => {
    const cookieData = Cookies.get('cart')
    const parsedData = cookieData ? JSON.parse(cookieData) : []
    if(cookieData){
      setCartCount(parsedData.length)
    }else if(cartData){
      setCartCount(cartData.length)
    }else{
      setCartCount(0)
    }
    // const count = cookieData ? parsedData.length : cartData ? cartData.length : 0;
    // setCartCount(count)
  },[cartData])

  console.log('cartCount',cartCount)
  useEffect(() => {
    if (localStorage.getItem('country')) {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }, [])

  useEffect(() => {
    (async () => {
      try {
        var { cart, error } = await getCart(session.id)
        if (error || !cart) {
          return { props: { cart: [] } }
        }
        setCartCount(cart.length)
      } catch (e) {
        console.log(e)
      }
    })()
  },[session])
  console.log('session',session)
  const handleClose = () => {
    setOpen(false)
  }
  function logOut() {
    signOut()
    toast.success('Logged out successfully!', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }
  const toggleDrawer = () => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }
    setDrawerState(!drawerState)
  }
  return (
    <>
      <nav className="navDesktop flex flex-row  bg-black py-3.5 text-white">
        <material.Container>
          <div className="flex-direction:row mx-auto  flex items-center justify-between	">
            <div style={{ width: '200px' }} onClick={() => setOpen(true)}>
              <ul className="mb-0">
                <li>
                  {myData.value.country}
                  <EditLocationAltIcon
                    style={{ paddingLeft: '10px', fontSize: '28px' }}
                  />
                </li>
              </ul>
            </div>

            <div>
              {/* <a className="text-decoration-none text-white" href="/">
                <>DISTINGUISHED SOCIETY</>
              </a> */}
              <Link href="/">
                      <li className="text-decoration-none text-white">DISTINGUISHED SOCIETY</li>
                    </Link>
            </div>

            <div>
              <ul className="mb-0">
                {session ? (
                  <>
                    <Link href="../profilePage">
                      <li className="signUp mx-3 inline">My Profile</li>
                    </Link>
                    <Link href="../AffiliateProgram">
                      <li className="signUp ms-2 me-3 inline">Become an Affiliate</li>
                    </Link>
                  </>
                ) : (
                  <>
                    {/* <li className="signUp  inline" onClick={() => signIn()}>
                      Sign in
                    </li> */}
                    <Link href="../AffiliateProgram">
                      <li className="signUp ms-2 me-3 inline">Become an Affiliate</li>
                    </Link>
                  </>
                )}

                {session ? (
                  <li className="inline">
                    {' '}
                    <FiLogOut onClick={() => logOut()} />{' '}
                  </li>
                ) : (
                  <></>
                )}
                {session ? (
                  <Link href="../wishList/wishlist">
                    <li className="mx-3 inline">
                      <FavoriteBorderIcon />
                    </li>
                  </Link>
                ) : (
                  <li onClick={() => signIn()} className="mx-3 inline">
                    <FavoriteBorderIcon />
                  </li>
                )}
                {/* {
               session
                  ? */}
                <Link href="../myCart">
                  <li className="shoppingCartIcon inline">
                    <Badge badgeContent={cartCount} color="primary">
                      <FiShoppingCart />
                    </Badge>
                  </li>
                </Link>
                {/* :
            <li   onClick={() => signIn()} className='inline shoppingCartIcon'> 
                <FiShoppingCart/> 
            </li>
            } */}
              </ul>
            </div>
          </div>
        </material.Container>
      </nav>

      {/* Responsive nav bar */}
      <nav className="navMobile">
        <material.Container>
          <div className="respMainDiv">
            <div className="respNavDiv1">
              <MenuIcon className="hamburger" onClick={toggleDrawer()} />
              <material.Drawer
                anchor={'left'}
                open={drawerState}
                onClose={toggleDrawer()}
                className="navDrawerResp"
              >
                <material.Box
                  sx={{ width: 250 }}
                  role="presentation"
                  onClick={toggleDrawer()}
                  onKeyDown={toggleDrawer()}
                  className="resNav"
                >
                  <material.List>
                    {session ? (
                      <Link href="../profilePage">
                        <material.ListItem disablePadding>
                          <material.ListItemButton>
                            <PersonRoundedIcon className="navIcon" />
                            <material.ListItemText primary={'My Profile'} />
                          </material.ListItemButton>
                        </material.ListItem>
                      </Link>
                    ) : (
                      <material.ListItem
                        disablePadding
                        onClick={() => signIn()}
                      >
                        <material.ListItemButton>
                          <PersonRoundedIcon className="navIcon" />
                          <material.ListItemText primary={'Sign In'} />
                        </material.ListItemButton>
                      </material.ListItem>
                    )}
                    <material.Divider />
                    {/* {  
                    session
                    ? */}
                    <Link href="../myCart">
                      <material.ListItem disablePadding>
                        <material.ListItemButton>
                          <ShoppingCartOutlinedIcon className="navIcon" />
                          <material.ListItemText primary={'My Cart'} />
                        </material.ListItemButton>
                      </material.ListItem>
                    </Link>
                    {/* :
                    <material.ListItem  disablePadding onClick={() => signIn()}>
                        <material.ListItemButton>
                        <ShoppingCartOutlinedIcon className='navIcon'/> 
                          <material.ListItemText primary={"My Cart"} />
                        </material.ListItemButton>
                      </material.ListItem>
                    } */}
                    <material.Divider />
                    <Link href="../AffiliateProgram">
                        <material.ListItem disablePadding>
                          <material.ListItemButton>
                            <HandshakeOutlinedIcon className="navIcon" />
                            <material.ListItemText primary={'Become an Affiliate'} />
                          </material.ListItemButton>
                        </material.ListItem>
                    </Link>
                    <material.Divider />
                    {session ? (
                      <Link href="../wishList/wishlist">
                        <material.ListItem disablePadding>
                          <material.ListItemButton>
                            <FavoriteBorderIcon className="navIcon" />
                            <material.ListItemText primary={'My Wishlist'} />
                          </material.ListItemButton>
                        </material.ListItem>
                      </Link>
                    ) : (
                      <material.ListItem
                        disablePadding
                        onClick={() => signIn()}
                      >
                        <material.ListItemButton>
                          <FavoriteBorderIcon className="navIcon" />
                          <material.ListItemText primary={'My Wishlist'} />
                        </material.ListItemButton>
                      </material.ListItem>
                    )}

                    <material.Divider />
                    {session ? (
                      <material.ListItem
                        disablePadding
                        onClick={() => logOut()}
                      >
                        <material.ListItemButton>
                          <LogoutTwoToneIcon className="navIcon" />
                          <material.ListItemText primary={'Logout'} />
                        </material.ListItemButton>
                      </material.ListItem>
                    ) : (
                      <></>
                    )}
                    <material.Divider />
                  </material.List>
                </material.Box>
              </material.Drawer>
              <Link href="/">
                <span className="respTitle">DISTINGUISHED SOCIETY</span>
              </Link>
            </div>
            <div className="respNavDiv2">
              <ul>
                <Link href="../wishList/wishlist">
                  <li className="mx-3 inline">
                    {' '}
                    <FavoriteBorderIcon />{' '}
                  </li>
                </Link>
                <Link href="../myCart">
                  <li className="shoppingCartIcon inline">
                    <Badge badgeContent={cartCount} color="primary">
                      <FiShoppingCart />
                    </Badge>
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </material.Container>
      </nav>
      <CountryPopup
        open={open}
        handleClose={handleClose}
        country={country}
        setCountry={setCountry}
      />
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  try {
    const { me, errors } = await getProfile(session.id)
    if (errors || !me) {
      return { props: { me: [] } }
    }
    return {
      props: {
        me,
      },
    }
  } catch (e) {
    return {
      props: {
        me: [],
      },
    }
  }
}
