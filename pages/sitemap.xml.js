import React from "react";
import * as glob from "glob";
import {getAllProducts} from '../services/userServices'

const Sitemap = () => {
  return null;
};

export const getServerSideProps = async ({ res }) => {
  const BASE_URL = "https://localhost:9000";

  const pagesDir = "pages/**/*.jsx";
    let pagesPaths = await glob.sync(pagesDir);
    console.log("pages path" , pagesPaths);
   pagesPaths = pagesPaths
                     .filter((path) => !path.includes("["))
                     .filter((path) => !path.includes("/_"))
                     .filter((path) => !path.includes("404"));

   
   

    
const staticPaths = [
    'https://www.thedistinguishedsociety.com/blogs',
    'https://www.thedistinguishedsociety.com/contactUs',
    'https://www.thedistinguishedsociety.com/privacyPolicy',
    'https://www.thedistinguishedsociety.com/products',
    'https://www.thedistinguishedsociety.com/shippingAndReturn',
    'https://www.thedistinguishedsociety.com/termsAndConditions',
]
    const products = await getAllProducts(); // some remote API call maybe!
    const dynamicPaths = products.products?.map( singleProduct => {
      
      return `${BASE_URL}/products/${singleProduct.slug}`
      
    })
  const allPaths = [...staticPaths , ...dynamicPaths];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allPaths
        .map((url) => {
          return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join("")}
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;