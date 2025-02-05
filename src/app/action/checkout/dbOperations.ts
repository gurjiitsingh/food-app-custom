"use server";

import { db } from "@/lib/firebaseConfig";
//import { address } from "@/--------db/schema";
import { addressSchimaCheckout } from "@/lib/types";
//import fs from "fs";
//import { createNewOrderFile } from "../newOrderFile/newfile";
import { addDoc, collection,  getDocs, query,  where } from "@firebase/firestore";

//paypal
//import { renderBuyPage } from "@/app/action/paypal/paypalActions"

export async function addCustomerAddress(formData: FormData) {
  const email = formData.get("email");
  const lastName = formData.get("lastName");
  const firstName = formData.get("firstName");
  const userId = formData.get("userId");
  const mobNo = formData.get("mobNo");
  const addressLine1 = formData.get("addressLine1");
  const addressLine2 = formData.get("addressLine2");
  const city = formData.get("city");
  const state = formData.get("state");
  const zipCode = formData.get("zipCode");

  const recievedData = {
    email,
    firstName,
    lastName,
    userId,
    mobNo,
    addressLine1,
    addressLine2,
    city,
    state,
    zipCode,
  };

const result = addressSchimaCheckout.safeParse(recievedData);
 //console.log("validation",result)

 const q = query(collection(db, "address"), where("email", "==", email));
 const querySnapshot = await getDocs(q);
 let recordId = null;
 querySnapshot.forEach((doc) => {
  recordId= doc.id;
   // doc.data() is never undefined for query doc snapshots
   console.log( doc.data());
 });
 
 if (result && !recordId) {
  try {
   const docRef = await addDoc(collection(db, "address"),recievedData);
   console.log("address written with ID: ", docRef.id);
    // Clear the form
} catch (e) {
    console.error("Error adding document: ", e);
}

//also add data in user/cutomer table
const username = firstName+" "+lastName;
try {
    //const hashedPassword = hashPassword(password);
        const  newuser = {
            username,email,hashedPassword:"",role:"user",isVerfied: true,isAdmin:false
        }


      const docRef = await addDoc(collection(db, "user"), newuser);
      console.log("Document written with ID: ", docRef.id);
      // Clear the form
  } catch (e) {
      console.error("Error adding document: ", e);
  }

//end of add data in user/cutomer table 


}


}




export async function cartProducts(cartData:any) {
  //console.log("cart data in cart save draft ",cartData)
//const toBeDeleted = cartData[0].purchaseSession;
//console.log(toBeDeleted)
//await deleteDoc(doc(db, "orderProducts", toBeDeleted));

//no save new draft
  cartData.forEach(element => {
 //   addProductDraft(element);
  });
}

async function  addOrder(element:any){
  try {
    const docRef = await addDoc(collection(db, "orderProducts"),element);
    console.log("Document written with ID: ", docRef.id);
    // Clear the form
} catch (e) {
    console.error("Error adding document: ", e);
}
}




async function  addProductDraft(element:any){
  try {
    const docRef = await addDoc(collection(db, "orderProducts"),element);
    console.log("Document written with ID: ", docRef.id);
    // Clear the form
} catch (e) {
    console.error("Error adding document: ", e);
}
}



export async function searchAddress(email:{email:string}){

  const q = query(collection(db, "address"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
 
  let recordId = null;
 let data = null;
let i=0;
  querySnapshot.forEach((doc) => {
    i++;
   recordId= doc.id;
    // doc.data() is never undefined for query doc snapshots
    console.log(" address find --", doc.data());
    data = doc.data()
  });
 return data;

}


export async function searchAddressById(id:{id:string}){

  const q = query(collection(db, "address"), where("id", "==", id));
  const querySnapshot = await getDocs(q);
 
  let recordId = null;
 let data = null;
let i=0;
  querySnapshot.forEach((doc) => {
    i++;
   recordId= doc.id;
    // doc.data() is never undefined for query doc snapshots
    console.log(" address find --", doc.data());
    data = doc.data()
  });
 return data;

}


export async function editAddress() {}


export async function display(data, actions){

  return actions.order.create({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          value: "8.99",
        },
      },
    ],
    
    payer: {
      name: {
        given_name: "Gurjit",
        surname: "Singh",
      },
      address:
       {
        address_line_1: "124-07 Liberty Ave",
        address_line_2: "Vill Tandi",
        admin_area_2: "South Richmond Hill",
        admin_area_1: "New York",
        postal_code: "11419",
        country_code: "US",
      },
      email_address: "gsta@mail.com",
      phone: {
        phone_type: "MOBILE",
        phone_number: {
          national_number: "345678476",
        },
      },
    },
  });

// let address1 ={};
//     async function getAddress(){
//         const inputEmail = "gurjiitsingh@gmail.com";
//         const  addressRes =   await  searchAddress(inputEmail) || {};
//        console.log("this is address",addressRes);
//          if(addressRes !== null){
        
//        address1 =  {
//            address_line_1: addressRes.addressLine1,
//            address_line_2: addressRes.addressLine2,
//            admin_area_2: addressRes.city,
//            admin_area_1: addressRes.state,
//            postal_code: addressRes.zipCode,
//            country_code: "US",
//          }
      
       
//        }
//         }
//       getAddress()

//       console.log("thess ",address1)
  
    // return actions.order.create({
    //   intent: "CAPTURE",
    //   purchase_units: [
    //     {
    //       amount: {
    //         value: "8.99",
    //       },
    //     },
    //   ],
      
    //   payer: {
    //     name: {
    //       given_name: "Gurjit",
    //       surname: "Singh",
    //     },
    //     address:
    //      {
    //       address_line_1: "124-07 Liberty Ave",
    //       address_line_2: "Vill Tandi",
    //       admin_area_2: "South Richmond Hill",
    //       admin_area_1: "New York",
    //       postal_code: "11419",
    //       country_code: "US",
    //     },
    //     email_address: "gsta@mail.com",
    //     phone: {
    //       phone_type: "MOBILE",
    //       phone_number: {
    //         national_number: "345678476",
    //       },
    //     },
    //   },
    // });
  };


// first check if this product draft (product are saved in draft with this session) is save in table productOrder
// if yes delete the item 
//  await db
//   .collection("orderProducts")
//   .where("Value Name", isEqualTo: "byCar")
//   .get()
//   .then((querySnapshot) {
// querySnapshot.docs.forEach((doc) {
//   doc.reference.delete();
// });
// return null; });



//  const docRef = doc(db, "address", email);

// const docSnap = await getDoc(docRef);

// if (docSnap.exists()) {
//   console.log("Document data:", docSnap.data());
// } else {
//   // docSnap.data() will be undefined in this case
//   console.log("No such document!");
// }



 //if address if changed update in address database

  // creating order file
   // This line opens the file as a readable stream
 //const readStream = fs.createReadStream('/text.txt')
 //createNewOrderFile();