"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { categorySchema, TcategorySchema } from "@/lib/types";
import { brandSchema, TbrandSchema } from "@/lib/types";
import { editBrandSchema, TeditBrandSchema } from "@/lib/types";
import { redirect } from "next/navigation";
import { deleteImage, upload, deleteFile } from "@/lib/cloudinary";

export async function fetchbrands() {
 // const result = await db.select().from(brand);
 // return result;
}

export async function fetchCategoryById(id) {
 // const result = await db.select().from(category).where(eq(category.id, id));
 // return result;
}

export async function deleteBrand(data) {
  const { id, oldImgageUrl } = JSON.parse(data);
  const result = await db.delete(brand).where(eq(brand.id, id));

    // code to delete image
    
    const imageUrlArray = oldImgageUrl.split('/');
    console.log(imageUrlArray[imageUrlArray.length-1])
    const imageName = imageUrlArray[imageUrlArray.length-2]+"/"+imageUrlArray[imageUrlArray.length-1]
 
    const image_public_id = imageName.split('.')[0] 
    try {
      let deleteResult = await deleteImage(image_public_id);
      console.log("image delete data", deleteResult);
   } catch (error) {
    console.log(error)
   }

  revalidatePath("/admin/brand");
}

export async function addNewBrand(formData: FormData) {
  const recievedData = {
    name: formData.get("name"),
    desc: formData.get("desc"),
    slug: formData.get("slug"),
  };
  console.log(recievedData)
  const image = formData.get("image");
  
  const result = brandSchema.safeParse(recievedData);
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
    imageUrl = await upload(image);
  } catch (error) {
    return { errors: "image cannot uploaded" };
  }

  try {
    const result = await db
      .insert(brand)
      .values({
        name: formData.get("name"),
        desc: formData.get("desc"),
        slug: formData.get("slug"),
        imgUrl: imageUrl,
      })
      .returning({ id: brand.id });

    if (result?.[0].id) {
      revalidatePath("/admin/brand");

      return {
        message: { sucess: "Brand Created" },
      };
    }
  } catch (error) {
    console.log(error);
    return JSON.stringify({
      message: { error },
    });
  }
}

export async function editBrand(formData: FormData) {
  const id = formData.get("id");
  const image = formData.get("image");
  const oldImgageUrl = formData.get("oldImgageUrl");

  const recievedData = {
    id: formData.get("id"),
    name: formData.get("name"),
    desc: formData.get("desc"),
    slug: formData.get("slug"),
    image: formData.get("image"),
  };

  
  const result = editBrandSchema.safeParse(recievedData);

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
  if (image === "undefined") {
    console.log("image not detected 2");
    imageUrl = oldImgageUrl;
  } else {
    console.log("image detected 2");

    try {
      imageUrl = await upload(image);
    } catch (error) {
      //  throw new Error("error")
      return { errors: "image cannot uploaded" };
    }

    // code to delete image
    
    const imageUrlArray = oldImgageUrl.split('/');
    console.log(imageUrlArray[imageUrlArray.length-1])
    const imageName = imageUrlArray[imageUrlArray.length-2]+"/"+imageUrlArray[imageUrlArray.length-1]
 
    const image_public_id = imageName.split('.')[0] 
    try {
      let deleteResult = await deleteImage(image_public_id);
      console.log("image delete data", deleteResult);
   } catch (error) {
    console.log(error)
   }
  } // end of image replace block
    try {
      const result = await db
        .update(brand)
        //.values({ name:formData.get("name"), desc:formData.get("desc"), slug: formData.get("slug") })
        .set({
          name: formData.get("name"),
          desc: formData.get("desc"),
          slug: formData.get("slug"),
          imgUrl: imageUrl,
        })
        .where(eq(brand.id, id));

      // console.log(result)
      if (result?.rowCount === 1) {
        revalidatePath("/admin/brand");
        return {
          message: { sucess: "Updated " },
        };
      }
    } catch (error) {
      console.log(error);
      return JSON.stringify({
        message: { error },
      });
    }

    // way for return response
    // return result.status(200).json({
    //   success:true,
    //   message:"Created"
    // })


 
} // end of edit brand
