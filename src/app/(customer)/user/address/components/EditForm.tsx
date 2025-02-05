"use client";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressSchimaCheckout, TaddressSchemaCheckout } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  addCustomerAddress,
  cartProducts,
  searchAddress,
} from "@/app/action/checkout/dbOperations";
import { useRouter } from "next/navigation";
// import { resolve } from "path";
// import { useSession } from "next-auth/react";
import CartContext from "@/store/CartContext";

const Form = () => {
  const { cartData } = useContext(CartContext);
  useEffect(() => {
    async function saveProductListDraft() {
      //console.log(cartData.length);
      if (cartData.length !== 0) {
        await cartProducts(cartData);
      }
    }

    saveProductListDraft();
  }, [cartData]);

  // const { data: session } = useSession();
  //const [imageSelected, setImageSelected] = useState(null);
  //const [isDisabled, setIsDisabled] = useState(false);
  const [addressFound, setAddressFound] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  //const id = searchParams?.get("id") || null;

  // type Terror = {
  //   name: string | null;
  //   price: string | null;
  //   featured: string | null;
  //   company: string | null;
  //   productCat: string | null;
  //   productDesc: string | null;
  //   image: string | null;
  // };

  const {
    register,
    formState: { errors },//, isSubmitting
    handleSubmit,
   // reset,
    setValue,
   // getValues,
  //  setError,
  } = useForm<TaddressSchemaCheckout>({
    resolver: zodResolver(addressSchimaCheckout),
  });

  //setValue("userId", session?.user?.id);

  async function onSubmit(data: TaddressSchemaCheckout) {

    // console.log(
    //   "Form Data",
    //   data.email,
    //   data.mobNo,
    //   data.firstName,
    //   data.lastName,
    //   data.userId,
    //   data.addressLine1,
    //   data.addressLine2,
    //   data.city,
    //   data.state,
    //   data.zipCode
    // );
    //     setIsDisabled(true)
    const formData = new FormData();

    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("userId", data.userId);
    formData.append("email", data.email);
    formData.append("mobNo", data.mobNo);
    formData.append("addressLine1", data.addressLine1);
    formData.append("addressLine2", data.addressLine2);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("zipCode", data.zipCode);
    
const customAddress = {
"firstName": data.firstName,
    "lastName": data.lastName,
    "email": data.email,
    "mobNo": data.mobNo,
    "addressLine1": data.addressLine1,
    "addressLine2": data.addressLine2,
    "city": data.city,
    "state": data.state,
    "zipCode": data.zipCode,
}
    localStorage.setItem("customer_address", JSON.stringify(customAddress));
    await addCustomerAddress(formData);
    router.push("/pay")
  }

  // setValue("firstName", "Gurjit");
  // setValue("lastName", "Singh");
  // //setValue("email", "g@mail.com");
  // setValue("mobNo", "9838883323");
  // setValue("addressLine1", "345 street House 34");
  // setValue("addressLine1", "Vill Tandi Aulakh");
  // setValue("city", "Jal");
  // setValue("state", "Punjab");
  // setValue("zipCode", "144621");
  //setValue("orderDetail", cartData);

  async function handleEmailChange(e) {
    let inputEmail = e.target.value;
    let addressRes = null;
    if (!addressFound) {
   
        if (inputEmail.length > 7) {
          
    addressRes =   await  searchAddress(inputEmail) || {};
  //  console.log(addressRes);
  if(addressRes !== null){
  setValue("firstName", addressRes.firstName);
  setValue("lastName", addressRes.lastName);
 // setValue("userId", addressRes.userId);
 // setValue("email", addressRes.email);
  setValue("mobNo", addressRes.mobNo);
  setValue("addressLine1", addressRes.addressLine1);
  setValue("addressLine2", addressRes.addressLine2);
  setValue("city", addressRes.city);
  setValue("state", addressRes.state);
  setValue("zipCode", addressRes.zipCode);
  }
        }
    
    }

    console.log("address res",addressRes);
  }

  return (
    <div className="w-full md:w-[400px]">
      <div className="flex flex-col">
        <div className="flex flex-col gap-2 mb-4">
          <h2 className="text-5 text-slate-600 font-semibold py-3">
            Shipping address
          </h2>
          <p className="text-sm">
            Enter the address where you want your order delivered.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("userId")} hidden />
          {/* <input {...register("orderDetail")} hidden /> */}
          <div className="flex w-full flex-col gap-2  my-15 ">
          
            <div className="flex flex-col gap-1">
              <label className="label-style">
                Email<span className="text-red-500">*</span>{" "}
              </label>
              <input
                {...register("email", {
                  onChange: (e) => {
                    handleEmailChange(e);
                  },
                })}
                className="input-style"
              />
              <span className="text-[0.8rem] font-medium text-destructive">
                {errors.email?.message && <span>{errors.email?.message}</span>}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <label className="label-style">
                Mob no.<span className="text-red-500">*</span>{" "}
              </label>
              <input {...register("mobNo")} className="input-style" />
              <span className="text-[0.8rem] font-medium text-destructive">
                {errors.mobNo?.message && <span>{errors.mobNo?.message}</span>}
              </span>
            </div>

            <div className="w-full flex flex-row gap-2">
              <div className="flex flex-col gap-1">
                <label className="label-style">
                  First name<span className="text-red-500">*</span>{" "}
                </label>
                <input {...register("firstName")} className="input-style" />
                <span className="text-[0.8rem] font-medium text-destructive">
                  {errors.firstName?.message && (
                    <span>{errors.firstName?.message}</span>
                  )}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <label className="label-style">
                  Last name<span className="text-red-500">*</span>{" "}
                </label>
                <input {...register("lastName")} className="input-style" />
                <span className="text-[0.8rem] font-medium text-destructive">
                  {errors.lastName?.message && (
                    <span>{errors.lastName?.message}</span>
                  )}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label className="label-style">
                Address line 1<span className="text-red-500">*</span>{" "}
              </label>
              <input {...register("addressLine1")} className="input-style" />
              <span className="text-[0.8rem] font-medium text-destructive">
                {errors.addressLine1?.message && (
                  <span>{errors.addressLine1?.message}</span>
                )}
              </span>
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label className="label-style">
                Address line 2<span className="text-red-500">*</span>{" "}
              </label>
              <input {...register("addressLine2")} className="input-style" />
              <span className="text-[0.8rem] font-medium text-destructive">
                {errors.addressLine2?.message && (
                  <span>{errors.addressLine2?.message}</span>
                )}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <label className="label-style">
                City<span className="text-red-500">*</span>{" "}
              </label>
              <input {...register("city")} className="input-style" />
              <span className="text-[0.8rem] font-medium text-destructive">
                {errors.city?.message && <span>{errors.city?.message}</span>}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <label className="label-style">
                State<span className="text-red-500">*</span>{" "}
              </label>
              <input {...register("state")} className="input-style" />
              <span className="text-[0.8rem] font-medium text-destructive">
                {errors.state?.message && <span>{errors.state?.message}</span>}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <label className="label-style">
                Zip<span className="text-red-500">*</span>{" "}
              </label>
              <input {...register("zipCode")} className="input-style" />
              <span className="text-[0.8rem] font-medium text-destructive">
                {errors.zipCode?.message && (
                  <span>{errors.zipCode?.message}</span>
                )}
              </span>
            </div>

            <Button className="bg-slate-100 " type="submit">
              Pay Now
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
