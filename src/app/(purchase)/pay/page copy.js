"use client";
import React, { useEffect, useState } from "react";
//import './Checkout.css';
import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { loadScript } from "@paypal/paypal-js";





loadScript({
  "client-id":
    "AW5e7drnAQ7XcIGUsTNi1B88EO_XyXPhMGzm32hUffetc9NWsDBjzua8cGJKVbLbR16XxdlGE0Wh4nUa",
})
  .then((paypal) => {
    // start to use the PayPal JS SDK script
  })
  .catch((err) => {
    console.error("failed to load the PayPal JS SDK script", err);
  });

const Checkout = () => {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const [currency, setCurrency] = useState(options.currency);

  const onCurrencyChange = ({ target: { value } }) => {
    setCurrency(value);
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: value,
      },
    });
  };

  var products =  JSON.parse(localStorage.getItem("cart_product_data"));
  var customerAddress = JSON.parse(localStorage.getItem("customer_address"))
  console.log("address out --------",customerAddress)

  const onCreateOrder = (data, actions) => {

    //console.log("thess -----",customerAddress)

  const cartItems =  [{
      name:"Product1",
      description: "Good item",
      quantity: 1,
      price: 50,
      sku: "prod1",
      currency: "USD"
    }
]

    return actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
             currency: "USD",
            value: "100.00",
          },
          breakdown:{
                item_total:{
                    currency: "USD",
                    value:"100.00"
                }
            },
           
               
        },
        
      ],
      // items: [
      //   {
      //     "name": "First Product Name", /* Shows within upper-right dropdown during payment approval */
      //     "description": "Optional descriptive text..", /* Item details will also be in the completed paypal.com transaction view */
      //     "unit_amount": {
      //       "value": "50"
      //     },
      //     "quantity": "1"
      //   },
      //   {
      //     "name": "second Product Name", /* Shows within upper-right dropdown during payment approval */
      //     "description": "Optional descriptive text1", /* Item details will also be in the completed paypal.com transaction view */
      //     "unit_amount": {
      //       "value": "50"
      //     },
      //     "quantity": "1"
      //   },
      // ],
      payer: {
        name: {
          given_name: customerAddress.firstName,
          surname: customerAddress.lastName,
        },
        address:
         {
          address_line_1: customerAddress.addressLine1,
          address_line_2: customerAddress.addressLine2,
          admin_area_2: customerAddress.city,
          admin_area_1: customerAddress.state,
          postal_code: customerAddress.zipCode,
          country_code: "US",
        },
        email_address: customerAddress.email,
        phone: {
          phone_type: "MOBILE",
          phone_number: {
            national_number: customerAddress.mobNo,
          },
        },
      },
    });
  };

  const onApproveOrder = (data, actions) => {
    return actions.order.capture().then((details) => {
      const name = details.payer.name.given_name;
      alert(`Transaction completed by ${name}`);
    });
  };

 
   

  return (
    <div className="checkout">
      {isPending ? (
        <p>LOADING...</p>
      ) : (
        <>
          {/* <select value={currency} onChange={onCurrencyChange}>
                            <option value="USD">💵 USD</option>
                            <option value="EUR">💶 Euro</option>
                    </select> */}
          <PayPalButtons
            message={{
              amount: 100,
              align: "center",
              color: "black",
              position: "top",
            }}
            style={{ layout: "vertical" }}
            createOrder={(data, actions) =>   onCreateOrder(data, actions)}
            onApprove={(data, actions) => onApproveOrder(data, actions)}
          />
        </>
      )}
    </div>
  );
};

const initialOptions = {
  "client-id":
    "AW5e7drnAQ7XcIGUsTNi1B88EO_XyXPhMGzm32hUffetc9NWsDBjzua8cGJKVbLbR16XxdlGE0Wh4nUa",
  currency: "USD",
  intent: "capture",
};

function ProviderWrapper() {
  
  const ad =  {
    address_line_1: "124-07 Liberty Ave",
    address_line_2: "Vill Tandi",
    admin_area_2: "South Richmond Hill",
    admin_area_1: "New York",
    postal_code: "11419",
    country_code: "US",
  }

  return (
    <>
      <div className="h-screen w-full mx-auto md:w-[90%] bg-green-50 flex flex-col justify-center items-center">
        <PayPalScriptProvider options={initialOptions}>
          <Checkout />
        </PayPalScriptProvider>
      </div>
    </>
  );
}

export default ProviderWrapper;

// {
//   address_line_1: "124-07 Liberty Ave",
//   address_line_2: "Vill Tandi",
//   admin_area_2: "South Richmond Hill",
//   admin_area_1: "New York",
//   postal_code: "11419",
//   country_code: "US",
// }


 // const [address, setAddress ] = useState({});
    // useEffect(()=>{
  
    //   async function getAddress(){
    //     const inputEmail = "gurjiitsingh@gmail.com";
    //     const  addressRes =   await  searchAddress(inputEmail) || {};
    //    console.log("this is address",addressRes);
    //      if(addressRes !== null){
        
    //   const address1 =  {
    //        address_line_1: addressRes.addressLine1,
    //        address_line_2: addressRes.addressLine2,
    //        admin_area_2: addressRes.city,
    //        admin_area_1: addressRes.state,
    //        postal_code: addressRes.zipCode,
    //        country_code: "US",
    //      }
    //      setAddress(address1)
       
    //    }
    //     }
    //   getAddress()
     
    //  },[])
  //  console.log("address ------- ",address)