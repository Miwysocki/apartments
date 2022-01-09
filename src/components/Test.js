import React from "react";
import { useState, useEffect } from "react";
import { doc, setDoc, getDoc, getDocs, collection } from "firebase/firestore";
import db from "../firebase";
import { useAuth } from "../contexts/AuthContext";

const Test = () => {
  useEffect(() => {
    // let res = create();
    // console.log(res);
    getInitials();
  }, []);

  //
  const { currentUser } = useAuth();

  async function getInitials() {
    // const querySnapshot = await getDocs(collection(db, "users"));
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    // });

    console.log(currentUser.uid);
    // const users = await collection(db, "users");
    // console.log("uu " + users);
    const docRef = doc(db, "users", currentUser.uid);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  return <div>aaa</div>;
};

export default Test;
