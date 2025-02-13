"use server";
import {
  newPorductSchema,
  editPorductSchema,
  TnewProductSchema,
  ShowPorductT,
} from "@/lib/types";

//import { z } from "zod";
import { deleteImage, upload } from "@/lib/cloudinary";
import { db } from "@/lib/firebaseConfig";
//import { product } from "@/--------db/schema";
// import { Weight } from "lucide-react";
// import { revalidatePath } from "next/cache";

import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
} from "@firebase/firestore"; //doc, getDoc,
//import { orderProductsTArr } from "@/lib/type/orderType";
//import {  productTArr,  TnewProductSchemaArr } from "@/lib/type/productType";
import { orderProductsTArr } from "@/lib/types/orderType";
import {
  productT,
  productTArr,
  ProductType,
  ProductTypeArr,
  TnewProductSchemaArr,
} from "@/lib/types/productType";
import { cartDataT } from "@/lib/types/cartDataType";
import { Result } from "postcss";
//productT,productTs, productTsArr, TproductSchemaArr

//from "@/lib/firestore/products/write";

export async function addNewProduct(formData: FormData) {
  let featured_img: boolean = false;
  console.log(formData.get("name"));
  console.log(formData.get("price"));
  //console.log(formData.get("brand"));
  // console.log(formData.get("weight"));
  // console.log(formData.get("dimensions"));
  console.log(formData.get("productCat"));
  console.log(formData.get("productDesc"));
  console.log(formData.get("image"));
  console.log(formData.get("isFeatured"));

  if (formData.get("isFeatured") === "ture") featured_img = true;

  //console.log("isFeatured ", typeof formData.get("isFeatured"));

  const receivedData = {
    name: formData.get("name"),
    price: formData.get("price"),
    // brand: formData.get("brand"),
    // weight: formData.get("weight"),
    // dimensions: formData.get("dimensions"),
    productCat: formData.get("productCat"),
    productDesc: formData.get("productDesc"),
    image: formData.get("image"),
    isFeatured: featured_img,
  };

  const result = newPorductSchema.safeParse(receivedData);

  let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });

    return Object.keys(zodErrors).length > 0
      ? { errors: zodErrors }
      : { success: true };
  }

  const image = formData.get("image");
  let imageUrl;
  try {
    imageUrl = await upload(image);
    console.log(imageUrl);
  } catch (error) {
    throw new Error("error");
    console.log(error);
    return { errors: "image cannot uploaded" };
  }

  // const name = formData.get("name");
  // const price = formData.get("price");
  // const productCat = formData.get("productCat");
  // const productDesc = formData.get("productDesc");
  // const featured = formData.get("isFeatured");
  const data = {
    name: formData.get("name"),
    price: formData.get("price"),
    category: formData.get("productCat"),
    Desc: formData.get("productDesc"),
    image: imageUrl,
    isFeatured: featured_img,
  };

  try {
    const docRef = await addDoc(collection(db, "product"), data);
    console.log("Document written with ID: ", docRef.id);
    // Clear the form
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  return { message: "Product saved" };
}
type rt = {
  errors:string;
}
export async function deleteProduct(id: string, oldImgageUrl: string):Promise<rt> {

console.log("out put ", id, oldImgageUrl)
  return {"errors":"Delete not implimented jet"};
}

// export async function deleteProduct(id:string, oldImgageUrl:string) {

//   const result = await db.delete(product).where(eq(product.id, id));

//   if (result?.rowCount === 1) {

//     const imageUrlArray = oldImgageUrl.split("/");
//     console.log(imageUrlArray[imageUrlArray.length - 1]);
//     const imageName =
//       imageUrlArray[imageUrlArray.length - 2] +
//       "/" +
//       imageUrlArray[imageUrlArray.length - 1];

//     const image_public_id = imageName.split(".")[0];
//     console.log(image_public_id);
//     try {
//       let deleteResult = await deleteImage(image_public_id);
//       console.log("image delete data", deleteResult);
//     } catch (error) {
//      // console.log(error);
//       return {errors:"Somthing went wrong, can not delete product picture"}
//     }

//        return {
//       message: { sucess: "Deleted product" },
//     };
//   }else{
//     return {errors:"Somthing went wrong, can not delete product"}
//   }

// }

export async function editProduct(formData: FormData) {
  const id = formData.get("id") as string;
  const image = formData.get("image");
  const oldImgageUrl = formData.get("oldImgageUrl") as string;
  const featured_img: boolean = false;
 // featured_img = formData.get("oldImgageUrl");

  const receivedData = {
    name: formData.get("name"),
    price: formData.get("price"),
    productCat: formData.get("productCat"),
    productDesc: formData.get("productDesc"),
    image: formData.get("image"),
    isFeatured: featured_img,
  };

  const result = editPorductSchema.safeParse(receivedData);

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
  if (image === "undefined" || image === null) {
    imageUrl = oldImgageUrl;
  //  console.log("----------------not change image")
  } else {
  //  console.log("---------------- change image")
    try {
      imageUrl = (await upload(image)) as string;
      console.log(imageUrl);
    } catch (error) {
      //  throw new Error("error")
      console.log(error);
      return { errors: "image cannot uploaded" };
    }
    const d = false;
    if (d) {
      const imageUrlArray = oldImgageUrl?.split("/");
      console.log("old image url", imageUrlArray);
      const imageName =
        imageUrlArray[imageUrlArray.length - 2] +
        "/" +
        imageUrlArray[imageUrlArray.length - 1];

      const image_public_id = imageName.split(".")[0];
      console.log("image_public_id ---", image_public_id);
      try {
        const deleteResult = await deleteImage(image_public_id);
        console.log(deleteResult);
      } catch (error) {
        console.log(error);
      }
    }
  }
  
  const productUpdtedData = {
    name: formData.get("name"),
    price: formData.get("price"),
    productCat: formData.get("productCat"),
    productDesc: formData.get("productDesc"),
    image: imageUrl,
    isFeatured: featured_img,
  };
  //console.log("update data ------------", productUpdtedData)
  // update database
  try {
    const docRef = doc(db,"product", id);
   await setDoc(docRef, productUpdtedData);

  } catch (error) {
    console.log("error", error);
    return { errors: "Cannot update" };
  }
}

export async function fetchProducts(): Promise<cartDataT[]> {
  // const result = await getDocs(collection(db, "product"))
  // let data = [];
  // result.forEach((doc) => {
  //   data.push({id:doc.id, ...doc.data()});
  // });
  //  return data;

  const result = await getDocs(collection(db, "product"));
  let data = [] as cartDataT[];
  result.forEach((doc) => {
    const pData = { id: doc.id, ...doc.data() } as cartDataT;
    data.push(pData);
  });
  return data;
  // let data = [] as cartDataT[];
  //   const q = query(collection(db, "product"));
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     const ab = doc.data() as cartDataT;
  //     data.push(ab);
  //   });
  //   return data;
}

export async function fetchProductById(id: string): Promise<ProductType> {
  const docRef = doc(db, "product", id);
  const docSnap = await getDoc(docRef);
  let productData = {} as ProductType;
  if (docSnap.exists()) {
    //  console.log("Document data:", docSnap.data());
  } else {
    //   docSnap.data() //will be undefined in this case
    //  console.log("No such document!");
  }
  productData = docSnap.data() as ProductType;
  return productData;
  // const docRef = doc(db, "product", id);
  // const docSnap = await getDoc(docRef);
  //  return docSnap.data();

  //  let data = [] as ProductType[];
  //   const q = query(collection(db, "product", id));
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     data = doc.data() as ProductTypeArr;
  //   });
  //   return data;
}




 //console.log("Foorm data ---------",formData.get("oldImgageUrl"));
  // console.log(formData.get("price"));
  // console.log(formData.get("productCat"));
  // console.log(formData.get("productDesc"));
  // console.log(formData.get("image"));
  // console.log("is featured =======",formData.get("isFeatured"));
  // featured_img = formData.get("isFeatured");
  // if (formData.get("isFeatured").toString() === "true") {
  //   featured_img = true;
  // }