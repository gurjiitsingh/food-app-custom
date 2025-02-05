"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressSchima, TaddressSchema } from "@/lib/types";
import { Button } from "@/components/ui/button";


import { addNewAddress } from "@/app/action/address/dbOperations";

//import { resolve } from "path";
import { useSession } from "next-auth/react";

const Form = () => {
  const { data: session } = useSession();

  //const [imageSelected, setImageSelected] = useState(null);
  //const [isDisabled, setIsDisabled] = useState(false);
  //const searchParams = useSearchParams();
  //const router = useRouter();
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
   // setError,
  } = useForm<TaddressSchema>({
    resolver: zodResolver(addressSchima),
  });

  setValue("userId", session?.user?.id);

  async function onSubmit(data: TaddressSchema) {
    console.log("onsubit in address form ",data.userId, data.addressLine1,data.addressLine2,data.zipCode);
    //     setIsDisabled(true)
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("userId", data.userId);
    formData.append("mobNo", data.mobNo);
    formData.append("addressLine1", data.addressLine1);
    formData.append("addressLine2", data.addressLine2);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("zipCode", data.zipCode);

   

    await addNewAddress(formData);

    //const result = JSON.parse(res)

    // if (result.errors) {
    //   // not network error but data validation error
    //   const errors: Terror = result.errors;

    //   if (errors.name) {
    //     setError("name", {
    //       type: "server",
    //       message: errors.name,
    //     });
    //   } else if (errors.addressline1) {
    //     setError("addressline1", {
    //       type: "server",
    //       message: errors.addressline1,
    //     });
    //   } else {
    //     //  alert("Something went wrong");
    //   }
    // }
    //     setIsDisabled(false)

    //   setValue('userId', session?.user?.id);
    // setValue('desc', "");
    // setValue('slug', "");

    // router.push('/admin/brands')
    // router.refresh()
    //  location.reload()
    //   console.log(result);
  }

  return (
    <div className="flex flex-col">
      <div className="flex">
        <h2 className="text-5 text-slate-600 font-semibold py-3">
          Create Address
        </h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("userId")} hidden />

        <div className="flex w-full flex-col gap-2  my-15 ">
          <div className="flex flex-col gap-1 w-full">
            <label className="label-style">
              Name<span className="text-red-500">*</span>{" "}
            </label>
            <input {...register("name")} className="input-style" />
            <span className="text-[0.8rem] font-medium text-destructive">
              {errors.name?.message && <span>{errors.name?.message}</span>}
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

          


<div className="flex flex-col gap-1 w-full">
            <label className="label-style">
            addressline1<span className="text-red-500">*</span>{" "}
            </label>
            <input {...register("addressLine1")} className="input-style" />
            <span className="text-[0.8rem] font-medium text-destructive">
              {errors.name?.message && <span>{errors.name?.message}</span>}
            </span>
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label className="label-style">
            Address Line 1<span className="text-red-500">*</span>{" "}
            </label>
            <input {...register("addressLine2")} className="input-style" />
            <span className="text-[0.8rem] font-medium text-destructive">
              {errors.name?.message && <span>{errors.name?.message}</span>}
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
            Add
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Form;
