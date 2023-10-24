import React from 'react'
import { Footer , Navigation} from '../../components';
import ProductCard from '../../components/productCard';
import styles from './index.module.css';
import { Button, Grid ,Container} from '@mui/material';
import Link from "next/link"
import {getAllProducts} from '../../services/userServices';
import Head from "next/head";
import NewReleaseProductCorousel from '../../components/NewReleaseProductCorousel' 

export default function productListPage({products}) {
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
        <meta name="robots" content="all" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

              <title>Products | Distinguished Society</title>
            </Head>
        {/* <Navigation/> */}
        <Container>
                {/* Products */}
            <div className={styles.arrivalGrid}>
              <h1 className='heading'> All Products</h1>
            </div>
            <hr></hr>
            <div className={styles.latestArrivalsDiv}>
            <NewReleaseProductCorousel products={products}/>
            {/* <Grid  
                      container
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                      spacing={10}
                      className={styles.displayProductGrid}
                      >                       
              {
                products.map((product, index)=>(
                    
                    <Grid item  md={3}>
                            <ProductCard data={product}/>
                    </Grid>
                    
                ))
              }          
                     
            </Grid>                     */}
            </div>
            {/* Products */}

        </Container>
        <Footer/>
        </>
    )
}


export async  function getStaticProps()
{
  try {
    const { products = [], errorsProducts } = await getAllProducts();
    if (errorsProducts || !products) {
      return {  props : {products : []} };
    }   
    return { props: 
                  { 
                      products                     
                  },
                  revalidate : 1
            };
  } catch (e) {
    return { props : 
                {
                    products : []
                } ,
                revalidate : 1
            };
  }
}