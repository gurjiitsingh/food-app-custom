import { z } from "../../node_modules/zod";

const productSchema = z.object({
  // id: z.number().optional(),
  name: z
    .string()
    .trim()
    .min(2, { message: "Product name is very short" })
    .max(30, { message: "Product name is very long" }),
  price: z
    .string()
    .refine((value) => /^\d+$/.test(value), "Invalid product price"), // Refinement
  productCat: z.string().min(1, { message: "Please select category" }),

  productDesc: z.string().min(1, { message: "Please select category" }),
  company: z.string().min(1, { message: "Please select category" }),
  featured: z.string().optional(),
  image: typeof window === "undefined" ? z.any() : z.any(),

  // image:z.object({
  //   size: z.number(),
  // type: z.string(),
  // name: z.string(),
  // lastModified: z.number(),
  //  }),
});
export type TproductSchema = z.infer<typeof productSchema>;


export const newPorductSchema = z.object({
  id:z.string().optional(),
  name: z.string().min(4, { message: "Product name is required" }),
  price: z
    .string()
    .refine((value) => /^\d+$/.test(value), "Invalid product price"), // Refinement
  productCat: z.string().min(1, { message: "Please select category" }),
  productDesc: z
    .string()
    .min(2, { message: "Product productDescription is required" }),
  //  brand: z.string().min(1, { message: "Please select category" }),
  //  dimensions:z.string().optional(),
  //weight:z.string().optional(),
  isFeatured: z.boolean().optional(),

 // image: z.any().refine((file: File) => file?.length !== 0, "File is required"),
 image:z.any().optional(),
  // .refine((file) => file.size < MAX_FILE_SIZE, "Max size is 5MB.")
  // .refine(
  //   (file) => checkFileType(file),
  //   "Only .jpg, .jpeg formats are supported."
  // ),
});

export type TnewProductSchema = z.infer<typeof newPorductSchema>;

export type ShowPorductT ={
  id:string;
  name:string;
  price:string;
 
  productCat: string;
  productDesc:string;
  isFeatured:boolean;
  image:string;
}

export const editPorductSchema = z.object({
  id:z.string().optional(),
  name: z.string().min(4, { message: "Product name is required" }),
  price: z
    .string()
    //.refine((value) => /^\d+$/.test(value), "Invalid product price"), // Refinement
    .refine((value) => /^\d*[.,]?\d*$/.test(value), "Invalid product price"), // Refinement
                      //  ^\d*[.,]?\d*$
  // price: z
  //   .string()
  //   .refine((value) => /^\d+$/.test(value), "Invalid product price"), // Refinement
  productCat: z.string().min(1, { message: "Please select category" }),
  productDesc: z
    .string()
    .min(2, { message: "Product productDescription is required" }),
   // brand: z.string().optional(),
   // dimensions:z.string().optional(),
 // weight:z.string().optional(),
  isFeatured: z.boolean().optional(),
  
  image: z.any().optional(),
  oldImgageUrl:z.string().optional(),
  // .refine((file) => file.size < MAX_FILE_SIZE, "Max size is 5MB.")
  // .refine(
  //   (file) => checkFileType(file),
  //   "Only .jpg, .jpeg formats are supported."
  // ),
});

export type TeditProductSchema = z.infer<typeof editPorductSchema>;

export default productSchema;

export type TProduct = {
  product: {
    name: string;
    id: string;
    image: string;
    category: string;
  };
};

export type Timage = {
  size?: number;
  type?: string;
  name?: string;
  lastModified?: number;
};

const ImageSchema = z.object({
  size: z.number().optional(),
  type: z.string().optional(),
  name: z.string().optional(),
  lastModified: z.number().optional(),
});

// Now add this object into an array
const ImagesSchema = z.array(ImageSchema);

const MAX_FILE_SIZE = 1024 * 1024 * 6; // 3MB
// const ACCEPTED_IMAGE_TYPES = ['image/jpg','image/jpg','image/jpeg'];

function checkFileType(file: File) {
  if (file?.name) {
    const fileType = file.name.split(".").pop();
    if (fileType === "jpg" || fileType === "png") return true;
  }
  return false;
}
//image: ImageSchema.optional(),

export type TOrderProduct = {
   addressId: string;
    customerName: string;
    id: string;
    time: string;
    userId: string;
};

export type TOrderMaster = {
  id:string;
  addressId:string;
  customerName:string;
  time:string;
  userId:string;
 }

 export type TOrderMasterArr = {
  id:string;
  addressId:string;
  customerName:string;
  time:string;
  userId:string;
 }[];

export const signUpSchema = z
  .object({
    username: z.string().min(2, { message: "User name is required" }),
    email: z.string().email().min(2, { message: "Email is required" }),
    password: z
      .string()
      .min(4, { message: "Password must be atleast 4 character long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password must match",
    path: ["confirmPassword"],
  });

export type TsignUpSchema = z.infer<typeof signUpSchema>;

export const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Category name is required" })
    .max(30, { message: "Category name is to long" }),
  productDesc: z
    .string()
    .min(1, { message: "productDescrition of product is needed" })
    .max(100, { message: "productDescription is too long" }),
    slug: z
    .string().optional(),
    // .min(4, { message: "productDescrition of product is needed" })
    // .max(100, { message: "productDescription is too long" }),
   // image: z.any().refine((file: File) => file?.length !== 0, "File is required"),
   image:z.any().optional(),
});

export type TcategorySchema = z.infer<typeof categorySchema>;

export const editCategorySchema = z.object({
  id: z
    .string()
    .trim()
    .min(1, { message: "Category name is required" }),
  name: z
    .string()
    .trim()
    .min(1, { message: "Category name is required" })
    .max(30, { message: "Category name is to long" }),
  productDesc: z
    .string()
    .min(4, { message: "productDescrition of product is needed" })
    .max(100, { message: "productDescription is too long" }),
    slug: z
    .string()
    .min(4, { message: "productDescrition of product is needed" })
    .max(100, { message: "productDescription is too long" }),
   // image: z.any().refine((file: File) => file?.length !== 0, "File is required"),
    image:z.any().optional(),
});

export type TeditCategorySchema = z.infer<typeof editCategorySchema>;

export const brandSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Category name is required" })
    .max(30, { message: "Category name is to long" }),
  productDesc: z
    .string()
    .min(4, { message: "productDescrition of product is needed" })
    .max(100, { message: "productDescription is too long" }),
    slug: z
    .string()
    .optional(),
    //image: z.any().refine((file: File) => file?.length !== 0, "File is required"),
    image:z.any().optional(),
});

export type TbrandSchema = z.infer<typeof brandSchema>;

export const editBrandSchema = z.object({
  id: z
    .string()
    .trim()
    .min(1, { message: "Category name is required" }),
  name: z
    .string()
    .trim()
    .min(1, { message: "Category name is required" })
    .max(30, { message: "Category name is to long" }),
  productDesc: z
    .string()
    .min(4, { message: "productDescrition of product is needed" })
    .max(100, { message: "productDescription is too long" }),
    slug: z
    .string()
    .optional(),
    image: z.any().optional(),
    oldImgageUrl:z.any().optional(),
});

export type TeditBrandSchema = z.infer<typeof editBrandSchema>;


export const addressSchima = z.object({
  name: z
  .string()
  .trim()
  .min(2, { message: "Product name is very short" })
  .max(30, { message: "Product name is very long" }),
 
  mobNo: z.string().min(2, { message: "City is required" }),
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  city: z.string().min(2, { message: "City is required" }),
  state: z.string().min(2, { message: "State is required" }),
  zipCode: z.string().min(2, { message: "Zip code is required" }),
  userId: z.string().optional(),
});
export type TaddressSchema = z.infer<typeof addressSchima>;

export const addressSchimaCheckout = z.object({
  firstName: z
  .string()
  .trim()
  .min(2, { message: "First name is very short" })
  .max(30, { message: "First name is very long" }),
  lastName: z
  .string()
  .trim()
  .min(2, { message: "Last name is very short" })
  .max(30, { message: "Last name is very long" }),
  password:z.string().optional(),
  email: z.string().min(2, { message: "Email is required" }),
  mobNo: z.string().min(2, { message: "Mobile is required" }),
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  city: z.string().min(2, { message: "City is required" }),
  state: z.string().min(2, { message: "State is required" }),
  zipCode: z.string().min(2, { message: "Zip code is required" }),
  userId: z.string().optional(),
  
//  orderDetail:z.string().optional(),
});


export const userSchima = z.object({
  username: z
  .string()
  .trim()
  .min(2, { message: "User name is very short" })
  .max(30, { message: "User name is very long" }),
  password:z.string().optional(),
  confirmPassword:z.string().optional(),
   email: z.string().min(2, { message: "Email is required" }),
 
});

export type TuserSchem = z.infer<typeof userSchima>;

export type TaddressSchemaCheckout = z.infer<typeof addressSchimaCheckout>;

export type TaddressCheckout ={
  firstName:string;
    lastName:string;
    password?:string;
    email: string;
    mobNo: string;
    addressLine1?: string;
    addressLine2?: string;
    city:string;
    state: string;
    zipCode: string;
    userId?:string;// opttional
    }


    export type addressResT ={
      email:string;
      firstName:string;
      lastName:string;
     // userId:string;
      mobNo:string;
      addressLine1:string;
      addressLine2:string;
      city:string;
      state:string;
      zipCode:string;
    } 



  


  

 



     export type orderMasterDataT = {
      id:string;
        customerName: string;
        userId: string;
        addressId: string;
        time: string;
    }

    export type orderMasterDataTArr = {
      id:string;
      customerName: string;
      userId: string;
      addressId: string ;
      time: string;
  }[];