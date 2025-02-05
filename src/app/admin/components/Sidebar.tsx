'use client'
import Link from 'next/link'
import { signOut } from "next-auth/react";//, useSession
import { MdSpaceDashboard } from "../../../../node_modules/react-icons/md";
import { MdOutlineProductionQuantityLimits } from "../../../../node_modules/react-icons/md";
import { FaUserTie } from "../../../../node_modules/react-icons/fa";
import { GiStarsStack } from "../../../../node_modules/react-icons/gi";
import { IoLibrary } from "../../../../node_modules/react-icons/io5";
import { BsBorderStyle } from "../../../../node_modules/react-icons/bs";
import { SiBrandfolder } from "../../../../node_modules/react-icons/si";
import { TbCategoryPlus } from "../../../../node_modules/react-icons/tb";
import { usePathname } from 'next/navigation';
import { IoIosLogOut } from "../../../../node_modules/react-icons/io";
import { GoHome } from "react-icons/go";
//import { Button } from '@/components/ui/button';

 



const Sidebar = () => {

  const menuList = [
    {
      name:"Home",
      link:"/",
      icon: <GoHome />
    },
    {
      name:"Dashboard",
      link:"/admin",
      icon: <MdSpaceDashboard />
    },
    {
      name:"Products",
      link:"/admin/products",
      icon:<MdOutlineProductionQuantityLimits />
    },
   
    {
      name:"Categories",
      link:"/admin/categories",
      icon:<TbCategoryPlus />
    },
    {
      name:"Brands",
      link:"/admin/brands",
      icon:<SiBrandfolder />
    },
    {
      name:"Orders",
      link:"/admin/orders",
      icon:<BsBorderStyle />
    },
    {
      name:"Users",
      link:"/admin/users",
      icon:<FaUserTie />
    },
    {
      name:"Reviews",
      link:"/admin/reviews",
      icon: <GiStarsStack />
    },
    {
      name:"Collections",
      link:"/admin/collections",
      icon: <IoLibrary />
    },
    {
      name:"Setting",
      link:"/admin/setting",
      icon: <IoLibrary />
    }
    
  ]

  return (
    <div className='h-screen w-[290px] border-r flex flex-col py-4 px-8 items-center justify-start overflow-hidden'>
       <ul className='flex flex-col gap-2 overflow-y-auto'>
        {
       menuList?.map((item)=>{return(
   <Tab key={item.name} item={item} />
      )})
        }
       </ul>
       <div className='flex flex-col items-center w-full'>
      
<button onClick={()=>signOut()} className='flex gap-2 items-center px-4 py-1 rounded-lg ease-soft translate-all duration-300 font-semibold text-[.9rem]'>
 Logout <IoIosLogOut />
  </button>
  </div>

    
        
        </div>
  )
}


function Tab({item}){
  const path = usePathname();
  const isSelected = path === item?.link;

return <>  <Link href={item?.link}>
  <li className={`flex gap-2 items-center px-4 py-1 rounded-lg ease-soft translate-all duration-300 font-semibold text-[.9rem] 
      ${isSelected ? "bg-violet-300 text-white":"text-slate-700"}`}  >
    {item?.icon}{item?.name}
    </li>
    </Link></>
}

export default Sidebar