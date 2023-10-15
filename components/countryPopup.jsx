import  React,  {useContext} from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {TextField , Box , Autocomplete , Dialog ,DialogActions,Container, Button } from '@mui/material';
import {countries} from "../utils/countries.js"
import {convertCurrency} from "../services/currencyConversion"
import {Context} from '../context/country';



export default function CountryPopup(props) {
  const countriesList = countries;
  const myData= useContext(Context)
  //const [selectedCountry , setSelectedCountry] = React.useState(myData.value);
  const [inputValue, setInputValue] = React.useState();
  const [value, setValue] = React.useState();
  const [error, setError] = React.useState(null);

 async function setCountry(){
   
    localStorage.setItem("country" , inputValue)
    const country= await countries.filter(function (i,n){
      return i.countryName == inputValue
    })
    
    let response , error
    if(country)
    {
      const countryCode = country[0].currencyCode;
      localStorage.setItem("countryCode" , country[0].countryCode)
     
       response = await convertCurrency(countryCode)
    }
   if(response)
   {
    props.setCountry(inputValue)
    const value = {
      country : localStorage.getItem('country'),
      currency :  localStorage.getItem('currency') ,
      currencyRate : localStorage.getItem('currencyRate'),
      countryCode : localStorage.getItem('countryCode')
  }
  
    myData.setValue(value)
    //setSelectedCountry(myData.value)
    props.handleClose()
    
   }
  }
 
      

  return (
    <div>
      <Formik
        initialValues={{ country: props.country}}
        validationSchema={Yup.object({
          country: Yup.string()
            .required('Please select your country'),
        })}
        onSubmit={ (values, { setSubmitting }) => {
        
          const res =  setCountry();
         
          if(res)
          {
            props.setCountry(inputValue)
            props.handleClose()
          }
          setSubmitting(false);
        }}
      >
     {
    (formik) => (
      <Dialog
        open={props.open}
        aria-labelledby="responsive-dialog-title"
        onClose={props.handleClose}
      >
        <CloseRoundedIcon className='formClose'   onClick={props.handleClose}/>
         <Container>
        <DialogActions className='loginFormGrid'>
        <form onSubmit={formik.handleSubmit}>
        <div className="text-red-600 text-sm">
                    <ErrorMessage name="username" />
        </div>
        <Autocomplete
              autoComplete = "off"
               name="country"
              id="country-select-demo"
              sx={{ width: 300 }}
              options={countries}
              style={{marginBottom : "20px" , marginTop : "20px"}}
              autoHighlight
              value={value}
              displayEmpty
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue)
              }}
              getOptionLabel={(option) => option.countryName}
              renderOption={(props, option) => (
                <Box  component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                  <img
                    loading="lazy"
                    width="20"
                    src={`https://flagcdn.com/w20/${option.countryCode.toLowerCase()}.png`}
                    srcSet={`https://flagcdn.com/w40/${option.countryCode.toLowerCase()}.png 2x`}
                    alt=""
                  />
                  {option.countryName} ({option.countryCode}) 
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Choose a country"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                  }}
                />
              )}
            />
            <Button onClick={()=>setCountry()} className='buttonInvert  w-full' style={{margiTop : "18px"}}>Continue</Button>
                </form>
        </DialogActions>
        </Container>
      </Dialog>
      )}
      </Formik>
    </div>
  );
}
