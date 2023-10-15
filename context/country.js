import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import {getProfile} from "../services/userServices"

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const country =  "India";
   const currency = "INR" ;
   const currencyRate = 1 ;
  const countryCode = "IN"; 
  let [value , setValue] = useState(
    {
      country : typeof window !== 'undefined' ? localStorage.getItem('country') ?? country : country,
      currency : typeof window !== 'undefined' ? localStorage.getItem('currency') ?? currency : currency ,
      currencyRate : typeof window !== 'undefined' ? localStorage.getItem('currencyRate') ?? currencyRate : currencyRate,
      countryCode : typeof window !== 'undefined' ? localStorage.getItem('countryCode') ?? countryCode : countryCode
    }
  ); 

  

useEffect(()=>{
  value = {
    country : localStorage.getItem('country'),
    currency :  localStorage.getItem('currency') ,
    currencyRate : localStorage.getItem('currencyRate'),
    countryCode : localStorage.getItem('countryCode')
}
})

   

 
  const exposed = {
    value,
    setValue
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};


// export const useUser = () => useContext(Context);

export default ContextProvider;