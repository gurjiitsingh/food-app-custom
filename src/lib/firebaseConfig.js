//gurjiitsingh@gmail.com
//Cloud Firestore
//nextjs-course




// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
     apiKey: "AIzaSyDFjs2Jnje69uaU78j3ZSshqfpkw72j8FI",
     authDomain: "nextjs-course-f0c73.firebaseapp.com",
     databaseURL: "https://nextjs-course-f0c73-default-rtdb.firebaseio.com",
     projectId: "nextjs-course-f0c73",
     storageBucket: "nextjs-course-f0c73.firebasestorage.app",
     messagingSenderId: "526608970005",
     appId: "1:526608970005:web:d93ae879f8e07e8c66391c"
};




// Initialize Firebase

let app;
try {
     app = initializeApp(firebaseConfig);
} catch (error) {
 console.log(error)   
}


export const db = getFirestore(app);

