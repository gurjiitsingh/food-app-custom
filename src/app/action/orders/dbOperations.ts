"use server";


import { db } from "@/lib/firebaseConfig";
import {  addDoc, collection, doc, getDoc, getDocs, where } from "@firebase/firestore";

export async function addOrderToMaster(element: any) {
    try {
      const docRef = await addDoc(collection(db, "orderMaster"), element);
      console.log("Document written with ID: ", docRef.id);
      return docRef.id;
      // Clear the form
    } catch (e) { 
      console.error("Error adding document: ", e);
    }
  }


  export async function fetchOrdersMaster(){

    // const result = await db.select().from(product);
     const result = await getDocs(collection(db, "orderMaster"))
   //  console.log(result.docs)
     let data = [];
     result.forEach((doc) => {
       data.push({id:doc.id, ...doc.data()});
     });
    // console.log(data)
     return data;
   }

   export async function fetchOrdersMasterByUserId(userId:{userId:string}){

  //   // const result = await db.select().from(product);
  //    const result = await getDocs(collection(db, "orderMaster"))
  //  //  console.log(result.docs)
  //    let data = [];
  //    result.forEach((doc) => {
  //      data.push({id:doc.id, ...doc.data()});
  //    });
  //   // console.log(data)
  //    return data;




     const q = query(collection(db, "orderMaster"), where("userId", "==", userId));
     const querySnapshot = await getDocs(q);
     
     let data = [];
     querySnapshot.forEach((doc) => {
       data.push({id:doc.id, ...doc.data()});
     });
    // console.log(data)
     return data;


   }   


export async function addOrder(element: any) {
  try {
    const docRef = await addDoc(collection(db, "orderProducts"), element);
    console.log("Document written with ID: ", docRef.id);
    // Clear the form
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}



export async function fetchOrders(){

 // const result = await db.select().from(product);
  const result = await getDocs(collection(db, "product"))
//  console.log(result.docs)
  let data = [];
  result.forEach((doc) => {
    data.push({id:doc.id, ...doc.data()});
  });
 // console.log(data)
  return data;
}

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