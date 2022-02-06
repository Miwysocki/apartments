import {
  collection,
  query,
  where,
  addDoc,
  doc,
  getDoc,
  getDocs,
  deleteDoc,
  updateDoc,
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
    await addDoc(collection(db, "reviews"), rev);
  }

  async function getReviews(offerID) {
    const reviewRef = collection(db, "reviews");

    const q = query(reviewRef, where("offertID", "==", offerID));
    const querySnapshot = await getDocs(q);
    const reviews = [];
    querySnapshot.forEach((doc) => {
      reviews.push(doc.data());
    });
    return reviews;
  }

  async function getReservations(offertID) {
    const reservationsRef = collection(db, "reservations");
    const q = query(reservationsRef, where("offertID", "==", offertID));
    const querySnapshot = await getDocs(q);
    const reservations = [];
    querySnapshot.forEach((doc) => {
      reservations.push(doc.data());
    });
    // console.log("reservations w getRese:", reservations);
    return reservations;
  }

  async function getAllReservedDates(offerID) {
    const reservations = await getReservations(offerID);

    let booked = [];
    for (const res of reservations) {
      const startDate = res.dates[0].toDate();
      const endDate = res.dates[1].toDate();
      for (var d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        const day = new Date(d);
        booked.push(day);
      }
    }
    return booked;
  }

  async function archiveReservation(reservationID) {
    const washingtonRef = doc(db, "reservations", reservationID);
    await updateDoc(washingtonRef, {
      archived: true,
    });
  }

  return {
    saveReservation,
    getReservationByID,
    deleteReservation,
    saveReview,
    getReviews,
    getAllReservedDates,
    archiveReservation,
    getReservations,
  };
};
