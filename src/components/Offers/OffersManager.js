import {
  collection,
  query,
  where,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import db from "../../firebase";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
export const useOffert = () => {
  const storage = getStorage();

  async function getOffertByID(id) {
    const docRef = doc(db, "offers", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let offert = docSnap.data();
      offert.offertID = id;
      return offert;
    } else {
      console.log("Offert not found!");
      return "Offert not found!";
    }
  }

  async function getAvatar(userID) {
    const pathReference = ref(
      storage,
      "profileImages/" + userID + "_avatar.jpg"
    );

    const avatarURL = await getDownloadURL(ref(storage, pathReference))
      .then((url) => {
        return url;
      })
      .catch((error) => {
        console.log("avatar not found");
        return "";
      });
    return avatarURL;
  }
  async function getUserDetails(userID) {
    const docRef = doc(db, "users", userID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let user = docSnap.data();
      return user;
    }
  }

  async function getPictureURL(picName) {
    const url = await getDownloadURL(ref(storage, "ofertImages/" + picName));
    return url;
  }

  async function searchByCity(city) {
    const q = query(collection(db, "offers"), where("city", "==", "Białystok"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log("halo");
      console.log(doc.id, " => ", doc.data());
    });
    console.log(city);
  }

  return {
    getPictureURL,
    getOffertByID,
    getAvatar,
    getUserDetails,
    searchByCity,
  };
};
