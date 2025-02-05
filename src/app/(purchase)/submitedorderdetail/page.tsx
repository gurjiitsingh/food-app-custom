"use client";
import React, { useEffect, useState } from "react";
import { useCartContext } from "@/store/CartContext";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import DynamicRadioButtons from "@/components/formComponents/DynamicRadioButtons";


const options = [
  { label: 'Credit Card', value: 'credit_cart' },
  { label: 'Netbanking', value: 'netbanking' },
  { label: 'UPI', value: 'upi' },
];

const page = () => {
  // const { data: session } = useSession();
  const { cartData, productTotalCost } = useCartContext();
  const serchParams = useSearchParams();
  const userId = serchParams.get("userId");
  const addressId = serchParams.get("addressId");
  
  const [userAddress, setUserAddress] = useState([]);
  const [addOption, setAddressOption] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCartEmpty, setisCartEmpty ] = useState(false)
  const { emptyCart } = useCartContext();
  async function payNow() {
    try {
      let response = await fetch("http://localhost:3000/api/order", {
        method: "POST",
        body: JSON.stringify({
          userId: userId,
          cartData,
          totalAmount: productTotalCost,
          shipingID: "00000",
          ShippingAddressID: addressId,
          BillingAddressID: "00000",
          orderStatus: "PENDING",
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      response = await response.json();
    //  console.log("RES",response);

      if(response.status ===  200){

        // empty cart as order is saved in database
            
        emptyCart();
        

        // payend entry is "PENDING" untill now

      
        // start stripi paymnent process 
           
        // if payment is successfull update payment "PAID"
        
       // show order detail
        

      }

    

    } catch (error) {
      console.log(error);
    }
  }

  

  const handleOptionSelect = (value) => {
    setSelectedOption(value);
  };


  return (
    <div className="bg-slate-100 px-32 py-32 flex flex-col ">
      <div className="flex flex-col ">
        <h1 className="h3 ">Your order is success full</h1>
      
       
          {/* <p>Selected option: {selectedOption}</p> */}
       
        {/* <Button className="w-fit" onClick={payNow}>Pay now</Button> */}
      </div>
    </div>
  );
};
export default page;
