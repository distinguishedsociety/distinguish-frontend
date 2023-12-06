import React from 'react'
import styles from './index.module.css';
import { Footer  } from '../../components';
import Head from "next/head";

export default function index() {
  return (
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

        <title> Contact Us | Distinguished Society</title>
        </Head>
    <div className={styles.main}>
        <h1 className={styles.heading}>Contact Us</h1>
    <hr className={styles.line}></hr>
      <p className={styles.paragraph}>
      For more information about our privacy practices, if you have questions,
       or if you would like to make a complaint, please contact us by e-mail 
       at {""}
       <a className={styles.link} href="mailto:distinguishedsocietysales@gmail.com">
          distinguishedsocietysales@gmail.com 
        </a>
       <br/>or by mail using the details provided below:
       <br/>
       <div className={styles.address}>
         <b>Operating Address : </b><br/>
       Distinguished Society, 304/4610, Plot No-9, <br/>
       Ambika Niwas, Behind Raka Nursery, Hanumanwadi, <br/>
       Panchavati, <br/>
       Maharashtra, 422003 , India.<br/>
       </div>
     
</p>
    </div>
    <Footer/>
    </>
  )
}
