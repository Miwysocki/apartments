import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, CardActionArea, Skeleton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ReservationCard = (props) => {
  const reservation = props.reservation;
  const startDate = reservation.dates[0].toDate();
  const endDate = reservation.dates[1].toDate();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("reservation:", reservation);
  }, []);

  function showReservationDetails(id) {
    navigate("/reservation/" + id);
  }

  return (
    <div>
      <div>
        <CardActionArea
          onClick={() => {
            showReservationDetails(reservation.reservationID);
          }}
          sx={{ maxWidth: 480 }}
        >
          <Card sx={{ display: "flex", maxWidth: 480 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                maxHeight: 180,
              }}
            >
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography component="div" variant="h6">
                  {startDate.toDateString()} - {endDate.toDateString()}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Address: {reservation.address}
                </Typography>
                <Typography>Cost: {reservation.price}$</Typography>
              </CardContent>
            </Box>
          </Card>
        </CardActionArea>
      </div>
    </div>
  );
};

export default ReservationCard;
