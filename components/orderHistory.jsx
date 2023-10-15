import React , {useState} from 'react'
import {Card} from '@mui/material'
import styles from './orderHistory.module.css'
import Link from "next/link"
// import {Invoice} from './invoice';
  

export default function orderHistory(props) {
    const[download , setDownload] = useState(false)
   
    // function downloadInvoid()
    // {
    //     console.log("download")
    //     setDownload(true)
    //     //ReactPDF.render(<MyDocument />, 'downloads/example.pdf');

    // }
  return (
      <>
        <Card style={{margin:"24px 0px"}}>
            <div className={styles.invoiceDiv}>
                <h1><b>Placed on: </b> {props.data.createdAt.split("T")[0]}</h1>
                {/* <p className={styles.download} onClick={()=>downloadInvoid()}>Download Invoice</p> */}
            </div>
            <div className={styles.detailsDiv}>
                <h1><b>Order ID: </b> {props.data._id}</h1>
                <div className={styles.subDiv}>
                    <div className={styles.products}>
                        <h1><b>Products : {props.data.products.length}</b></h1>
                        <div className={styles.imageDiv}>
                        {
                          
                            props.data.products.map((product , i)=>(
                                <Link href = {`../products/${product.product.slug}`}>
                                <img className={styles.productImages} src={product.product.images[0]}></img>
                                </Link>
                            ))
                            
                        }
                        </div>
                    </div>
                    <h1><b>Total Amount:</b> {props.data.orderAmount} {"    "}
                    <span style={{color:"green"}}><b>{props.data.orderType}</b></span></h1>
                </div>
            </div>
        </Card>
        {/* {
            download ? 
                <Invoice/>
            :
            <></>
        } */}
        </>
  )
}
