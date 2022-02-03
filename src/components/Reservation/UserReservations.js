import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import db from "../../firebase";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, CardActionArea, Skeleton, Typography } from "@mui/material";
import ReservationCard from "./ReservationCard";
const UserReservations = (props) => {
  const userID = props.userID;
  const [reservations, setReservations] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    mapReservations();
  }, []);

  async function mapReservations() {
    const reservations = await getReservations();
    const reservationsListed = reservations.map((reservation, id) => {
      const startDate = reservation.dates[0].toDate();
      const endDate = reservation.dates[1].toDate();

      return <ReservationCard reservation={reservation} />;
    });
    setReservations(reservationsListed);
  }

  async function getReservations() {
    let res = [];
    const q = query(
      collection(db, "reservations"),
      where("clientID", "==", userID)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      res.push(doc.data());
      res[res.length - 1].reservationID = doc.id;
    });
    return res;
  }

  return <div>{reservations}</div>;
};

export default UserReservations;
