import { initializeApp } from 'firebase/app';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { useState } from 'react';

const firebaseConfig = {
  apiKey: 'AIzaSyAWB_isO7dq0LLP0MIyrmSygsJhmYoqwVI',
  authDomain: 'gatsby-firebase-e04ae.firebaseapp.com',
  projectId: 'gatsby-firebase-e04ae'
  // storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  // messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  // appId: process.env.NEXT_PUBLIC_APPID
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export function useAuth() {
  return auth;
}

// const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export const firestore = db;

export function useUser() {
  const [user, setUser] = useState<User>();
  onAuthStateChanged(auth, (user) => {
    if (user) setUser(user);
  });
  return user;
}


// import { initializeApp } from "firebase/app";
// import { getAuth, onAuthStateChanged, User } from "firebase/auth";
// import { useState } from "react";

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// export function useAuth() {
//   return auth;
// }

// export function useUser() {
//   const [user, setUser] = useState<User>();
//   onAuthStateChanged(auth, (user) => {
//     if (user) setUser(user);
//   });
//   return user;
// }