import { doc, getDoc } from "firebase/firestore";
import db from "../../firebase";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
export const useOffert = () => {
  const storage = getStorage();
  async function getOffertByID(id) {
    console.log(id);
    const docRef = doc(db, "offers", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
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

  return { getPictureURL, getOffertByID, getAvatar, getUserDetails };
};
