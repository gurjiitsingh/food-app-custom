'use server'

import { addressSchima, TaddressSchema } from "@/lib/types";


export async function addNewAddress(formData: FormData) {
  const name = formData.get("name");
  const userId = formData.get("userId");
  const mobNo = formData.get("mobNo");
  const addressLine1 = formData.get("addressLine1");
  const addressLine2 = formData.get("addressLine2");
  const city = formData.get("city");
  const state = formData.get("state");
  const zipCode = formData.get("zipCode");

  const recievedData = {
    name,
    userId,
    mobNo,
    addressLine1,
    addressLine2,
    city,
    state,
    zipCode,
  };

  console.log("-----",recievedData)

  
  const result = addressSchima.safeParse(recievedData);
console.log(result)
  if (result) {
  //  const row = await db.insert(address).values(recievedData);
  }
}


export async function editAddress(){

}