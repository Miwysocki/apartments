import React, { useEffect, useState } from "react";
import { useReservation } from "./ReservationManager.js";
import ReservationCard from "./ReservationCard";

const OffertReservations = (props) => {
  const { offertID } = props;
  const [reservations, setReservations] = useState();
  const { getReservations } = useReservation();

  useEffect(() => {
    mapReservations();
  }, []);

  async function mapReservations() {
    const reservations = await getReservations(offertID);
    const archivedReservations = [];
    const reservationsListed = reservations.map((reservation, id) => {
      if (reservation.archived)
        archivedReservations.push(
          <ReservationCard reservation={reservation} />
        );
      else return <ReservationCard reservation={reservation} />;
    });

    setReservations(reservationsListed);
  }

  return <div>{reservations && reservations}</div>;
};

export default OffertReservations;
