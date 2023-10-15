import React,{useState} from 'react'
import { Footer , Navigation} from '../../components';
import ProductCard from '../../components/productCard';
import styles from './[id].module.css';
import { Button, Grid ,TextField , Container} from '@mui/material';
import Link from "next/link";
import { useRouter } from 'next/router'
import {getBlog , getAllBlogs} from '../../services/userServices';
import { data } from 'autoprefixer';
import Head from "next/head";

export default function productDetailsPage({blog}) {
    return(
        <>
         <Head>
        <title> Blogs | Distinguished Society</title>
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

        </Head>
            {/* <Navigation/> */}
            <Container className='blogDetailsDiv'>
            <h1 className='heading text-center mt-12'>{blog.title}</h1>
            <hr className='insideHr'></hr>
            <iframe src={blog.videoLink} className='mt-5 mx-auto'></iframe>
            <p className={styles.blog}>
                {blog.description}
            </p>

            <p className={styles.blogBy}>Blog by</p>
            <p className={styles.name}>The Distingushed Society</p>
            {/* <p className={styles.post}>UI/ UX designer</p> */}
            <Link href="../blogs">
            <Button className='button w-full md:w-1/5 mx-auto blogsButton'  variant="outlined">
                          GO TO BLOGS &#x27F6;
                  </Button></Link>
           
            </Container>
            <Footer/>
        </>
    )
}

export async function getStaticPaths()
{
    const {blogs , errorsBlogs} = await getAllBlogs();
    const paths = blogs.map((blog)=>({ 
            params: {id : blog._id.toString()} 
    }));

    return {
        paths,
        fallback: false
    }
}
export async  function getStaticProps({params})
{
  try {
    
    const {blog , errorsBlogs} = await getBlog(params.id);
    if (errorsBlogs || !blog) {
      return {  props : {blog : []} };
    }
    return { props: 
                  { 
                      blog
                  },
                  revalidate : 1
            };
  } catch (e) {
    return { props : 
                {
                    blog :[]
                } ,
                revalidate : 1
            };
  }
}
