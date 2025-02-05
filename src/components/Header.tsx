"use client";
import Navbar from "@/components/Navbar";
import Login from "./Login";
import { SessionProvider } from "next-auth/react";
import Cart from "./Cart";
import { UseSiteContext } from "@/SiteContext/SiteContext";
import { FaBars } from "react-icons/fa6";

//import { useWindowDimensions } from "@/components/useWindowDimensions";

// if (global.window === undefined) {
//   global.window = global;
// }
const Header = () => {
 
  const { bargerMenuToggle } = UseSiteContext();
  // const [width, setWidth] = useState(0);
  // const [height, setHeight] = useState(0);
  // const [showNav, setShowNav] = useState(true);
  
  //  useEffect(() => {
  //   const handleResize = () => setWidth(window.innerWidth);
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
 
  //  }, []);

  //  useEffect(()=>{
  //   if(width >= 1024 ){
  //     setShowNav(true);
  //   }else{
  //    // setShowNav(false); 
  //   }

  //  },[width])
   

  return (
    <header className="fixed top-5 left-3 bg-white z-30 flex items-center justify-between gap-3 py-1 mt-3 px-4 border-b mx-auto w-full md:w-[96%] shadow-sm rounded-full">
   
    <div className="flex gap-2">
      <img className="h-5 md:h-6" src="/download.svg" alt="Logo" />
      <Navbar />
      {/* {showNav ? <Navbar /> : <></>} */}
      </div>
      <div className="flex gap-2">
        <SessionProvider>
          <Login />
        </SessionProvider>
        <Cart />
        {/* <CartLink /> */}

        <button
          onClick={bargerMenuToggle}
          className="size-lg px-3 block lg:hidden"
          aria-label="toggle burger menu"
        >
          <FaBars className="hidden md:block" size={40} />
          <FaBars className="md:hidden" size={32} />
        </button>
      </div>
    </header>
    
  );
};

export default Header;
