import { z } from "zod";

export type userType = {
    id:string;
    email:string;
hashedPassword:string;
isAdmin:string;
isVerfied:string;
role:string;
username:string;
}


export type userTypeArr = {
    id:string;
    email:string;
hashedPassword:string;
isAdmin:string;
isVerfied:string;
role:string;
username:string;
}[]


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