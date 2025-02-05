"use client"
import SiteContext from "./SiteContext";
import { useState } from 'react'

export const SiteProvider = ({children}) =>{

const [open, setIsOpen] = useState();
const [openBargerMenu, setOpenBargerMenu] = useState();
function togleMenu(){
        setIsOpen(!open);
    }
function bargerMenuToggle(){
    setOpenBargerMenu(!openBargerMenu);
}

return(
    <SiteContext.Provider value={{
        open,
        openBargerMenu,
        sideBarToggle:togleMenu,
        bargerMenuToggle,
    }}>

{children}

    </SiteContext.Provider>
)

}

