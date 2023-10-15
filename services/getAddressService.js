import axios from 'axios';


  export async function getAddressDetails(zipCode , countryCode){

    let response;
    let error;
  
    try{
      let result = await axios.get(`https://api.worldpostallocations.com/pincode?postalcode=${zipCode}&countrycode=${countryCode}`);
  
      if(result.data.status === "error"){
       
        return { response, error: "An error occurred." };
      }
    
      response = result.data.result;
     
      localStorage.setItem("addressState" , response[0].state)
      localStorage.setItem("addressCity" , resposne[0].district)
      return { response, error };
      } catch (e) {
      
        error = e.message;
        return { response, error };
      }
  }