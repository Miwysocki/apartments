import {
  collection,
  query,
  where,
  addDoc,
  doc,
  getDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import db from "../../firebase";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export const useReservation = () => {
  async function saveReservation(reservation) {
    const savePath = "reservations/" + reservation.offerID + "/";
    await addDoc(collection(db, "reservations"), reservation);
  }

  async function getReservationByID(id) {
    const docRef = doc(db, "reservations", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let reservation = docSnap.data();
      reservation.reservationID = id;
      return reservation;
    } else {
      console.log("Reservation not found!");
      return "Reservation not found!";
    }
  }

  async function deleteReservation(id) {
    await deleteDoc(doc(db, "reservations", id));
  }
  async function saveReview(rev) {
    console.log("rev:", rev);
    await addDoc(collection(db, "reviews"), rev);
  }

  return { saveReservation, getReservationByID, deleteReservation, saveReview };
};
