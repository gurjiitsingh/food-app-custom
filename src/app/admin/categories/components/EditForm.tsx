'use client'
import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editCategorySchema, TeditCategorySchema } from "@/lib/types";
//import { editCategory } from "@/app/action/category/dbOperations";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSearchParams, useRouter } from 'next/navigation';

import Link from 'next/link';

const Form = () => {
//   const {id,name,slug,desc } = useSearchParams();
//   console.log("slug in edit form ", id)
// console.log("slug in edit form ", name)
// console.log("name in edit form ", slug)
// console.log("name in edit form ", desc)
//console.log("name in edit form ", name)
const searchParams = useSearchParams();
const id = searchParams.get('id')
const name = searchParams.get('name')
const desc = searchParams.get('productDesc')
const slug = searchParams.get('slug')

    const [imageSelected, setImageSelected] = useState(null);
    const [isDisabled, setIsDisabled ] = useState(false)
   const router = useRouter();
  
    type Terror = {
      //id: string | null;
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
      setValue,
     // reset,
     // getValues,
     // setError,
    } = useForm<TeditCategorySchema>({
      resolver: zodResolver(editCategorySchema),
    });

    useEffect(() => {
     // if (userData) {
     setValue('id', id!);
     setValue('name', name!);
     setValue('productDesc', desc!);
     setValue('slug', slug!);
    //  }
  }, [id,name,desc,slug]);
   // const { isSubmitting } = formState;
    async function onSubmit(data: TeditCategorySchema) {
      
      
      setIsDisabled(true)
      const formData = new FormData();
  
      formData.append("id", data.id);
      formData.append("name", data.name);
      formData.append("productDesc", data.productDesc);
      formData.append("slug", data.slug);
      formData.append("image", data.image[0]);
      //  console.log(formData.get('checkbox'));
  
     //  const result = await editCategory(formData);
      //const result = JSON.parse(res)
    // const  result ={};
    //   if (result.errors) {
    //     // not network error but data validation error
    //     const errors: Terror = result.errors;
  
    //     if (errors.name) {
    //       setError("name", {
    //         type: "server",
    //         message: errors.name,
    //       });
    //     } else if (errors.productDesc) {
    //       setError("productDesc", {
    //         type: "server",
    //         message: errors.productDesc,
    //       });
    //     } else if (errors.slug) {
    //       setError("slug", {
    //         type: "server",
    //         message: errors.slug,
    //       });
    //     } else {
    //         alert("Something went wrong");
    //     }
    //   }
      
      setIsDisabled(false)
      router.push('/admin/categories')
      
   //   console.log(result);
    }
  
  

  return (<div className='flex flex-col'>
    
    <div className='flex items-center justify-between'>
    <h2 className='text-5 text-slate-600 font-semibold py-3'> Edit Category</h2>
<Link className='bg-slate-300 rounded-lg px-2 py-0  text-[.8rem] decoration-black' href={{pathname:'/admin/categories'}} >Add new </Link>
    </div>
    <form onSubmit={handleSubmit(onSubmit)}>
    {/* <input {...register("id",{ value: "data" })} type="hidden" /> */}
    <div className="flex w-full flex-col gap-2  my-15 ">
           <input {...register("id")} hidden  />
       
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
        <input {...register("slug")                  
        } className="input-style" />
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

      <Button className="bg-slate-100 " disabled={isDisabled} type="submit">Update </Button>
    </div>
  </form></div>
  )
}

export default Form