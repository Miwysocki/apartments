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
    const archivedReservations = [];
    const reservationsListed = reservations.map((reservation, id) => {
      if (reservation.archived)
        archivedReservations.push(
          <ReservationCard reservation={reservation} />
        );
      else return <ReservationCard reservation={reservation} />;
    });
    reservationsListed.push(<h3>History</h3>);
    const mergeReservations = [...reservationsListed, ...archivedReservations];

    setReservations(mergeReservations);
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
