import React,{useState} from 'react'
import { Footer , Navigation , BlogCard} from '../../components';
import styles from './index.module.css';
import { Button, Grid ,TextField ,Container} from '@mui/material';
import Link from "next/link"
import { useRouter } from "next/router"
import {getAllBlogs} from '../../services/userServices';
import Head from "next/head";

export default function blogsListPage({blogs = []}) {
    // const blogs=[
    //     {
    //         name : 'FASHION STATE OF MIND' ,
    //         image : '../assets/blogCard.png'
    //     },
    //     {
    //         name : 'FASHION STATE OF MIND' ,
    //         image : '../assets/blogCard.png'
    //     },
    //     {
    //         name : 'FASHION STATE OF MIND' ,
    //         image : '../assets/blogCard.png'
    //     }
    // ]
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
        <title> Blogs | Distinguished Society</title>
        </Head>
           {/* <Navigation/> */}
           <Container>
               <h1 className='heading text-center mt-12 mb-8'>BLOGS FOR YOU</h1>
               <Grid  
                      container
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                      spacing={10}
                      className={styles.displayProductGrid}
                      >
                       
              {
                blogs.map((blog, index)=>(
                 
                    <Grid item  md={4}>
                    <BlogCard data={blog}/>
                    </Grid>
                    
                ))
              }
              
                      
                      </Grid>
             
            </Container>
            <Footer/>
        </>
    )
}

export async  function getStaticProps()
{
  try {
    
    const {blogs = [] , errorsBlogs} = await getAllBlogs();
   
    if (errorsBlogs || !blogs) {
      return {  props : {blogs : []} };
    }
    return { props: 
                  { 
                      blogs
                  },
                  revalidate : 1
            };
  } catch (e) {
    return { props : 
                {
                    blogs :[]
                } ,
            };
  }
}
