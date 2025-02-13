"use client";

import { useRef, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AnimatePresence, motion } from "framer-motion";
import { useClickAway } from "react-use";
import { AiOutlineRollback } from "react-icons/ai";
import { BiHomeSmile, BiUser } from "react-icons/bi";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import { FiSettings, FiShoppingCart } from "react-icons/fi";
import { UseSiteContext } from "@/SiteContext/SiteContext";
import MiniCartContent from "./MiniCartcontent";
import { MiniCartSubtotal } from "./MiniSubtotal";
import Link from "next/link";
export const SideCart = () => {
  const { open, sideBarToggle } = UseSiteContext();
  const ref = useRef(null);
  useClickAway(ref, () => sideBarToggle());
  // const sideBarToggle = () => setOpen(prev => !prev)

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        {open && (
          <>
            <motion.div
              {...framerSidebarBackground}
              aria-hidden="true"
              className="fixed bottom-0 left-0 right-0 top-0 z-40 bg-[rgba(244,243,243,0.1)] backdrop-blur-sm"
            ></motion.div>
            <motion.div
              {...framerSidebarPanel}
              className="fixed top-0 bottom-0 left-0 z-50 w-full h-screen max-w-lg border-r-2 border-zinc-50 bg-white"
              ref={ref}
              aria-label="Sidebar"
            >
              <div className="flex items-center justify-between p-5 border-b-2 border-zinc-50 ">
                <span>Welcome</span>
                <button
                  onClick={sideBarToggle}
                  className="p-3 border-2 border-zinc-800 rounded-xl"
                  aria-label="close sidebar"
                >
                  <AiOutlineRollback />
                </button>
              </div>
              <div className="flex items-center justify-center">
                <Link
                  href={{
                    pathname: "/checkout",
                    //  query:{ userId: session?.user?.id}
                  }}
                >
                  <div className="w-[200px] py-1 text-center bg-yellow-500 rounded-2xl text-[.8rem]">
                    Procces to buy
                  </div>
                </Link>
              </div>
              <MiniCartSubtotal />
              <MiniCartContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const items = [
  { title: "Home", Icon: BiHomeSmile, href: "#" },
  { title: "About", Icon: BiUser },
  { title: "Contact", Icon: HiOutlineChatBubbleBottomCenterText, href: "#" },
  { title: "Settings", Icon: FiSettings, href: "#" },
  { title: "Shop", Icon: FiShoppingCart, href: "#" },
];

const framerSidebarBackground = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { delay: 0.2 } },
  transition: { duration: 0.3 },
};

const framerSidebarPanel = {
  initial: { x: "-100%" },
  animate: { x: 0 },
  exit: { x: "-100%" },
  transition: { duration: 0.3 },
};

const framerText = (delay) => {
  return {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: {
      delay: 0.5 + delay / 10,
    },
  };
};

const framerIcon = {
  initial: { scale: 0 },
  animate: { scale: 1 },
  transition: {
    type: "spring",
    stiffness: 260,
    damping: 20,
    delay: 1.5,
  },
};
