'use client'
import React, { useEffect } from 'react'
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { brandSchema, TbrandSchema } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSearchParams } from 'next/navigation';
import { addNewBrand, editBrand } from '@/app/action/brads/dbOperations';
import { useRouter } from 'next/navigation';

const Form = () => {

    const [imageSelected, setImageSelected] = useState(null)
    const [isDisabled, setIsDisabled ] = useState(false)
    const searchParams = useSearchParams()
const router = useRouter();
    const id = searchParams?.get("id") || null;

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
      formState: { errors, isSubmitting },
      handleSubmit,
      reset,
      setValue,
      getValues,
      setError,
    } = useForm<TbrandSchema>({
      resolver: zodResolver(brandSchema),
    });

      async function onSubmit(data: TbrandSchema) {
      
      console.log("onsubit in brand form");
      setIsDisabled(true)
      const formData = new FormData();
  
      formData.append("name", data.name);
      formData.append("desc", data.desc);
      formData.append("slug", data.slug);
      formData.append("image", data.image[0]);
      //  console.log(formData.get('checkbox'));
  let result;
      if(id){
        result = await editBrand(formData);
      }else{
       
      result = await addNewBrand(formData);
      }
      //const result = JSON.parse(res)
  
      if (result.errors) {
        // not network error but data validation error
        const errors: Terror = result.errors;
  
        if (errors.name) {
          setError("name", {
            type: "server",
            message: errors.name,
          });
        } else if (errors.desc) {
          setError("desc", {
            type: "server",
            message: errors.desc,
          });
        } else if (errors.slug) {
          setError("slug", {
            type: "server",
            message: errors.slug,
          });
        } else {
          //  alert("Something went wrong");
        }
      }
      setIsDisabled(false)

      
      setValue('name', "");
      setValue('desc', "");
      setValue('slug', "");
      
      // router.push('/admin/brands')
      // router.refresh()
    //  location.reload()
   //   console.log(result);
    }
  


  return (<div className='flex flex-col'>
    <div className='flex'>
    <h2 className='text-5 text-slate-600 font-semibold py-3'>Create Brand</h2>

    </div>
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className="flex w-full flex-col gap-2  my-15 ">
        <div className="flex flex-col gap-1 w-full">
        <label className="label-style">Name<span className="text-red-500">*</span>{" "}</label>
        <input {...register("name")} className="input-style" />
        <span className="text-[0.8rem] font-medium text-destructive">
          {errors.name?.message && <span>{errors.name?.message}</span>}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <label className="label-style">Description<span className="text-red-500">*</span>{" "}</label>
        <input {...register("desc")} className="input-style" />
        <span className="text-[0.8rem] font-medium text-destructive">
          {errors.desc?.message && <span>{errors.desc?.message}</span>}
        </span>
      </div>

      {/* <div className="flex flex-col gap-1">
        <label className="label-style">Slug</label>
        <input {...register("slug")} className="input-style" />
        <span className="text-[0.8rem] font-medium text-destructive">
          {errors.slug?.message && <span>{errors.slug?.message}</span>}
        </span>
      </div> */}

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
          {errors.image && <span>Select brand image</span>}
        </span>
      </div>
      <div className="w-full h-[120px] my-5 p-1">
        {imageSelected && (
          <img className="h-[120px] m-auto " src={URL.createObjectURL(imageSelected)} />
        )}
      </div>

      <Button className="bg-slate-100 "  type="submit">Add</Button>
    </div>
  </form>
 </div>
  )
}

export default Form