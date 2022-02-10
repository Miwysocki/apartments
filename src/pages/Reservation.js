import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useReservation } from "../components/Reservation/ReservationManager";
import { Alert, Box, Button, Rating, Skeleton, TextField } from "@mui/material";
import Header from "../Header";
import { useOffert } from "../components/Offers/OffersManager";
import OffertCard from "../components/Offers/OffertCard";
import ReservationCard from "../components/Reservation/ReservationCard";
import ProfileCard from "../components/ProfileCard";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";

const Reservation = () => {
  const { id } = useParams();
  const {
    getReservationByID,
    deleteReservation,
    saveReview,
    archiveReservation,
  } = useReservation();
  const { getOffertByID } = useOffert();
  const [reservation, setReservation] = useState();
  const [offert, setOffert] = useState();
  const [openCancelation, setOpenCancelation] = useState(false);
  const [openReview, setopenReview] = useState(false);
  const [rating, setRating] = useState("");
  const navigate = useNavigate();
  const today = new Date();
  useEffect(() => {
    init();
  }, [id]);

  async function init() {
    const r = await getReservationByID(id);
    setReservation(r);
  }

  useEffect(() => {
    if (reservation) offerInit();
  }, [reservation]);

  async function offerInit() {
    const of = await getOffertByID(reservation.offertID);
    setOffert(of);
  }

  function cancelReservation() {
    setOpenCancelation(false);
    deleteReservation(reservation.reservationID);
    navigate("/my-profile");
  }

  function handleCancel() {
    setOpenCancelation(true);
  }
  function handleReview() {
    setopenReview(true);
  }
  const handleClose = () => {
    setOpenCancelation(false);
    setopenReview(false);
  };

  function postReview() {
    const opinion = document.getElementById("opinion").value;
    if (opinion && rating) {
      setopenReview(false);
      const review = {};
      review.opinion = opinion;
      review.rating = rating;
      review.offertID = offert.offertID;
      review.clientID = reservation.clientID;
      saveReview(review);
      archiveReservation(reservation.reservationID);
    }
  }
  return (
    <div>
      <Header />
      <br />
      <br />
      <div className="container">
        <div>
          {" "}
          <div style={{ marginLeft: 50, marginTop: 50 }}>
            {" "}
            <h3>Apartment</h3>
            {offert && <OffertCard offert={offert} />}
          </div>
          <div style={{ marginTop: 60, marginLeft: 50 }}>
            {" "}
            <h3>Reservation details</h3>
            {reservation ? (
              <ReservationCard reservation={reservation} />
            ) : (
              <Skeleton variant="rectangular" width={350} height={118} />
            )}
            <br />
            {reservation && today > reservation.dates[1].toDate() ? (
              <>
                {" "}
                {reservation.archived ? (
                  <Alert severity="warning">
                    This reservation is archived!
                  </Alert>
                ) : (
                  <Button variant="contained" onClick={handleReview}>
                    Review Offert
                  </Button>
                )}
              </>
            ) : (
              <Button variant="contained" color="error" onClick={handleCancel}>
                Cancel Reservation
              </Button>
            )}
          </div>
        </div>
        <div style={{ marginTop: 100 }}>
          <h3>Host</h3>
          {offert && <ProfileCard userID={offert.ownerID} />}
          <h3>Cient</h3>
          {offert && <ProfileCard userID={reservation.clientID} />}
        </div>
      </div>

      <Dialog
        open={openCancelation}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to cancel your reservation?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            In case of canceling the reservation additional cost may apply. Are
            you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Disagree
          </Button>
          <Button onClick={cancelReservation}>Agree</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openReview} onClose={handleClose}>
        <DialogTitle>Apartment Review</DialogTitle>

        <DialogContent>
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
          <DialogContentText></DialogContentText>
          <TextField
            style={{ width: 500 }}
            autoFocus
            margin="dense"
            id="opinion"
            label="What's your opinion?"
            fullWidth
            variant="standard"
            multiline
            minRows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={postReview}>Post</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Reservation;
