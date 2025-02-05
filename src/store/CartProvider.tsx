"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import CartContext from "./CartContext";

interface Props {
  children: React.ReactNode;
}

export const CartProvider: React.FC<Props> = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  var now1 = Date.now().toString();

  const [cartData, setCartData] = useState<ProductType[]>([]);
  const [address, setAddress] = useState({});
  const [counter, setCounter] = useState(0);
  const [productTotalCost, setProductTotalCost] = useState(0);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    //console.log("cartData in context ", cartData)
    // console.log("---before",localStorage.getItem("cart_product_data_id"))
    if (localStorage.getItem("cart_product_data_id") == null) {
      const cartItemDateId = Date.now().toString();
      localStorage.setItem("cart_product_data_id", cartItemDateId);
    }
    //   console.log("---after",localStorage.getItem("cart_product_data_id"))

    // localStorage.setItem("cart_product_data", JSON.stringify(cartData));
    if (isUpdated) {
      localStorage.setItem("cart_product_data", JSON.stringify(cartData));
    } else {
      const cart_data_localstorage: any =
        localStorage.getItem("cart_product_data");

      const data = JSON.parse(cart_data_localstorage);
      setCartData([]);
      if (data) {
        data.map((item: ProductType) => {
          setCartData((prevState) => {
            return [...prevState, { ...item }];
          });
        });
      }
    }
    setIsUpdated(false);
    cartTotal();
    //console.log("useEffe 0", cartData)
  }, [cartData]);

  useEffect(() => {
    // const cartItems = localStorage.getItem("cartItems");
    // if (cartItems) {
    // setCartData(JSON.parse(cartData));
    // }
    const cart_data_localstorage: any =
      localStorage.getItem("cart_product_data");

    const data = JSON.parse(cart_data_localstorage);
    setCartData([]);

    if (data) {
      data.map((item: ProductType) => {
        setCartData((prevState) => {
          return [...prevState, { ...item }];
        });
      });
    }

    setIsUpdated(false);
    cartTotal();
  }, []);

  function cartTotal() {
    var total = 0;
    if (cartData.length > 0) {
      cartData.forEach((element) => {
        total =
          total +
          parseInt(element.quantity) * parseFloat(element.price).toFixed(2);
      });
    }

    setProductTotalCost(total);
    setIsUpdated(true);
  }

  function addProductToCart(newProduct: ProductType) {
    const isItemInCart = cartData.find(
      (cartItem) => cartItem.id === newProduct.id
    ); // check if the item is already in the cart

    if (isItemInCart) {
      setCartData(
        cartData.map(
          (
            cartItem // if the item is already in the cart, increase the quantity of the item
          ) =>
            cartItem.id === newProduct.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem // otherwise, return the cart item
        )
      );
    } else {
      setCartData([
        ...cartData,
        {
          ...newProduct,
          quantity: 1,
          purchaseSession: localStorage.getItem("cart_product_data_id"),
          status: "draft",
        },
      ]); // if the item is not in the cart, add the item to the cart
    }

    // setIsUpdated(true);
  }

  function decCartProduct(decProduct: ProductType) {
    //this funciton dec product almost to 1
    setCartData(
      cartData.map((item: ProductType) => {
        return item.id === decProduct.id
          ? item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
          : item;
      })
    );
    setIsUpdated(true);
  }
  function decCartProductAll(decProduct: ProductType) {
    //this funciton dec product almost to 0
    //removeCartProduct
    setCartData(
      cartData.map((item: ProductType) => {
        return item.id === decProduct.id
          ? item.quantity > 0
            ? { ...item, quantity: item.quantity - 1 }
            : item
          : item;
      })
    );
    setIsUpdated(true);
  }

  function removeCartProduct(item: ProductType) {
    const isItemInCart = cartData.find((cartItem) => cartItem.id === item.id);
    console.log("item qu-- ", isItemInCart.quantity);
    if (isItemInCart.quantity <= 1) {
      setCartData(cartData.filter((cartItem) => cartItem.id !== item.id)); // if the quantity of the item is 1, remove the item from the cart
    } else {
      setCartData(
        cartData.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 } // if the quantity of the item is greater than 1, decrease the quantity of the item
            : cartItem
        )
      );
    }

    // setCartData(
    //   cartData.filter((item: ProductType) => {
    //     return item.productId !== remProduct.productId;
    //   })
    // );

    setIsUpdated(true);
  }

  function emptyCart() {
    setCartData([]);

    setIsUpdated(true);
  }
  function addProduct(newProduct) {
    // console.log("new add product", newProduct)
    // const product = {
    //   id:"kljljl",
    //   name:"test"
    // }
    //     setCartData((prev)=>{
    //       console.log(prev, product)
    //       return [...prev, product]
    //     })

    const isItemInCart = cartData.find(
      (cartItem) => cartItem.id === newProduct.id
    ); // check if the item is already in the cart

    if (isItemInCart) {
      setCartData(
        cartData.map(
          (
            cartItem // if the item is already in the cart, increase the quantity of the item
          ) =>
            cartItem.id === newProduct.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem // otherwise, return the cart item
        )
      );
    } else {
      setCartData([
        ...cartData,
        {
          ...newProduct,
          quantity: 1,
          purchaseSession: localStorage.getItem("cart_product_data_id"),
          status: "draft",
        },
      ]); // if the item is not in the cart, add the item to the cart
    }
  }
  const getCartTotal = () => {
    return cartData.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ); // calculate the total price of the items in the cart
  };

  function addAddress(address) {
    localStorage.setItem("customer_address", JSON.stringify(address));
  }
  function getAddress() {
    const address = localStorage.getItem("customer_address");
    setAddress(JSON.parse(address));
  }

  return (
    <CartContext.Provider
      value={{
        cartData,
        address,
        addProduct,
        addAddress,
        getAddress,
        counter,
        productTotalCost,
        addProductToCart,
        decCartProduct,
        decCartProductAll,
        removeCartProduct,
        emptyCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
