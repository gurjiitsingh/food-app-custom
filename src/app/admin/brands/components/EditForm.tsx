'use client'
import React, { useEffect } from 'react'
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editBrandSchema, TeditBrandSchema } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSearchParams, useRouter } from 'next/navigation';
import { editBrand } from '@/app/action/brads/dbOperations';
import Link from 'next/link';

const Form = () => {

    const [imageSelected, setImageSelected] = useState(null)
    const [isDisabled, setIsDisabled ] = useState(false)
    const router = useRouter();

    
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
    } = useForm<TeditBrandSchema>({
      resolver: zodResolver(editBrandSchema),
    });

    const searchParams = useSearchParams();
const id = searchParams.get('id')
const name = searchParams.get('name')
const desc = searchParams.get('desc')
const slug = searchParams.get('slug')
const imgUrl = searchParams.get('imgUrl')

    setValue('id', id);
     setValue('name', name);
     setValue('desc', desc);
     setValue('slug', slug);
     setValue('oldImgageUrl',imgUrl)
//     useEffect(()=>{
//   async function fetchCatById(){
//       if(id){
//         const result = await fetchCategoryById(id);
//       }
//     }
// fetchCatById()
//     },[])
  
 

    async function onSubmit(data: TeditBrandSchema) {
      
      console.log("onsubit in category form");
      setIsDisabled(true)
      const formData = new FormData();
      formData.append("id", data.id);
      formData.append("name", data.name);
      formData.append("desc", data.desc);
      formData.append("slug", data.slug);
      formData.append("image", data.image[0]);
      formData.append("oldImgageUrl",data.oldImgageUrl)
      //  console.log(formData.get('checkbox'));
    
      const result = await editBrand(formData);
     
        
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
      router.push('/admin/brands')
      //router.refresh()
      
   //   console.log(result);
    }
  


  return (<div className='flex flex-col'>
     <div className='flex items-center justify-between'>
    <h2 className='text-5 text-slate-600 font-semibold py-3'> Edit Brand</h2>
<Link className='bg-slate-300 rounded-lg px-2 py-0  text-[.8rem] decoration-black' href={{pathname:'/admin/categories'}} >Add new </Link>
    </div>
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className="flex w-full flex-col gap-2  my-15 ">
       <input {...register("id")} hidden />
       <input {...register("oldImgageUrl")}  />
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
        {imageSelected ?
         (
          <img className="h-[120px] m-auto " src={URL.createObjectURL(imageSelected)} />
        )
      :
      (
        <img className="h-[120px] m-auto " src={imgUrl} />
      )
      }
      </div>

      <Button className="bg-slate-100 "  type="submit">Update</Button>
    </div>
  </form>
 </div>
  )
}

export default Form