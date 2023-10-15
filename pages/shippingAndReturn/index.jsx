import React from 'react'
import styles from './index.module.css';
import { Footer  } from '../../components';
import Head from "next/head";

export default function index() {
  return (
    <>
    <Head>
    {/* <meta name="description" 
    content="Distinguished Society is for the upcoming visionaries, 
    the ones who speak with their art and creativity. 
    The ones who choose the harder path for a greater purpose. 
    The ones who believe that creativity is the measure of a persons greatness. 
    The Creative Geniuses."  >
    </meta> */}
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

        <title>Shipping and Return Policy| Distinguished Society</title>
    </Head>
    <div className={styles.main}>
        <h1 className={styles.heading}>Shipping & Return Policy</h1>
    <hr className={styles.line}></hr>
    <h3 className={styles.subheading}>
        SHIPPING AND DELIVERY TIME
    </h3>
    <p className={styles.paragraph}>
        Shipping of all orders will be done within 2 - 4 business days post order placement. Order tracking links will be shared via messages and mail. It may take approximately 2 - 7 days for domestic shipments and around 2 weeks for International shipments. The delivery time depends upon the area Pin-code
    </p>
  
    <h3 className={styles.subheading}>
        UNDELIVERED ITEMS
    </h3>
    <p className={styles.paragraph}>
        In the situation where your order doesn’t get delivered , due to incorrect information or missed deliveries these orders will be returned to us at our shipping facility. Once your order has been returned to us you will be contacted. 
    </p>

    <h3 className={styles.subheading}>
        RETURNS & EXCHANGE
    </h3>
    <p className={styles.paragraph}>All sales are final. We do not accept returns or exchange at the moment. Please be sure of the size. 
        If you need any help with it, feel free to reach out at {" "}
        <a className={styles.link} href="mailto:support@thedistinguishedsociety.com ">
        support@thedistinguishedsociety.com     
        </a> 
    </p>

    <h3 className={styles.subheading}>
        DAMAGED ITEMS
    </h3>
    <p className={styles.paragraph}>
    If you have received a damaged product, we apologise. We are more than willing to help you out.
     Please click a picture of the product and email at
     {" "}
        <a className={styles.link} href="mailto:support@thedistinguishedsociety.com ">
        support@thedistinguishedsociety.com     
        </a> 
      .We will issue a refund or store credit, whatever the client prefers.  
     REFUNDS  Refund are only issued if you have received a damaged product. 
    </p>

    <h3 className={styles.subheading}>REFUNDS POLICY</h3>
    <p className={styles.paragraph}>
    If you have received a damaged product, we apologise. We are more than willing to help you out. Please click a picture fo the product and email at
    {" "}
        <a className={styles.link} href="mailto:support@thedistinguishedsociety.com ">
        support@thedistinguishedsociety.com     
        </a> 
We will issue a refund or store credit, whatever the client prefers.   REFUNDS  ALL SALES ARE FINAL. WE DO NOT ENTERTAIN EXCHANGE / RETURN REQUESTS. PLEASE GO THROUGH THE SIZE CHART BEFORE ORDERING.

    </p>
    </div>
    <Footer/>
    </>  )
}
