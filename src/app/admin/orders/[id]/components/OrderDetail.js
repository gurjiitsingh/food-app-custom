"use client";
import React, { useEffect, useState } from "react";
import { fetchOrderProductsByOrderMasterId } from "@/app/action/orders/dbOperations";
import ProductList from "./productList";
import { searchAddressByAddressId } from "@/app/action/address/dbOperations";
import { useSearchParams } from "next/navigation";
import PickUp from "./PickUp";
import ListHead from "./ListHead";
import ItemsSubtotal from "./ItemsSubtotal"
import Shipping from "./Shipping";
import OrderTotal from "./OrderTotal";
import Paid from "./Paid";

const OrderDetail = ({ id }) => {
  const searchParams = useSearchParams();
  console.log(searchParams.get("addressId"), searchParams.get("userId"));
  const addressId = searchParams.get("addressId");
  const [orderProducts, setOrderProducts] = useState([]);
  const [customerAddress, setCustomerAddress] = useState({});

  useEffect(() => {
    async function getOrderProducts() {
      const orderProductList = await fetchOrderProductsByOrderMasterId(id);
      const addressRes = await searchAddressByAddressId(addressId);

      //const orderMasterDetail = await fetchOrdersMaster();
      //  setOrderData(orderProductList)

      //  console.log("---------- order products", addressRes);
      setOrderProducts(orderProductList);
      setCustomerAddress(addressRes);
    }
    getOrderProducts();
  }, []);
  return (
    <div className="flex flex-col gap-4 bg-white px-3 flex-1 mb-12">
      <div className="py-5 px-12 border-b">
        <h1 className=" text-[1.7rem]">Order Detail</h1>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-3 justify-between">
        <div className="flex flex-col gap-2 w-full md:w-[20%] rounded-xl border p-4">
          <div className="">
            {" "}
            <div className="">Date:</div> <div className=""></div>
          </div>
          <div className="">
            {" "}
            <div className="">Status:</div> <div className=""></div>
          </div>
        </div>

        <div className="w-full md:w-[50%] flex flex-col gap-2 rounded-xl border p-4">
          <h2 className="text-2xl text-emerald-400"> Address</h2>
          <div className="">
            <div className=""></div>
            <div className="">
              {customerAddress.firstName} {customerAddress.lastName}
            </div>
          </div>
          <div className="">
            <div className=""></div>
            <div className="">{customerAddress.email}</div>
          </div>
          <div className="">
            <div className=""></div>
            <div className="">{customerAddress.mobNo}</div>
          </div>
          <div className="">
            <div className=""></div>
            <div className="">
              {customerAddress.addressLine1} {customerAddress.addressLine2}
            </div>
          </div>

          <div className="">
            <div className=""></div>
            <div className="">
              {customerAddress.city} {customerAddress.state}
            </div>
          </div>

          <div className="">
            <div className=""></div>
            <div className="">{customerAddress.zipCode}</div>
          </div>
        </div>

        <div className="flex flex-col gap-2">{/* Billing address */}</div>
      </div>
      <div>
<ListHead />
        {orderProducts.map((item) => {
          return <ProductList key={item.id} item={item} />;
        })}

<PickUp />
<ItemsSubtotal />
<Shipping />
<OrderTotal />
<Paid />
        
      </div>
    </div>
  );
};
export default OrderDetail;
