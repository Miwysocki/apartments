import {
  collection,
  query,
  where,
  doc,
  getDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import db from "../../firebase";
import {
  getStorage,
  ref,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import OffertCard from "./OffertCard";
export const useOffert = () => {
  const storage = getStorage();

  async function getOffertByID(id) {
    const docRef = doc(db, "offers", id);
    const docSnap = await getDoc(docRef);
    const reviewRef = collection(db, "reviews");

    if (docSnap.exists()) {
      let offert = docSnap.data();
      offert.offertID = id;
      //offert rating
      const q = query(reviewRef, where("offertID", "==", offert.offertID));
      const querySnapshot = await getDocs(q);
      offert.reviews = [];
      const rating = [];

      querySnapshot.forEach((rev) => {
        rating.push(rev.data().rating);
        offert.reviews.push(rev.id);
      });

      const average = (rating) =>
        rating.reduce((a, b) => a + b, 0) / rating.length;
      const averageRating = average(rating).toFixed(2);
      offert.averageRating = averageRating;

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
    let offers = [];
    const q = query(collection(db, "offers"), where("city", "==", city));
    const querySnapshot = await getDocs(q);
    // return querySnapshot;

    querySnapshot.forEach((doc) => {
      offers.push(doc.data());
      offers[offers.length - 1].offertID = doc.id;
    });
    return offers;
  }

  function listOffers(offers, sorting = "") {
    offers.sort(function (a, b) {
      if (sorting === "price:ascending") return a.price - b.price;
      else if (sorting === "price:descending") return b.price - a.price;
    });
    const offersListed = offers.map((data, id) => {
      return (
        <div key={id}>
          <OffertCard offert={data} />
        </div>
      );
    });
    return offersListed;
  }

  async function deleteOffert(offert) {
    console.log("offert delete:", offert);
    //delete photos
    for (const url of offert.photosURL) {
      const photoRef = ref(storage, "ofertImages/" + url);
      deleteObject(photoRef)
        .then(() => {
          console.log("photo deleted " + url);
        })
        .catch((error) => {
          console.log("photo not deleted:", error);
        });
    }

    await deleteDoc(doc(db, "offers", offert.offertID));
  }

  return {
    getPictureURL,
    getOffertByID,
    getAvatar,
    getUserDetails,
    searchByCity,
    listOffers,
    deleteOffert,
  };
};
