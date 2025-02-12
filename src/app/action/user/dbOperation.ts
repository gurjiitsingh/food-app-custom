'use server'
import { hashPassword } from "@/lib/auth";
import { db } from "@/lib/firebaseConfig";
import {  userTypeArr } from "@/lib/types/userType";
import { TuserSchem } from "@/lib/types";
import { addDoc, collection, getDocs, query, where } from "@firebase/firestore";


export async function addUserDirect(formData: FormData) {
  const lastName = formData.get("lastName");
  const firstName = formData.get("firstName");
  let username = formData.get("username")
    ? formData.get("username")
    : undefined;
  const email = formData.get("email");
  const password = formData.get("password");
  //const confirmPassword = formData.get("confirmPassword");
  // const recievedData = {
  //   email,
  //   password,
  //   username,
  //   confirmPassword,
  // };

  const q = query(collection(db, "user"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  let recordId = undefined;
  querySnapshot.forEach((doc) => {
    recordId = doc.id;
    // doc.data() is never undefined for query doc snapshots
    console.log("User allready exist ------", doc.id);
    return doc.id;
  });

  if (recordId === undefined) {
    // console.log("start adding user -----")
    //also add data in user/cutomer table
    if (username === undefined) {
      username = firstName + " " + lastName;
    }
    let userDocRef = "" as string;
    try {
      const hashedPassword = await hashPassword(password);
      const newuser = {
        username,
        email,
        hashedPassword,
        role: "user",
        isVerfied: true,
        isAdmin: false,
      };

      userDocRef = (await addDoc(collection(db, "user"), newuser)).id ;
      console.log("User added with ID: ", userDocRef);
      recordId = userDocRef;
      return userDocRef;
      // Clear the form
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return recordId;
  
} // end of add user



export async function searchUserById(id: string): Promise<TuserSchem> {
  //console.log("searchUserById -----------------", id);
  // if (id !== undefined) {
  //   const docRef = doc(db, "user", id);
  //   const docSnap = await getDoc(docRef);
  //   if (docSnap.exists()) {
  //     console.log("Document data inside user by id:", docSnap.data());
  //   } else {
  //     // docSnap.data() will be undefined in this case
  //     console.log("No such document!");
  //   }

  //   return docSnap.data();
  // }else{
  //   return {};
  // }
 let data = {} as TuserSchem;
  if (id !== undefined) {
    const q = query(collection(db, "user"), where("userId", "==", id));
    const querySnapshot = await getDocs(q);

   
    querySnapshot.forEach((doc) => {
      data = doc.data() as TuserSchem;
    });
    return data;
  }else{
    return data;
  }





}



  export async function fetchAllUsers(): Promise<userTypeArr>{

   
    //    const querySnapshot = await getDocs(collection(db, "user"))
    //    let data = [];
    //    querySnapshot.forEach((doc) => {
    //    data.push({id:doc.id, ...doc.data()});
    //  });
    //  console.log(data)
    //  return data;

     let data = [] as userTypeArr;
     const q = query(collection(db, "orderMaster"));
     const querySnapshot = await getDocs(q);
     querySnapshot.forEach((doc) => {
       data = doc.data() as userTypeArr;
     });
     return data;
    }



  