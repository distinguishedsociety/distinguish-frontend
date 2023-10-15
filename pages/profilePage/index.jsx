import axios from 'axios';
import { useSession , getSession, signIn } from "next-auth/react";
import React, { useEffect , useState } from 'react';
import { useRouter } from 'next/router';
import Link from "next/link";
import {Orders , Navigation , Footer} from '../../components'
import { Container , Card ,TableContainer ,Table,Paper,TableCell,TableHead,TableRow ,MenuItem,TableBody , Button } from '@mui/material'
import styles from './profilePage.module.css';
import { Triangle } from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { ToastContainer, toast } from 'react-toastify';
import {getProfile} from '../../services/userServices'
import 'react-toastify/dist/ReactToastify.css';
import Head from "next/head";

export default function profilePage({me}) {

  console.log("profile data" , me)
  let [user , setUser] = React.useState();
  let [isLoading, setLoading] = useState(true);
  let [orders ,setOrders] = React.useState();

  const router = useRouter()
  useEffect(()=>{
    if(me!=null)
    {
      setUser(me)
      setOrders(me?.orders)
      setLoading(false)
    }
    else
    {
      signIn()
    }
  },[])

  if (isLoading) {
    return (
      <div className="mainpage d-flex justify-content-center align-items-center flex-column bg-gray-50" >
          <Triangle color="black" height={60} width={60} />    
      </div>
    );
  }
  
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

              <title>My Profile | Distinguished Society</title>
            </Head>
        <Container>
            <Card className={styles.profileCard}>
                <div className={styles.profileImage}>
                </div>
                <div className={styles.detailsGrid}>
                  <h1 className={styles.name}>Hi! {user?.name}</h1>
                  <p className={styles.email}>{user?.email}</p>
                  {/* <button>Logout</button> */}
                </div>
            </Card>
            {            
            orders.length > 0 ?
              <div className={styles?.orderGrid}>
              <h1 className={styles?.name}> My order history</h1>
              {
                orders.map((item , index)=>(
                  
                   <Orders data={item}/>
                ))
              }
              {/* <TableContainer >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell className={styles.tableHead}></TableCell>
                      <TableCell className={styles.tableHead} align="left"></TableCell>
                      <TableCell className={styles.tableHead} align="left"></TableCell>
                    
                    </TableRow>
                  </TableHead>
                  <TableBody>
                   {
                      orders.map((item, index)=>(
                        item.products.map((product, index)=>(
                          // console.log(product)
                            <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell className={styles.imgCol} component="th" scope="row">
                                <img className={styles.tableImg} src={product.product.images[0]}></img>
                            </TableCell>
                            <TableCell >
                            <h1 className={styles.tableMainText}>{product.product.title}</h1>
                            <p className={styles.tablePriceText}>Rs. {product.product.price}</p>
                            </TableCell>
                          
                            <TableCell >
                              
                            </TableCell>
                          </TableRow>
                        ))
                        
                    ))
                   }
                  </TableBody>
                </Table>
              </TableContainer> */}
            </div>
            :
            <div className={styles.empty}>
              <img className={styles.emptyCart} src="../assets/empty.svg"></img>
              <h2 className={styles.emptyText}>You have no previous orders!</h2>
              <Link href="../products">
                   <Button className='buttonInvert' style={{margin: "30px auto"}}>Continue Shopping</Button>
              </Link>
          </div>
            }
        </Container>
        <Footer/>
    </>
  )
}

// export const getServerSideProps = withSession(async function ({ req, res }) {
//   const user = await getSession(context)
//   console.log("User" , user)
//   if (!user) {
//       return {
//         redirect: {
//           destination: '/signIn',
//           permanent: false,
//         },
//       }
//   }

//   return {
//     props: { user },
//   }
// })

export async function getServerSideProps(context) {
 const session = await getSession(context)

  try { 
    var {me , error}  = await getProfile(session.id)
  
    if (error || !me) {
      return {  props : {me : []} };
    }
    return { props: 
                  { 
                      me : me
                  } 
            };
  } catch (e) {
    return { props : 
                {
                    me : null
                } 
            };
  }
}