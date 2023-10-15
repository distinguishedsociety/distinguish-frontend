import React from 'react'
import {Dialog ,DialogActions,Container} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';


export default function sizeChart(props) {
  return (
    <Dialog
    open={props.sizeOpen}
    aria-labelledby="responsive-dialog-title"
    onClose={props.handleSizeClose}
  >
    <CloseRoundedIcon className='formClose'   onClick={props.handleSizeClose}/>
     <Container>
    <DialogActions className='loginFormGrid'>
        <img style={{padding : "20px 14px"}} src='../assets/sizeChart.png' />
    </DialogActions>
    </Container>
  </Dialog>
  )
}
