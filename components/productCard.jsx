import React, { useEffect, useState, useContext } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Button, Grid ,TextField} from '@mui/material';
import Link from "next/link"
import axios from 'axios';
import { signOut, useSession , signIn } from "next-auth/react";
import {userContext} from "../context/user";
import {Context} from "../context/country";
import {addToWishlist} from "../services/userServices";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProductCard = (props) => {
  const { data: session } = useSession();
  const productDetails = props.data;
  console.log("Product Details: ", productDetails)
  const [inStock , checkStock] = useState(true)
  const myData= useContext(Context)
  let [ wishlisted, isWishlisted] = useState(false);
  const [wishlist , setWishlist]=useState([]);
  const userWishlist = useContext(userContext);
  useEffect(()=>{
    if(productDetails.inventory.XS === 0 && 
      productDetails.inventory.S === 0 && 
      productDetails.inventory.L === 0 && 
      productDetails.inventory.M === 0 &&
      productDetails.inventory.XL ===0)
      {
        checkStock(false)
      }
      if(session)
      {

        userWishlist.userWishlist.length == 0 ?? setWishlist(session.user.wishlist);
        const check = wishlist.includes(productDetails._id)
        isWishlisted(check)
        userWishlist.setUserWishlist(session.user.wishlist)
      }
    
  },[])

  useEffect(()=>{

  },[wishlisted])
  async function addWishlist()
  {
    if(session)
    {
      const {wishlist , error} = await addToWishlist(session.id , productDetails.slug)
    
      if(wishlist)
      {
        let ids = [];
        wishlist.map((data , index)=>{
          ids.push(data._id)
        })
    
        userWishlist.setUserWishlist(wishlist)
        setWishlist(userWishlist.userWishlist);
        isWishlisted(true)
     
        toast.success('Item added to wishlist successfully!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }
      else
      {
      
      }
    }
    else{
      signIn();
    }
  }

  async function addToCart()
  {
    
    
  }
    return (
      <div>
         <ToastContainer/>
            <div className=''>
            {/* {!props.isWishlist && 
                wishlist.includes(productDetails._id) ? 
                <FavoriteIcon 
                className='wishlistIcon' 
                // onClick={()=>addToWishlist()}
                style={{color : "#ff2d55" , backgroundColor : "transparent" , fontSize:"35px"}}
                />
                :
                <FavoriteBorderIcon 
                    className='wishlistIcon' 
                    onClick={(e)=>addWishlist(e)}
               />
              } */}
            <Link href = {`../products/${productDetails.slug}`}>
              <div>
                <div className='productImage'>
                <img src={productDetails.images[0]} className='cardImg'></img>
              { !inStock ? 
                   <p className='stockAvailable'>Out of Stock</p>
                   :
                   <></>
                }
                </div>
              
              <p className='productName mb-0 mt-1'>{productDetails.title}</p>
              <p className='text-mute collectionName'>{productDetails.collectionName.title}</p>
              <p className='productPrice'>
                  {   
                    myData.value.currency + " " + (productDetails.price * myData.value.currencyRate).toFixed(2)
                  }
              </p>
             <div className='stockDiv'>
             {/* { !inStock ? 
                   <p className='stockStatusNotAvailable'>Out of Stock</p>
                   :
                   <p className='stockStatusAvailable'>Recommended</p>
                } */}
             
               
                 
             </div>

             
              </div>
              </Link>
              {/* {
                props.isWishlist ?
                <Button className='button w-full mt-5' variant="outlined" onClick={()=>addToCart()}>
                Move To Cart
           </Button> :
           <></>
              } */}
            </div>
            
    </div>
    )
  
}

export default ProductCard
