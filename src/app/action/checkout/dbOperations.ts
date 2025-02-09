"use server";

import { hashPassword } from "@/lib/auth";
import { db } from "@/lib/firebaseConfig";
//import { address } from "@/--------db/schema";
import {
  addressSchimaCheckout,
  signUpSchema,
  TsignUpSchema,
} from "@/lib/types";

//import fs from "fs";
//import { createNewOrderFile } from "../newOrderFile/newfile";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "@firebase/firestore";
import { addOrderToMaster } from "../orders/dbOperations";

//paypal
//import { renderBuyPage } from "@/app/action/paypal/paypalActions"

export async function cartToOrderProducts(purchaseData: any) {
  //  console.log("--------------------- cart data in cart save draft  ",purchaseData.address)
  //1. user id
  //2. user address
  //3. cart data

  const email = purchaseData.address.email;
  const lastName = purchaseData.address.lastName;
  const firstName = purchaseData.address.firstName;
  const userId = purchaseData.address.userId;
  const password = purchaseData.address.password;

  console.log("------- start order: email of the customer ----", email);

  const username = firstName + "" + lastName;
  //if(purchaseData.userId === undefined){
  const formData = new FormData();
  formData.append("username", username);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("confirmPassword", password);
  // const result = await addUser(formData);
  const UserAddedId = await addUserDirect(formData);

  // Now check address or add new address
  const formDataAdd = new FormData();
  formDataAdd.append("firstName", purchaseData.address.firstName);
  formDataAdd.append("lastName", purchaseData.address.lastName);
  formDataAdd.append("userId", purchaseData.address.userId);
  formDataAdd.append("email", purchaseData.address.email);
  formDataAdd.append("mobNo", purchaseData.address.mobNo);
  formDataAdd.append("password", purchaseData.address.password);
  formDataAdd.append("addressLine1", purchaseData.address.addressLine1);
  formDataAdd.append("addressLine2", purchaseData.address.addressLine2);
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
  };

  

  const orderMasterId = await addOrderToMaster(orderMasterData);

  // add product to productOrder
  
  // unique id ->   purchaseSession: '1737704030168',
  const purchaseProducts = purchaseData.cartData;

  purchaseProducts.forEach((element) => {
    addProductDraft(element, UserAddedId, orderMasterId);
  });




  //  const toBeDeleted = cartData[0].purchaseSession;
  //  console.log(toBeDeleted)
  //  await deleteDoc(doc(db, "orderProducts", toBeDeleted));
} //end of cart to orderProduct

export async function addCustomerAddress(formData: FormData) {
  const email = formData.get("email");
  const lastName = formData.get("lastName");
  const firstName = formData.get("firstName");
  const userId = formData.get("userId");
  const mobNo = formData.get("mobNo");
  const password = formData.get("password");
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
    password,
    addressLine1,
    addressLine2,
    city,
    state,
    zipCode,
  };

  const result = addressSchimaCheckout.safeParse(recievedData);
  console.log("validation", result);

  const q = query(collection(db, "address"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  let recordId = null;
  querySnapshot.forEach((doc) => {
    recordId = doc.id;
    console.log("address allredy saved ------", doc.id);
    return recordId;
    // doc.data() is never undefined for query doc snapshots
    //console.log(doc.data());
  });

  // if customer address not in address table, add adress of cutomer
  if (result && !recordId) {
    //also add data in user/cutomer table
    const username = firstName + " " + lastName;
    let userDocRef = {};
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

      userDocRef = await addDoc(collection(db, "user"), newuser);
      console.log("User Document written with ID: ", userDocRef.id);
      // Clear the form
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    // add data in user table for login info for future

    const addressData = {
      email,
      firstName,
      lastName,
      userId: userDocRef.id,
      mobNo,
      addressLine1,
      addressLine2,
      city,
      state,
      zipCode,
    };

    try {
      const aadDocRef = await addDoc(collection(db, "address"), addressData);
      console.log("address written with ID: ", aadDocRef.id);
      // Clear the form
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    const masterOrder = {
      userId: userDocRef.id,
    };
    addOrderToMaster("e");
  }
}

export async function addCustomerAddressDirect(formData: FormData) {
  const email = formData.get("email");
  const lastName = formData.get("lastName");
  const firstName = formData.get("firstName");
  const userId = formData.get("userId");
  const mobNo = formData.get("mobNo");
  const password = formData.get("password");
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
    password,
    addressLine1,
    addressLine2,
    city,
    state,
    zipCode,
  };

  const result = addressSchimaCheckout.safeParse(recievedData);
  //console.log("validation result in addaddressDirect ----", result, recievedData);

  const q = query(collection(db, "address"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  let recordId = null;
  querySnapshot.forEach((doc) => {
    recordId = doc.id;
    console.log("address allredy exist ------", doc.id);
    return recordId;
    // doc.data() is never undefined for query doc snapshots
    //console.log(doc.data());
  });

  // if customer address not in address table, add adress of cutomer
  if (result && !recordId) {
    // add address

    const addressData = {
      email,
      firstName,
      lastName,
      userId: userId,
      mobNo,
      addressLine1,
      addressLine2,
      city,
      state,
      zipCode,
    };

    try {
      const aadDocRef = await addDoc(collection(db, "address"), addressData);
      console.log("new address added ------", aadDocRef.id);
      recordId = aadDocRef.id;
      return recordId;
      // Clear the form
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  return recordId;
}

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
    let userDocRef = {};
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

      userDocRef = await addDoc(collection(db, "user"), newuser);
      console.log("User added with ID: ", userDocRef.id);
      recordId = userDocRef.id;
      return userDocRef.id;
      // Clear the form
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return recordId;
  // add data in user table for login info for future

  // const addressData = {
  //   email,
  //   firstName,
  //   lastName,
  //   userId: userDocRef.id,
  //   mobNo,
  //   addressLine1,
  //   addressLine2,
  //   city,
  //   state,
  //   zipCode,
  // };

  // try {
  //   const aadDocRef = await addDoc(collection(db, "address"), addressData);
  //   console.log("address written with ID: ", aadDocRef.id);
  //   // Clear the form
  // } catch (e) {
  //   console.error("Error adding document: ", e);
  // }

  // const masterOrder ={
  //   userId:userDocRef.id,

  // }
  // addOrderToMaster("e")
} // end of add user

export async function addUser(formData: FormData) {
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  const recievedData = {
    email,
    password,
    username,
    confirmPassword,
  };

  const result = signUpSchema.safeParse(recievedData);

  const q = query(collection(db, "user"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  let recordId = null;
  querySnapshot.forEach((doc) => {
    recordId = doc.id;
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.data());
  });

  if (result && !recordId) {
    let userDocRef = {};
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

      userDocRef = await addDoc(collection(db, "user"), newuser);
      console.log("User Document written with ID: ", userDocRef.id);
      return userDocRef.id;
      // Clear the form
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}

export async function searchUserById(id: { id: string }) {
  console.log("-----------------", id);
  if (id !== undefined) {
    const docRef = doc(db, "user", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }

    return docSnap.data();
  }
}

export async function editCustomerAddress(formData: FormData) {
  const email = formData.get("email");
  const lastName = formData.get("lastName");
  const firstName = formData.get("firstName");
  const userId = formData.get("userId");
  const mobNo = formData.get("mobNo");
  const password = formData.get("password");
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
    password,
    addressLine1,
    addressLine2,
    city,
    state,
    zipCode,
  };

  const result = addressSchimaCheckout.safeParse(recievedData);

  if (result) {
    const addressData = {
      // email,
      firstName,
      lastName,
      // userId,
      mobNo,
      password,
      addressLine1,
      addressLine2,
      city,
      state,
      zipCode,
    };
    // find address id from userId/email
    // const q = query(collection(db, "address"), where("userId", "==", id));
    const q = query(collection(db, "address"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    let data = null;
    let docId = "";
    //let i = 0;
    querySnapshot.forEach((doc) => {
      docId = doc.id;
      // doc.data() is never undefined for query doc snapshots
      data = doc.data();
    });

    try {
      const editDocRef = doc(db, "address", docId);
      updateDoc(editDocRef, addressData);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}

export async function newCustomerAddress(formData: FormData) {
  const email = formData.get("email");
  const lastName = formData.get("lastName");
  const firstName = formData.get("firstName");
  const userId = formData.get("userId");
  const mobNo = formData.get("mobNo");
  const password = formData.get("password");
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
    password,
    addressLine1,
    addressLine2,
    city,
    state,
    zipCode,
  };

  const result = addressSchimaCheckout.safeParse(recievedData);
  console.log("validation", result);

  const q = query(collection(db, "address"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  let recordId = null;
  querySnapshot.forEach((doc) => {
    recordId = doc.id;
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.data());
  });

  if (result && !recordId) {
    // add data in user table for login info for future

    const addressData = {
      email,
      firstName,
      lastName,
      userId: userId,
      mobNo,
      addressLine1,
      addressLine2,
      city,
      state,
      zipCode,
    };

    try {
      const aadDocRef = await addDoc(collection(db, "address"), addressData);
      console.log("address written with ID: ", aadDocRef.id);
      // Clear the form
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}

export async function cartProducts(cartData: any) {
  //old
  console.log("cart data in cart save draft --------------------- ", cartData);
  const toBeDeleted = cartData[0].purchaseSession;
  console.log(toBeDeleted);
  await deleteDoc(doc(db, "orderProducts", toBeDeleted));

  //no save new draft
  cartData.forEach((element) => {
    addProductDraft(element);
  });
}

export async function addProductDraft(element, UserAddedId, orderMasterId) {
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

export async function addOrder(element: any) {
  try {
    const docRef = await addDoc(collection(db, "orderProducts"), element);
    console.log("Document written with ID: ", docRef.id);
    // Clear the form
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function searchAddress(email: { email: string }) {
  const q = query(collection(db, "address"), where("email", "==", email));
  const querySnapshot = await getDocs(q);

  let recordId = null;
  let data = null;
  let i = 0;
  querySnapshot.forEach((doc) => {
    i++;
    recordId = doc.id;
    // doc.data() is never undefined for query doc snapshots
    console.log(" address find --", doc.data());
    data = doc.data();
  });
  return data;
}

export async function searchAddressById(id: { id: string }) {
  if (id !== undefined) {
    const q = query(collection(db, "address"), where("userId", "==", id));
    const querySnapshot = await getDocs(q);

    //let recordId = null;
    let data = null;
    //let i = 0;
    querySnapshot.forEach((doc) => {
      //  i++;
      ///  recordId = doc.id;
      // doc.data() is never undefined for query doc snapshots

      data = doc.data();
    });
    return data;
  }
}

export async function editAddress() {}

export async function display(data, actions) {
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
      address: {
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
}

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
