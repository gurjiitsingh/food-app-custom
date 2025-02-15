"use client";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form"; //, Controller
import { zodResolver } from "@hookform/resolvers/zod";
import { addressResT, addressSchimaCheckout,  TaddressSchemaCheckout } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useState } from "react";
//import { useSearchParams } from "next/navigation";
import {
  searchAddressEmail,
  searchAddressByUserId,
} from "@/app/action/address/dbOperations";
import { useRouter } from "next/navigation";
// import { resolve } from "path";
 import { useSession } from "next-auth/react";
import CartContext from "@/store/CartContext";
import { searchUserById } from "@/app/action/user/dbOperation";
import { createNewOrder } from "@/app/action/orders/dbOperations";
import { purchaseDataT } from "@/lib/types/cartDataType";

const Address = () => {
  const { cartData } = useContext(CartContext);
  const { data: session } = useSession();
  const [addressFound, setAddressFound] = useState(false);
  const router = useRouter();


  useEffect(()=>{
async function getAddressByID(){
  if(session?.user?.id !== undefined){
 
    const custAddressRes = (await searchAddressByUserId(session?.user.id)) || {};
   // console.log("custAddressRes --- fetched ",custAddressRes);
   //    console.log("custAddressRes --- fetched ",custAddressRes.email);
    let setemail;
     if (custAddressRes.email !== undefined) {
    
      setAddressFound(true)
     
       setAddress(custAddressRes,setemail=true)
     }else{
      const custAddressResById = await searchUserById(session?.user?.id);
      if(custAddressResById !== undefined) {
    //     if(setemail)setValue("email", addressRes.email);
    // setValue("firstName", addressRes.firstName);
    // setValue("lastName", addressRes.lastName);
    // // setValue("userId", addressRes.userId);
    // // setValue("email", addressRes.email);
    // setValue("mobNo", addressRes.mobNo);
    // setValue("addressLine1", addressRes.addressLine1);
    // setValue("addressLine2", addressRes.addressLine2);
    // setValue("city", addressRes.city);
    // setValue("state", addressRes.state);
    // setValue("zipCode", addressRes.zipCode);
      }
     }
   
  }
}
getAddressByID();
  },[session])


  async function handleEmailChange(e: React.ChangeEvent<HTMLInputElement >) {
    const inputEmail:string = e.target.value;
    let addressRes = null;
    if (!addressFound) {
      if (inputEmail.length > 7) {
        addressRes = await searchAddressEmail(inputEmail);
        //  console.log(addressRes);
        if (addressRes !== null) {
          let setemail = false;
          setAddress(addressRes, setemail=false)
        }
      }
    }

    // console.log("address res", addressRes);
  }
  

  const {
    register,
    formState: { errors }, //, isSubmitting
    handleSubmit,
    // reset,
    setValue,
    // getValues,
    // setError,
  } = useForm<TaddressSchemaCheckout>({
    resolver: zodResolver(addressSchimaCheckout),
  });

 
  async function onSubmit(data: TaddressSchemaCheckout) {
    const formData = new FormData();
    
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("userId", data.userId!);
    formData.append("email", data.email);
    formData.append("mobNo", data.mobNo);
    formData.append("password", data.password!);
    formData.append("addressLine1", data.addressLine1!);
    formData.append("addressLine2", data.addressLine2!);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("zipCode", data.zipCode);

    const customAddress = {
      firstName: data.firstName,
      lastName: data.lastName,
      userId:data.userId,
      email: data.email,
      mobNo: data.mobNo,
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,
    };
    if (typeof window !== 'undefined') {
    localStorage.setItem("customer_address", JSON.stringify(customAddress));
    }
    //await addCustomerAddress(formData);
 
    const purchaseData = {
      userId: session?.user?.id,
     cartData,
     address:customAddress,
    } as purchaseDataT;
    if (cartData.length !== 0) {
      await createNewOrder(purchaseData);
    }
    router.push("/pay");
  }

  setValue("userId", session?.user?.id);
  //setValue("email", "g@mail.com");
  // setValue("firstName", "Gurjit");
  // setValue("lastName", "Singh");
  // setValue("mobNo", "9838883323");
  // setValue("addressLine1", "345 street House 34");
  // setValue("addressLine1", "Vill Tandi Aulakh");
  // setValue("city", "Jal");
  // setValue("state", "Punjab");
  // setValue("zipCode", "144621");
  //setValue("orderDetail", cartData);





function setAddress(addressRes:addressResT, setemail:boolean){
  //console.log("inside set address ---", setemail,addressRes)
    setAddressFound(true);
    if(setemail)setValue("email", addressRes.email);
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

  return (
    <div className="w-full md:w-[400px]">
      <div className="flex flex-col">
        <div className="flex flex-col gap-2 mb-4">
          <h2 className="text-5 text-slate-600 font-semibold py-3">
            Shipping address -- {session?.user?.id} --- {session?.user?.name}
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

            <div className="flex flex-col gap-1">
              <label className="label-style">
                Password.<span className="text-red-500">Optional</span>{" "}
              </label>
              <input {...register("password")} className="input-style" />
              <span className="text-[0.8rem] font-medium text-destructive">
                {errors.password?.message && (
                  <span>{errors.password?.message}</span>
                )}
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

export default Address;

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



// type Terror = {
  //   name: string | null;
  //   price: string | null;
  //   featured: string | null;
  //   company: string | null;
  //   productCat: string | null;
  //   productDesc: string | null;
  //   image: string | null;
  // };