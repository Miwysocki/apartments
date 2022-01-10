import React, { useContext, useState, useEffect } from "react";
import db from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext";
import { auth } from "../firebase";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const UserContext = React.createContext();

export function useUserData() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {};

  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  );
}
