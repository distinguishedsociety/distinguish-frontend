// import  { NextPage } from 'next';
import  React  from 'react';
import LandingPage from "../pages/home";
import {getAllProducts , getIntroBanner , getAllBlogs , getBanners} from '../services/userServices'

// add bootstrap css 
import 'bootstrap/dist/css/bootstrap.css'

const Home = ( {products , banners} ) => {
  return (
      <LandingPage products={products}  banners={banners}/>
  )
}

export async function getStaticProps() {
  try {
    const { products, errorsProducts } = await getAllProducts()
    const { introBanner, errorsIntroBanner } = await getIntroBanner()
    const { banners, errorsBanners } = await getBanners()
    const { blogs, errorsBlogs } = await getAllBlogs()
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

export default Home;
