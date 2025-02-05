"use server";
import { z } from "zod";
import { categorySchema, TcategorySchema } from '@/lib/types';
import { db } from "@/lib/firebaseConfig";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { upload } from "@/lib/cloudinary";
import { addDoc, collection, getDocs } from "@firebase/firestore";


export async function fetchCategories(){
      const result = await getDocs(collection(db, "category"))
      console.log(result.docs)
      let data = [];
      result.forEach((doc) => {
        data.push({id:doc.id, ...doc.data()});
      });
   //   console.log("---- cat of data -----",data)
      return data;
}


export async function addNewCategory(formData: FormData) {
  const recievedData = {
    name: formData.get("name"),
    desc: formData.get("desc"),
    slug: formData.get("slug"),
  };
  console.log(recievedData)
  const image = formData.get("image");
  
  const result = categorySchema.safeParse(recievedData);
  console.log(result);
  let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });

    return Object.keys(zodErrors).length > 0
      ? { errors: zodErrors }
      : { success: true };
  }

 
  let imageUrl;
  try {
    console.log("INSIDE IMAGE UPLOAD-----------")
    imageUrl = await upload(image);
  } catch (error) {
    return { errors: "image cannot uploaded" };
  }

  const data = {
    name: formData.get("name"),
    desc: formData.get("desc"),
    slug: formData.get("slug"),
    imgUrl: imageUrl,
  }

     try {
        const docRef = await addDoc(collection(db, "category"), data);
        console.log("Document written with ID: ", docRef.id);
        return {
                message: { sucess: "Category Created" },
              };
        // Clear the form
    } catch (e) {
        console.error("Error adding document: ", e);
    }

  // try {
  //   const result = await db
  //     .insert(category)
  //     .values({
  //       name: formData.get("name"),
  //       desc: formData.get("desc"),
  //       slug: formData.get("slug"),
  //       imgUrl: imageUrl,
  //     })
  //     .returning({ id: category.id });

  //   if (result?.[0].id) {
  //     revalidatePath("/admin/brand");

  //     return {
  //       message: { sucess: "Category Created" },
  //     };
  //   }
  // } catch (error) {
  //   console.log(error);
  //   return JSON.stringify({
  //     message: { error },
  //   });
  // }
}



export async function onSubmitNewCategory1( formData: FormData) {
 
//   console.log("----------- category server action form-------")
// console.log(formData.get("name"))
// console.log(formData.get("desc"))
// console.log(formData.get("slug"))
// console.log(formData.get("image"))
const recievedData = {
  name:formData.get("name"),
  desc:formData.get("desc"),
  slug: formData.get("slug"),
  imgUrl: formData.get("image")
}

const result = categorySchema.safeParse(recievedData)

let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });

    return Object.keys(zodErrors).length > 0
      ? { errors: zodErrors }
      : { success: true };
  }



try {
  const result = await db.insert(category).values({
  name:formData.get("name"),
  desc:formData.get("desc"),
  slug: formData.get("slug")
  }).returning({id:category.id});
 
if(result?.[0].id){
  revalidatePath('/admin/category')
  return {
    message: {sucess:"Category Created"}
  }
}
 
} catch (error) {
  console.log(error);
  return JSON.stringify({
    message: {error}
  }) 
}

}


export async function editCategory(formData: FormData){
 
  const id = formData.get("id");
    
  const recievedData = {
    name:formData.get("name"),
    desc:formData.get("desc"),
    slug: formData.get("slug"),
  }
  
 
  const result = categorySchema.safeParse(recievedData)
  
  let zodErrors = {};
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
      });
  
      return Object.keys(zodErrors).length > 0
        ? { errors: zodErrors }
        : { success: true };
    }
  
  
  
  try {
  
   const result = await db
   .update(category)
   //.values({ name:formData.get("name"), desc:formData.get("desc"), slug: formData.get("slug") })
   .set(
    recievedData,
   ).where(eq(category.id, id));


   revalidatePath('/admin/categories')

   // console.log(result)
  if(result?.rowCount===1){
    revalidatePath('/','layout')
    return {
      message: {sucess:"Updated Created"}
    }
  }
   
  } catch (error) {
    console.log(error);
    return JSON.stringify({
      message: {error}
    }) 
  }

}



export async function editCategoryAction1(formData: FormData){
 
  const id = formData.get("id");
    
  const recievedData = {
    name:formData.get("name"),
    desc:formData.get("desc"),
    slug: formData.get("slug"),
  }
  
 
  const result = categorySchema.safeParse(recievedData)
  
  let zodErrors = {};
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
      });
  
      return Object.keys(zodErrors).length > 0
        ? { errors: zodErrors }
        : { success: true };
    }
  
  
  
  try {
  
   const result = await db
   .update(category)
   //.values({ name:formData.get("name"), desc:formData.get("desc"), slug: formData.get("slug") })
   .set(
    recievedData,
   ).where(eq(category.id, id));


   revalidatePath('/admin/categories')

   // console.log(result)
  if(result?.rowCount===1){
    revalidatePath('/','layout')
    return {
      message: {sucess:"Updated Created"}
    }
  }
   
  } catch (error) {
    console.log(error);
    return JSON.stringify({
      message: {error}
    }) 
  }

}


export async  function deleteCategory(catId){
  const { id } = JSON.parse(catId)
console.log("jlkjlll================8", id)

const result = await db.delete(category).where(eq(category.id, id))
revalidatePath('/admin/categories')
}