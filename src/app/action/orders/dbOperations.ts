"use server";


import { db } from "@/lib/firebaseConfig";
import {  addDoc, collection, doc, getDoc, getDocs, query, where } from "@firebase/firestore";
import { addUserDirect } from "../user/dbOperation";
import { addCustomerAddressDirect } from "../address/dbOperations";
import {  TOrderMaster, orderMasterDataT, orderMasterDataTArr, TOrderMasterArr } from "@/lib/types";
import { orderProductsTArr } from "@/lib/types/orderType";
import { cartDataT, purchaseDataT } from "@/lib/types/cartDataType";

 

export async function createNewOrder(purchaseData:purchaseDataT) {
  //  console.log("--------------------- cart data in cart save draft  ",purchaseData.address)
  //1. user id
  //2. user address
  //3. cart data

  const email = purchaseData.address.email;
  const lastName = purchaseData.address.lastName;
  const firstName = purchaseData.address.firstName;
  //const userId = purchaseData.address.userId;
 // const password = purchaseData.address.password;
 const password = "123456";
  console.log("------- start order: email of the customer ----", email);

  const username = firstName + "" + lastName;
  //if(purchaseData.userId === undefined){
  const formData = new FormData();
  formData.append("username", username);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("confirmPassword", password);
  // const result = await addUser(formData);
  const UserAddedId = await addUserDirect(formData) as string;

  // Now check address or add new address
  const formDataAdd = new FormData();
  formDataAdd.append("firstName", purchaseData.address.firstName);
  formDataAdd.append("lastName", purchaseData.address.lastName);
  //formDataAdd.append("userId", UserAddedId);
  formDataAdd.append("email", purchaseData.address.email);
  formDataAdd.append("mobNo", purchaseData.address.mobNo);
  formDataAdd.append("password", "123456");
  formDataAdd.append("addressLine1", purchaseData.address.addressLine1!);
  formDataAdd.append("addressLine2", purchaseData.address.addressLine2!);
  formDataAdd.append("city", purchaseData.address.city);
  formDataAdd.append("state", purchaseData.address.state);
  formDataAdd.append("zipCode", purchaseData.address.zipCode);

  const addressAddedId = await addCustomerAddressDirect(formDataAdd);

  // enter data in order master

  

  const customerName = firstName + " " + lastName;

  const now = new Date();
  const now_india = now.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "medium",
    timeZone: "Asia/Kolkata",
  });

  const orderMasterData = {
    // also add auto increment to order,
    customerName,
    userId: UserAddedId,
    addressId: addressAddedId,
    time: now_india,
  } as orderMasterDataT;

  

  const orderMasterId = await addOrderToMaster(orderMasterData) as string;

  // add product to productOrder

  // unique id ->   purchaseSession: '1737704030168',
  const purchaseProducts = purchaseData.cartData as cartDataT[];

  purchaseProducts.forEach((element) => {
    addProductDraft(element, UserAddedId, orderMasterId);
  });

  //  const toBeDeleted = cartData[0].purchaseSession;
  //  console.log(toBeDeleted)
  //  await deleteDoc(doc(db, "orderProducts", toBeDeleted));
} //end of cart to orderProduct


export async function addProductDraft(element:cartDataT, UserAddedId:string, orderMasterId:string) {
  // console.log("UserAddedId in add products ----",  UserAddedId)
  const product = {
    id: element.id,
    name: element.name,
    price: element.price,
    quantity: element.quantity,
    orderMasterId,
    purchaseSession: element.purchaseSession,
    userId: UserAddedId,
    status: element.status,
  };
  try {
    const docRef = await addDoc(collection(db, "orderProducts"), product);
    console.log("purchased product document written with ID: ", docRef.id);
    // Clear the form
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}




export async function addOrderToMaster(element:orderMasterDataT) {
    try {
      const docRef = await addDoc(collection(db, "orderMaster"), element);
      console.log("Document written with ID: ", docRef.id);
      return docRef.id;
      // Clear the form
    } catch (e) { 
      console.error("Error adding document: ", e);
    }
  }


  export async function fetchOrdersMaster():Promise<orderMasterDataTArr>{
//   const result = await getDocs(collection(db, "orderMaster")) 
//   let data = [] as orderMasterDataTArr;
//   result.forEach((doc) => {
//        data.push({id:doc.id, ...doc.data()});
//      });
//  return data;
// new version

let data = [] as orderMasterDataTArr;
  
    const q = query(collection(db, "orderMaster"));
    const querySnapshot = await getDocs(q);

   
    querySnapshot.forEach((doc) => {
      data = doc.data() as orderMasterDataTArr;
    });
    return data;

   }


   

   export async function fetchOrdersMasterByUserId(userId:string):Promise<Array<TOrderMaster>>{


    //  const q = query(collection(db, "orderMaster"), where("userId", "==", userId));
    // const querySnapshot = await getDocs(q);
    //  let data = [];
    //  querySnapshot.forEach((doc) => {
    //    data.push({id:doc.id, ...doc.data()});
    //  });
    //  return data;

    let data = [] as TOrderMasterArr;
    
      const q = query(collection(db, "orderMaster"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        data = doc.data() as TOrderMasterArr;
      });
      return data;
   
   }   


// export async function addOrder(element) {
//   try {
//     const docRef = await addDoc(collection(db, "orderProducts"), element);
//     console.log("Document written with ID: ", docRef.id);
//     // Clear the form
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// }



// export async function fetchOrders(){

//  // const result = await db.select().from(product);
//   const result = await getDocs(collection(db, "product"))
// //  console.log(result.docs)
   
// let data; 
// data = [];
//   result.forEach((doc) => {
//     data.push({id:doc.id, ...doc.data()});
//   });
//  // console.log(data)
//   return data;
// }

export async function fetchOrderById(id:string){

  const docRef = doc(db, "product", id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
 //   console.log("Document data:", docSnap.data());
  } else {
    // docSnap.data() will be undefined in this case
//    console.log("No such document!");
  }

  return docSnap.data();
  // const result = await db.select().from(product).where(eq(product.id,id));
  // return result[0];
  
}


/***************** Order detail  **************************/



export async function fetchOrderProductsByOrderMasterId(OrderMasterId:string){
  // const q = query(collection(db, "orderProducts"), where("orderMasterId", "==", OrderMasterId));
  // const querySnapshot = await getDocs(q);
  // let data = [];;
  // querySnapshot.forEach((doc) => {
  //   data.push({id:doc.id, ...doc.data()});
  // });
  // return data;

  let data = [] as orderProductsTArr;
  const q = query(collection(db, "orderProducts"), where("orderMasterId", "==", OrderMasterId));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data = doc.data() as orderProductsTArr;
  });
  return data;

}   