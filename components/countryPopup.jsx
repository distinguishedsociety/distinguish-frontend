import  React,  {useContext, useEffect, useState} from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {TextField , Box , Autocomplete , Dialog ,DialogActions,Container, Button } from '@mui/material';
import {convertCurrency} from "../services/currencyConversion"
import {Context} from '../context/country';
import axios from 'axios';



export default function CountryPopup(props) {
  const myData= useContext(Context)
  //const [selectedCountry , setSelectedCountry] = React.useState(myData.value);
  const [inputValue, setInputValue] = React.useState();
  const [countryValue, setValue] = React.useState();
  const [countries,setCountries] = useState([])
  const [error, setError] = React.useState(null);

  useEffect(() => {
    const getContinent = async () => {
      const result = await axios.get(
        "https://api.thedistinguishedsociety.com/internal/api/admin/get-continent"
      );
      if(result.data.status == 'success'){
        const updateddta = result.data.data.length > 0 && result.data.data.sort((a, b) => a.name.localeCompare(b.name))
        const newData = updateddta.map(item => {
          return {...item, name:item.name.charAt(0).toUpperCase() + item.name.slice(1)}
        })
        setCountries([...newData])
      }
    }
    getContinent()
  },[])
  console.log('value-->',countryValue)
 async function handleCountry(){
   console.log('value',countryValue)
    localStorage.setItem("country" , countryValue.name)
    localStorage.setItem("currencyRate" , countryValue.currencyRate)
    localStorage.setItem("currency" , countryValue.countryCode)
    localStorage.setItem("countryCode" , countryValue.countryCode)
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
    
  //  }
  }
 
      

  return (
    <div>
      <Formik
        initialValues={{ country: props.country}}
        validationSchema={Yup.object({
          country: Yup.string()
            .required('Please select your country'),
        })}
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
              value={countryValue}
              displayEmpty
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue)
              }}
              getOptionLabel={(option) => option.name}
              renderOption={(props, option) => (
                <Box  component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                  {option.name} ({option.countryCode.toUpperCase()}) 
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
            <Button type='button' onClick={()=>handleCountry()} className='buttonInvert  w-full' style={{margiTop : "18px"}}>Continue</Button>
                </form>
        </DialogActions>
        </Container>
      </Dialog>
      )}
      </Formik>
    </div>
  );
}
