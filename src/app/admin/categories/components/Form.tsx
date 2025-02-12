'use client'
import React from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema, TcategorySchema } from "@/lib/types";
//import { addNewCategory } from "@/app/action/category/dbOperations";
import { Button } from "@/components/ui/button";
import { useState } from "react";
//import { useRouter } from 'next/navigation';
const Form = () => {

    const [imageSelected, setImageSelected] = useState(null);
   // const [isDisabled, setIsDisabled ] = useState(false)
   //const router = useRouter()
  
    type Terror = {
      name: string | null;
      price: string | null;
      featured: string | null;
      company: string | null;
      productCat: string | null;
      productDesc: string | null;
      image: string | null;
    };
  
    const {
      register,
      formState: { errors },
      handleSubmit,
      //reset,
      setValue,
      //getValues,
      setError,
    } = useForm<TcategorySchema>({
      resolver: zodResolver(categorySchema),
    });
   // const { isSubmitting } = formState;
    async function onSubmit(data: TcategorySchema) {
      
     
      //setIsDisabled(true)
      const formData = new FormData();
  
      formData.append("name", data.name);
      formData.append("productDesc", data.productDesc);
      formData.append("slug", data.slug!);
      formData.append("image", data.image[0]);
      //  console.log(formData.get('checkbox'));
  
     // const result = await addNewCategory(formData);
      //const result = JSON.parse(res)
  
      // if (result.errors) {
      //   // not network error but data validation error
      //   const errors: Terror = result.errors;
  
      //   if (errors.name) {
      //     setError("name", {
      //       type: "server",
      //       message: errors.name,
      //     });
      //   } else if (errors.productDesc) {
      //     setError("productDesc", {
      //       type: "server",
      //       message: errors.productDesc,
      //     });
      //   } else if (errors.slug) {
      //     setError("slug", {
      //       type: "server",
      //       message: errors.slug,
      //     });
      //   } else {
      //     //  alert("Something went wrong");
      //   }
      // }
      //setIsDisabled(false)
      
      setValue('name', "");
      setValue('productDesc', "");
      setValue('slug', "");
      //router.push('/admin/categories')
      //router.refresh()
      //location.reload()
     
    }
  


  return (<div className='flex flex-col'>
    <div className='flex'>
    <h2 className='text-5 text-slate-600 font-semibold py-3'>Create Category</h2>

    </div>
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className="flex w-full flex-col gap-2  my-15 ">
      {/* register your input into the hook by invoking the "register" function */}
      <div className="flex flex-col gap-1 w-full">
        <label className="label-style">Name<span className="text-red-500">*</span>{" "}</label>
        <input {...register("name")} className="input-style" />
        <span className="text-[0.8rem] font-medium text-destructive">
          {errors.name?.message && <span>{errors.name?.message}</span>}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <label className="label-style">Description<span className="text-red-500">*</span>{" "}</label>
        <input {...register("productDesc")} className="input-style" />
        <span className="text-[0.8rem] font-medium text-destructive">
          {errors.productDesc?.message && <span>{errors.productDesc?.message}</span>}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <label className="label-style">Slug</label>
        <input {...register("slug")} className="input-style" />
        <span className="text-[0.8rem] font-medium text-destructive">
          {errors.slug?.message && <span>{errors.slug?.message}</span>}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <label className="label-style">Image<span className="text-red-500">*</span>{" "}</label>
        <input
          {...register("image", {
            required: true,
            onChange: (e) => {
              setImageSelected(e.target.files[0]);
            },
           
          })}
          type="file"
          className="input-image-style "
        />
        <span className="text-[0.8rem] font-medium text-destructive">
          {errors.image && <span>Select product image</span>}
        </span>
      </div>
      <div className="w-full h-[120px] my-5 p-1">
        {imageSelected && (
          <img className="h-[120px] m-auto " src={URL.createObjectURL(imageSelected)} />
        )}
      </div>

      <Button className="bg-slate-100 "  type="submit">Add </Button>
    </div>
  </form>
 </div>
  )
}

export default Form