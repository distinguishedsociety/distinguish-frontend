import React, { useEffect, useState, useContext } from 'react'
import {
  Footer,
  Navigation,
  OfferImages,
  CountryPopup,
} from '../../components'
import ProductCard from '../../components/productCard'
import styles from './index.module.css'
import { Button, Grid, TextField, Container } from '@mui/material'
import Link from 'next/link'
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined'
import {
  getAllProducts,
  getIntroBanner,
  getAllBlogs,
  getBanners,
} from '../../services/userServices'
import { Context } from '../../context/country'
import Head from 'next/head'
import NewReleaseProductCorousel from '../../components/NewReleaseProductCorousel'

const landingPage = ({ products, banners }) => {
  const myData = useContext(Context)

  const [country, setCountry] = React.useState('')

  return (
    <div>
      <Head>
        <meta
          name="description"
          content="Distinguished Society is for the upcoming visionaries, the ones who speak with their art and creativity. The ones who choose the harder path for a greater purpose. The ones who believe that creativity is the measure of a persons greatness. The Creative Geniuses."
        ></meta>
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
        <title>Distinguished Society</title>
      </Head>
      {/* <Navigation/>   */}
      <OfferImages className={styles.offereImages} banners={banners} />
      {/* <img src={"../assets/bannerimage.png"} style={{margin:'auto'}}/> */}
      <Container>
        {/* <div  className={styles.mainGrid}>
                <div className={styles.grid1}>
                  <img src={introBanner[0].image1}></img>
                </div>
                <div className={styles.grid2}>
                  <img src={introBanner[0].image2}></img>
                  <div className={styles.subGrid}>
                      <h1 className='heading'>{introBanner[0].heading}</h1>
                      <p className='subHeading pb-8'>{introBanner[0].description}</p>
                  </div>
                </div>
            </div>

            <div className={styles.mainGridResponsive}>
              <div className={styles.grid1Responsive}>
                  <img src={introBanner[0].image1}></img>
                  <img src={introBanner[0].image2}></img>
              </div>
              <h1 className='heading'>{introBanner[0].heading}</h1>
                      <p className='subHeading pb-8'>{introBanner[0].description}</p>
            </div>
            <h1 className='text-center my-24 text-5xl w-5/6	leading-normal mx-auto tagLine'>
              "FOR THE CREATIVE GENIUSES, WHO BELIEVE IN THEMSELVES."
            </h1> */}

        {/* Products */}
        <div className="d-flex">
          <h5 className="text-mute mt-4 mb-0">Shop our exclusive drops</h5>
          {/* <Link href="../products" >View All</Link> */}
        </div>
        {/* <hr></hr> */}
        <div className={styles.latestArrivalsDiv}> 
          <NewReleaseProductCorousel products={products}/>
          {/* <div className="d-flex flex-wrap">
            {products?.map((product, index) => (
                <div className="home-product-div">
                  <ProductCard data={product} />
                </div>
            ))}
          </div> */}
          {/* <Grid  
                      container
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                      spacing={10}
                      className={styles.displayProductGrid}
                      >
                       
              {
                products && products.map((product, index)=>(
                    
                    <Grid className={styles.gridItem} item sm={2} md={4} >
                   
                    
                          <ProductCard data={product}/>
                           
                    </Grid>
               

                ))
              }
              
                      
                      </Grid> */}
          <Link href="../products">
            <Button
              className="button showButton mx-auto w-1/4"
              variant="outlined"
            >
              Show more{' '}
              <span>
                <ArrowForwardOutlinedIcon />
              </span>
            </Button>
          </Link>
        </div>
        {/* Products */}

        {/* Blogs */}
        {/* <div className={styles.blogsDiv}>
               <h1 className='heading text-center'>BLOGS FOR YOU</h1>
               <div className={styles.blogDetails}>
                  <div className={styles.blogSubDetails}>
                       <iframe id="video" autoplay ></iframe>
                  </div> 
                   <div  className={styles.blogSubDetails}>
                       <h1 className='blogHeading'>{blogs[0].title}</h1>
                       <div className={styles.subHeadingDiv}>
                           <p className='subHeading text-justify	'>{blogs[0].description} </p>
                       </div>
                       <div  className={styles.blogButtonGrid}> */}
        {/* <Button className='button mr-4' onClick={()=>prevBlog()} >
                               <span>
                                   <ArrowBackOutlinedIcon onClick={()=>prevBlog()}/>
                               </span>
                           </Button>
                           <Button className='button' onClick={()=>nextBlog()} >
                               <span>
                                 <ArrowForwardOutlinedIcon />
                               </span>
                           </Button> */}
        {/* <span className=' mr-4'></span>
                           <span className=' mr-4'></span>
                       </div>                       
                       <Link href="../Blogs">                             
                         <Button className='button w-1/5 mx-auto	blogButton'  variant="outlined">
                                 GO TO BLOGS <span><ArrowForwardOutlinedIcon/></span>
                         </Button>
                       </Link>
                   </div>
               </div>
             </div> */}

        {/* Blogs */}
      </Container>
      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  try {
    const { products = [], errorsProducts } = await getAllProducts()
    const { introBanner = [], errorsIntroBanner } = await getIntroBanner()
    const { banners = [], errorsBanners } = await getBanners()
    const { blogs= [], errorsBlogs } = await getAllBlogs()
    if (errorsProducts || !products) {
      return { props: { products: [] } }
    }
    if (errorsIntroBanner || !introBanner) {
      return { props: { introBanner: [] } }
    }
    if (errorsBlogs || !blogs) {
      return { props: { blogs: [] } }
    }
    if (errorsBanners || !banners) {
      return { props: { blogs: [] } }
    }

    return {
      props: {
        products,
        introBanner,
        blogs,
        banners,
      },
      revalidate: 1,
    }
  } catch (e) {
    return {
      props: {
        products: [],
        introBanner: [],
        blogs: [],
        banners: [],
      },
      revalidate: 1,
    }
  }
}

export default landingPage
