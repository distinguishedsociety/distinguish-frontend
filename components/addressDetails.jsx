import React, { useContext, useState } from 'react'
import { Container, Button, TextField, Autocomplete, Box } from '@mui/material'
import styles from '../styles/addressDetails.module.css'
import { useForm } from 'react-hook-form'
import { Context } from '../context/country'
import { Country, State, City }  from 'country-state-city';
import { fetchDeliveryOptions } from '../services/userServices'
import { toast } from 'react-toastify'


export default function addressDetails(props) {
  const myData = useContext(Context)
  console.log(myData)
  const [countryInputValue, setCountryInputValue] = React.useState();
  // const [country, setCountry] = useState(Country.getCountryByCode(myData.value.countryCode))
  const [state, setState] = useState("")
  const [stateInputValue, setStateInputValue] = React.useState();
  const [data, setData] = React.useState({
    firstname: '',
    lastname: '',
    email: '',
    isInternational: false,
    address: '',
    landmark: '',
    state: '',
    city: '',
    delivery_country: myData.value.country ?? localStorage.getItem('country'),
    pincode: '',
    order_type: 'Prepaid',
    phoneNumber: '',
  })
  

  React.useEffect(() => {
    if (Object.keys(props.address).length > 0) {
      let newData = { ...data }
      Object.keys(props.address).map((key, i) => {
        newData[key] = Object.values(props.address)[i]
      })
      setData(newData)
    }
  }, [])

  const handleInputChange = (e) => {
    let newData = { ...data }
    newData[e.target.id] = e.target.value
    setData(newData)
  }

  const continueShipment = async (formData) => {
    console.log(formData)
    console.log("Hello")
    setData(formData)
    if (props.country.name != 'India') {
      let newData = { ...formData, isInternational: true, delivery_country: props.country.isoCode, state: state }
      newData['isInternational'] = true
      setData(newData)
      props.setAddress(newData)
    } else {
      let newData = { ...formData, isInternational: false, delivery_country: props.country.isoCode, state: state }
      newData['isInternational'] = false
      setData(newData)
      props.setAddress(newData)
    }
    props.setLoading(true)
    console.log("addressDetails: ", formData.pincode)
    // const {data, error} = await fetchDeliveryOptions()
    props.checkShippingPrice()
    props.setLoading(false)
    // if(error){
    //   props.setLoading(false)
    //   toast.error(error)
    // }else{
    //   console.log(data)
    //   props.setLoading(false)
    // }
    // props.handleNext()
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'all', reValidateMode: 'onChange' })
  console.log(State.getStatesOfCountry(myData.value.countryCode))
  console.log(data)
  return (
    <Container>
      <div className={styles.mainGrid1}>
        <div className={styles.detailsGrid}>
          <form onSubmit={handleSubmit((data) => continueShipment(data))}>
            <div className={styles.orderDetailsMain1}>
              <h2>Order details</h2>
              {/* Country Dropdown */}
              <Autocomplete
                name="country"
                id="country-select-demo"
                sx={{ width: "100%" }}
                options={Country.getAllCountries()}
                autoHighlight
                displayEmpty
                value={props.country}
                onChange={(event, newValue) => {
                  props.setCountry(newValue)
                  setState()
                }}
                inputValue={countryInputValue}
                onInputChange={(event, newInputValue) => {
                  setCountryInputValue(newInputValue)
                  setStateInputValue("")
                }}
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    <img
                      loading="lazy"
                      width="20"
                      src={`https://flagcdn.com/w20/${option.isoCode.toLowerCase()}.png`}
                      srcSet={`https://flagcdn.com/w40/${option.isoCode.toLowerCase()}.png 2x`}
                      alt=""
                    />
                    {option.name} ({option.isoCode})
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
                    required
                  />
                )}
              />
              {/* State Dropdown */}
              <Autocomplete
                name="country"
                id="country-select-demo"
                sx={{ width: "100%" }}
                options={props.country ? State.getStatesOfCountry(props.country.isoCode): []}
                autoHighlight
                displayEmpty
                value={state}
                onChange={(event, newValue) => {
                  setState(newValue)
                }}
                inputValue={countryInputValue}
                onInputChange={(event, newInputValue) => {
                  setStateInputValue(newInputValue)
                }}
                getOptionLabel={(option) => option.name ?? ""}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Select State"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                    required
                  />
                )}
              />
              <TextField
                {...register('firstname', { required: true })}
                id="firstname"
                label="First Name"
                variant="outlined"
                size="small"
                className={styles.inputField}
              />
              {errors.firstname && (
                <>
                  {errors.firstname?.type === 'required' && (
                    <p className="error">Firstname is required</p>
                  )}
                </>
              )}
              <TextField
                {...register('lastname', { required: true })}
                id="lastname"
                label="Last Name"
                variant="outlined"
                size="small"
              />
              {errors.lastname && (
                <>
                  {errors.lastname?.type === 'required' && (
                    <p className="error">Lastname is required</p>
                  )}
                </>
              )}
              <div className={styles.orderDetailsSub1}>
                <div className={styles.errors}>
                  <TextField
                    {...register('phoneNumber', {
                      required: true,
                      maxLength: 10,
                      minLength: 10,
                    })}
                    id="phoneNumber"
                    label="Contact Number"
                    variant="outlined"
                    size="small"
                    className={styles.textField}
                  />
                  {errors.phoneNumber && (
                    <>
                      {errors.phoneNumber?.type === 'required' && (
                        <p className="error">Phone Number is required</p>
                      )}
                      {errors.phoneNumber?.type === 'maxLength' && (
                        <p className="error">Invalid Phone Number</p>
                      )}
                      {errors.phoneNumber?.type === 'minLength' && (
                        <p className="error">Invalid Phone Number</p>
                      )}
                    </>
                  )}
                </div>
                <div className={styles.errors}>
                  <TextField
                    {...register('email', {
                      required: true,
                      pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i,
                    })}
                    id="email"
                    label="Email ID"
                    variant="outlined"
                    size="small"
                    className={styles.textField}
                  />
                  {errors.email && (
                    <>
                      {errors.email?.type === 'required' && (
                        <p className="error">Email is required</p>
                      )}
                      {errors.email?.type === 'pattern' && (
                        <p className="error">Invalid Email</p>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.orderDetailsMain1}>
              <h2>Add new address</h2>
              <TextField
                {...register('address', { required: true })}
                id="address"
                placeholder="Enter shipping address in detail"
                multiline
                minRows={4}
                variant="outlined"
                size="small"
              />
              {errors.address && (
                <>
                  {errors.address?.type === 'required' && (
                    <p className="error">Address is required</p>
                  )}
                </>
              )}
              <TextField
                {...register('landmark', { required: true })}
                id="landmark"
                label="Landmark"
                variant="outlined"
                size="small"
                className={styles.textField}
              />
              {errors.landmark && (
                <>
                  {errors.landmark?.type === 'required' && (
                    <p className="error">Landmark is required</p>
                  )}
                </>
              )}
              <div className={styles.orderDetailsSub1}>
                <div className={styles.errors}>
                  <TextField
                    {...register('pincode', { required: true })}
                    id="pincode"
                    label="Zip Code"
                    variant="outlined"
                    size="small"
                    className={styles.textField}
                  />
                  {errors.pincode && (
                    <>
                      {errors.pincode?.type === 'required' && (
                        <p className="error">Pincode is required</p>
                      )}
                    </>
                  )}
                </div>
                <div className={styles.errors}>
                  <TextField
                    {...register('city', { required: true })}
                    id="city"
                    label="City"
                    variant="outlined"
                    size="small"
                    className={styles.textField}
                  />
                  {errors.city && (
                    <>
                      {errors.city?.type === 'required' && (
                        <p className="error">City is required</p>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
            <Button
              className={styles.continueButton}
              style={{ backgroundColor: 'black', color: 'white' }}
              type="submit"
              variant="outlined"
            >
              Countinue Shipment
            </Button>
          </form>
        </div>
      </div>
    </Container>
  )
}
