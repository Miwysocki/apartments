import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import db from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [currentUserData, setCurrentUserData] = useState();
  const [currentUserAvatarUrl, setCurrentUserAvatarUrl] = useState();
  const [loading, setLoading] = useState(true);

  async function signup(email, password, firstName, LastName) {
    auth.createUserWithEmailAndPassword(email, password).then((cred) => {
      return saveCredentials(cred);
    });

    async function saveCredentials(cred) {
      await setDoc(doc(db, "users", cred.user.uid), {
        firstName: firstName,
        lastName: LastName,
      });
    }
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  async function setCurrentData(user) {
    if (!user) return;
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      var userData = docSnap.data();
      setCurrentUserData(userData);
    }
    //Avatar
    const storage = getStorage();
    const pathReference = ref(
      storage,
      "profileImages/" + user.uid + "_avatar.jpg"
    );

    getDownloadURL(ref(storage, pathReference))
      .then((url) => {
        setCurrentUserAvatarUrl(url);
      })
      .catch((error) => {
        // Handle any errors
      });

    setLoading(false);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setCurrentData(user);
      if (!user) setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    currentUserData,
    currentUserAvatarUrl,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
