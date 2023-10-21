import React , {useEffect , useContext, useCallback, useState }from 'react';
import Head from "next/head";
import '../styles/globals.css'
import  { AppProps } from 'next/app'
import Router from "next/router";
import { Triangle } from "react-loader-spinner";
import {Navigation , CountryPopup} from '../components';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { SessionProvider } from "next-auth/react";
import  ContextProvider from "../context/country"
import UserProvider from "../context/user";

function FacebookPixel() {
  React.useEffect(() => {
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init('255270330441436');
        ReactPixel.pageView();

        Router.events.on("routeChangeComplete", () => {
          ReactPixel.pageView();
        });
      });
  });
  return null;
}


function MyApp({ Component,  pageProps: { session, ...pageProps } }) {
    const [loading, setLoading] = React.useState(false);
    const resetWindowScrollPosition = useCallback(() => window.scrollTo(0, 0), []);
    const [cartData, setCartData] = useState([])

    Router.events.on('routeChangeStart', () => setLoading(true));
    Router.events.on('routeChangeComplete', () => {
      resetWindowScrollPosition()
      setLoading(false)
    });
    Router.events.on('routeChangeError', () => setLoading(false));

  return(
    <>
    <Head>
        <meta charSet="UTF-8" />
        <meta name="keywords" 
            content="distinguished, distingueshed society , tee of greatness , underrated visionaries,
            art , creativity , The Creative Geniuses , t-shirts ,   Nikola Tesla Beige Tee , Oversized Fit Tee,
            Heavy Ribbed Neck , Oversized Fit Tee with Heavy Ribbed Neck , The Tee of Peace , Puff Print , Tee with Puff Print,
            The Creators Tote Bag , Tote bag, creators tee , unfinished clothing brand , legacy brand , miseducated,
            Unfinished , distinguished tshirt , tshirt distinguished, distinguished bags ,  distinguished tote bags,
            distinguished society tshirt , tshirt distinguished society,  distinguished society tote bags
            " 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="apple-touch-icon" sizes="180x180" href="assets/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="assets/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="assets/favicon-16x16.png"/>
        <link rel="manifest" href="assets/site.webmanifest"></link>
    </Head>
    <FacebookPixel />
       { loading?
          <div className=" mainpage bg-gray-50" >
              <Triangle color="black" height={60} width={60} />    
          </div>
        :
            <SessionProvider session={session}>
              <UserProvider>
                  <ContextProvider>
                    <Navigation cartData={cartData}/>
                    <Component {...pageProps} setCartData={setCartData}/>
                  </ContextProvider>
                </UserProvider>
            </SessionProvider>
        }
    </>
  ) 
}

export default MyApp
