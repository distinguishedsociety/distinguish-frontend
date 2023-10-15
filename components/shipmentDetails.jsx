import React , {useEffect} from 'react'
import {Container , Button , TextField , RadioGroup , Radio ,FormControlLabel , FormLabel , FormControl} from '@mui/material'
import styles from './shipmentDetails.module.css';

export default function shipmentDetails(props) {
    const [value , setValue] = React.useState("Prepaid")
  
   console.log("props",props)
    function handleChange(e)
    {
        setValue(e.target.value)
        let newData = { ...props.address }
        console.log(newData)
        newData["order_type"] = e.target.value
        console.log("new data after order type" , newData)
        props.setAddress(newData)
        props.checkShippingPrice()
    }

    useEffect(() => {
      let newData = { ...props.address }
      console.log(newData)
      newData["order_type"] = "Prepaid"
      console.log("new data after order type" , newData)
      props.setAddress(newData)
      window.scrollTo(0, 0)
    },[])

  
  return (
    <Container>

        <div className={styles.main}>
            {
                props.address.delivery_country.name == "India" || props.address.delivery_country.name == "india"
                ?
                <div className={styles.freeDelivery}>
                    {/* <RadioGroup
                      checked={true}
                    > </RadioGroup> */}
                    <FormControlLabel  control={<Radio  checked={true}/>} label="Free Delivery" />

                </div>
                :
                <></>
            }
           <h2 className={styles.subHeadText}> Select Payment Method</h2>
           <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={(e)=>handleChange(e)}
              >
                  <div className={styles.freeDelivery}>
                    <FormControlLabel value="Prepaid" control={<Radio />} label="UPI / Debit card / Credit card" />
                  </div>
                  {props.address.delivery_country == "IN" && <div className={styles.freeDelivery}>
                    <FormControlLabel value="COD" control={<Radio />} label="Cash on delivery" />
                  </div>}
                
              </RadioGroup>
            </FormControl>
        </div>
        {/* <h1>Ship to: {props.address.city}, {props.address.delivery_country}</h1> */}
        {/* <label>Select payment method</label><br/>   
        <select onChange={(e)=>handleChange(e)}>
            <option value="Prepaid">
                UPI/Credit card / Debit card
            </option>
            <option value="COD">
                Cash on delivery
            </option>
        </select> */}

      
    </Container>

  )
}
