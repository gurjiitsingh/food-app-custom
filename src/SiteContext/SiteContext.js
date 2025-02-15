"use client"

import  { createContext, useContext } from "react";


const SiteContext = createContext({
    open: false,
    sideBarToggle:()=>{},
    openBargerMenu:false,
    bargerMenuToggle:()=>{},
})

export const UseSiteContext = () =>{
     const context  = useContext(SiteContext);
     if (!context) {
        throw new Error("useCartContext must be used within a CartContextProvider");
      }
      return context;
}

export default SiteContext;