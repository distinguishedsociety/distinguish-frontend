import { createContext, useState, useEffect } from "react";
import {getProfile} from "../services/userServices"
import { useSession } from "next-auth/react";

export const userContext = createContext();

export default function UserProvider ({ children }) {
  const { data: session } = useSession();

  let [userWishlist , setUserWishlist] = useState( session ? session.user : []); 


  const exposed = {
    userWishlist,
    setUserWishlist
  };

  return <userContext.Provider value={exposed}>{children}</userContext.Provider>;
};


