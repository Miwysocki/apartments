import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import DateRangePicker from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useReservation } from "./ReservationManager.js";
import { Alert } from "@mui/material";

const ReservationCard = (props) => {
  const { offert } = props;
  const navigate = useNavigate();
  const [value, setValue] = React.useState([null, null]);
  const [confirmation, setConfirmation] = useState(false);
  const [reservation, setReservation] = useState({});
  const { currentUser } = useAuth();
  const { saveReservation, getAllReservedDates } = useReservation();
  const [bookedDates, setBookedDates] = useState();
  const [errorMessage, setErrorMessage] = useState();

  function datediff(first, second) {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  }
  function getTotalPrice() {
    return datediff(value[0], value[1]) * offert.price;
  }
  function handleReserve() {
    if (confirmation) {
      //saving reservation
      reservation.offertID = offert.offertID;
      reservation.clientID = currentUser.uid;
      reservation.dates = value;
      reservation.address = offert.city + ", " + offert.address;
      saveReservation(reservation);

      navigate("/my-profile");
    }

    //chceck if booked dates not being reserved
    const startDate = value[0];
    const endDate = value[1];
    for (var e of bookedDates) {
      if (e > startDate && e < endDate) {
        setErrorMessage("You picked already booked dates!");
        return;
      }
    }
    //display to confirm
    reservation.price = getTotalPrice();
    setReservation(reservation);
    setConfirmation(true);
  }

  async function init() {
    const booked = await getAllReservedDates(offert.offertID);
    setBookedDates(booked);
  }
  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [value]);

  function disableBookedDates(date) {
    let reservedData =
      date.getTime() === new Date("2022-02-07T00:00").getTime();

    for (const d of bookedDates) {
      reservedData += date.getTime() === d.getTime();
    }
    return reservedData;
  }

  if (currentUser && currentUser.uid === offert.ownerID) return <></>;
  if (currentUser)
    return (
      <div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 20 }}
                //   color="text.secondary"
                gutterBottom
              >
                {offert.price}$ / night{" "}
              </Typography>

              <Typography gutterBottom variant="h5" component="div">
                {confirmation ? "Your reservation:" : "Make Reservation"}
                <br />
              </Typography>
              {confirmation ? (
                <div style={{ fontSize: 20 }}>
                  {"Date: " +
                    value[0].toLocaleDateString() +
                    " - " +
                    value[1].toLocaleDateString()}
                  <br />
                  Total price: {getTotalPrice()}$
                </div>
              ) : (
                <div>
                  <DateRangePicker
                    shouldDisableDate={disableBookedDates}
                    disablePast
                    startText="Check-in"
                    endText="Check-out"
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    renderInput={(startProps, endProps) => (
                      <React.Fragment>
                        <TextField {...startProps} />
                        <Box sx={{ mx: 2 }}> to </Box>
                        <TextField {...endProps} />
                      </React.Fragment>
                    )}
                  />
                  {errorMessage && (
                    <Alert severity="error">{errorMessage}</Alert>
                  )}

                  <Typography variant="h6" component="div">
                    <br />
                    {value[0] && value[1] && (
                      <div style={{}}>
                        {" "}
                        &nbsp;Cost
                        <br /> &nbsp;{datediff(value[0], value[1])}&nbsp;Days x{" "}
                        {offert.price} = {getTotalPrice()}$
                      </div>
                    )}
                  </Typography>
                </div>
              )}
            </CardContent>
            <CardActions>
              {confirmation && (
                <Button
                  size="large"
                  onClick={() => setConfirmation(false)}
                  variant="contained"
                >
                  Cancel
                </Button>
              )}
              <Button size="large" onClick={handleReserve} variant="contained">
                {confirmation ? "Confirm" : "Reserve"}
              </Button>
            </CardActions>
          </Card>
        </LocalizationProvider>
      </div>
    );
  else
    return (
      <>
        <Card sx={{ minWidth: 275, minHeight: 100 }}>
          {" "}
          <CardContent>
            <Typography sx={{ fontSize: 20 }}>
              To make reservation please log in
            </Typography>{" "}
          </CardContent>
          <CardActions>
            <Button
              size="large"
              onClick={() => {
                navigate("/log-in");
              }}
              variant="contained"
            >
              Log in
            </Button>
            <Button
              size="large"
              onClick={() => {
                navigate("/sign-up");
              }}
              variant="contained"
            >
              Sign up
            </Button>
          </CardActions>
        </Card>
      </>
    );
};

export default ReservationCard;
