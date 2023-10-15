import React from 'react'
import { Button} from '@mui/material';
import Link from "next/link";

export default function BlogCard(props: any) {
  const blogDetails = props.data;
    return (
      <div>
            <div className='carDiv'>
              <img className='blogImage' src={blogDetails.bannerLink} ></img>
              <h2 className='blogName'>{blogDetails.title}</h2>
              <Link 
               
                  href = {`../blogs/${blogDetails._id}`} 
               
                >
              <Button className='button w-full mt-5' variant="outlined">
                          Read This Blog
             </Button>
              </Link>
              
            </div>
            
    </div>
    )
  
}
