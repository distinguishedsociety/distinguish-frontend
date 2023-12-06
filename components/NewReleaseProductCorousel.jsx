import React from 'react'

import  ProductCard  from './productCard'
import { Grid} from '@mui/material'
import styles from '../styles/NewReleaseProductCorousel.module.css'


const NewReleaseProductCorousel = ({products}) => {
  return (
    <div class="mt-4">
        {/* <div class="row row-cols-2 row-cols-md-4">
            {products?.map((product, index) => (
                  <ProductCard data={product} key={index}/>
            ))}
        </div> */}
        <Grid  
                      container
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                      spacing={4}
                      className={styles.displayProductGrid}
                      >         
              {
                products && products.map((product, index)=>(                 
                    <Grid className={styles.gridItem} item xs={6} md={3} >               
                          <ProductCard data={product}/>        
                    </Grid>
                ))
              }           
          </Grid>
    </div>
  )
}

export default NewReleaseProductCorousel