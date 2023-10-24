import React, {useEffect, useState} from 'react'
import { Footer , Navigation } from '../../components';
import ProductCard from '../../components/productCard';
import styles from './wishlist.module.css';
import { Button, Grid ,TextField , Container} from '@mui/material';
import Link from "next/link"
import axios from 'axios';
import { Triangle } from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useSession , getSession } from "next-auth/react";
import {getWishlist} from '../../services/userServices'
import Head from "next/head";
export default function wishlist({wishlist}) {
  let[products,setProducts] = useState(wishlist);
  let [isLoading, setLoading] = useState(false);
  const { data: session } = useSession();

  useEffect(()=>{
    //setLoading(true)

    let res;
    async function getAllProducts(){
      res = await axios(
        {
            url: `https://localhost:9000/internal/api/users/wishlist` ,
            method: "GET",
            headers: {
              'authorization' : localStorage.getItem('user') ?? ""
                }
        }
      )
    if(res.data.status == 'success')
    {
      setLoading(!isLoading)

   
      setProducts(res.data.data)
    }
    else
    {
      setLoading(!isLoading)
   
    }
    }
  
   // getAllProducts()
  
  },[])

  if (isLoading) {
    return (
      <div className="mainpage d-flex justify-content-center align-items-center flex-column">
          <Triangle color="black" height={60} width={60} />    
      </div>
    );
  }
    return(
        <>
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
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title> Wishlist | Distinguished Society</title>
        </Head>
        {/* <Navigation/> */}
        
        <Container>
                {/* Wishlist */}
                {
                  products.length == 0 ?
                  <>
                  
                  <img className={styles.emptyCart} src="../assets/empty.svg"></img>
                  <h2 className={styles.emptyText}>Nothing in your list!</h2>
                  </>
                  :
                <>
            <div className={styles.arrivalGrid}>
              <h1 className='heading'> Wishlist</h1>
              
            </div>
            <hr className='insideHr'></hr>
            <div className={styles.latestArrivalsDiv}>
            <Grid  
                      container
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                      spacing={10}
                      className={styles.displayProductGrid}
                      >
                       
              {
                products.map((product, index)=>(
                    // <Link href="../ProductDetailsPage/productDetailsPage">
                    <Grid item  md={3}>
                            <ProductCard data={product} isWishlist={true}/>
                    </Grid>
                    // </Link>
                    
                ))
              }
              
             
                      </Grid>
                    
            </div>
            </>
            }
            {/* Wishlist */}

        </Container>
        <Footer/>
        </>
    )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
 
   try { 
     var wishlist  = await getWishlist(session.id)
   
     if (!wishlist) {
       return {  props : {wishlist : []} };
     }
     return { props: 
                   { 
                    wishlist
                   } 
             };
   } catch (e) {
     return { props : 
                 {
                  wishlist :[]
                 } 
             };
   }
 }