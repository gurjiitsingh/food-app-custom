"use client";
import React from "react";
//import './Checkout.css';
import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { loadScript } from "@paypal/paypal-js";
import { useRouter } from "next/navigation";
import { useCartContext } from "@/store/CartContext";

loadScript({
  "client-id": process.env.PAYPAL_CLIENT_KEY,
    // "AW5e7drnAQ7XcIGUsTNi1B88EO_XyXPhMGzm32hUffetc9NWsDBjzua8cGJKVbLbR16XxdlGE0Wh4nUa",
})
  .then((paypal) => {
    // start to use the PayPal JS SDK script
  })
  .catch((err) => {
    console.error("failed to load the PayPal JS SDK script", err);
  });

const Checkout = () => {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  //const [currency, setCurrency] = useState(options.currency);
  const router = useRouter();
  const {  productTotalCost } = useCartContext();

  // const onCurrencyChange = ({ target: { value } }) => {
  //   setCurrency(value);
  //   dispatch({
  //     type: "resetOptions",
  //     value: {
  //       ...options,
  //       currency: value,
  //     },
  //   });
  // };

  //var products =  JSON.parse(window.localStorage.getItem("cart_product_data"));
  if (typeof window !== 'undefined') {
  var customerAddress = JSON.parse(localStorage.getItem("customer_address"))
  }
//console.log("cartData ", productTotalCost)
  const onCreateOrder = (data, actions) => {
    return actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            value: productTotalCost,
          },
        },
      ], 
      items: [
        {
          "name": "First Product Name", /* Shows within upper-right dropdown during payment approval */
          "description": "Optional descriptive text..", /* Item details will also be in the completed paypal.com transaction view */
          "unit_amount": {
            "currency_code": "USD",
            "value": "50"
          },
          "quantity": "2"
        },
      ],
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
     // alert(`Transaction completed by ${name}`);
     router.push("/complete")
    //  router.push({
    //   pathname: "/complete",
    //   query: { data: details.payer },
    // })
    });
  };

  return (<div className="flex container mx-auto px-[30%] items-center justify-center my-[20%] ">
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
              amount: 88,
              align: "center",
              color: "black",
              position: "top",
            }}
            style={{ layout: "vertical" }}
            createOrder={(data, actions) => onCreateOrder(data, actions)}
            onApprove={(data, actions) => onApproveOrder(data, actions)}
          />
        </>
      )}
    </div></div>
  );
};

const initialOptions = {
  "client-id": "AaE5j_iAGG8h6JeuW6y3khLvftR8OT2qDi2tqlhTaOeC4QxU3feFgMgF1RYMGe7LuYAtd7EyhQZpUhQz",//
  // process.env.PAYPAL_CLIENT_KEY,
  
  currency: "USD",
  intent: "capture",
};


function ProviderWrapper() {
  return (
    <PayPalScriptProvider options={initialOptions}>
      <Checkout />
    </PayPalScriptProvider>
  );
}

export default ProviderWrapper;
