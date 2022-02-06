import { Button } from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useReservation } from "../Reservation/ReservationManager";
import { useOffert } from "./OffersManager";
import { useNavigate } from "react-router-dom";

const DeleteOffert = (props) => {
  const { offert } = props;
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const { getReservations } = useReservation();
  const { deleteOffert } = useOffert();
  const navigate = useNavigate();

  async function confirmDeleting() {
    const reservations = await getReservations(offert.offertID);

    const isReserved = checkForActiveReservations(reservations);
    if (isReserved) setOpenAlert(true);
    else setOpenDialog(true);
  }

  function checkForActiveReservations(reservations) {
    for (const e of reservations) {
      if (!e.archived) {
        //has active reservations
        return true;
      }
    }
    return false;
  }

  const handleDelete = () => {
    deleteOffert(offert);
    navigate("/my-profile");
  };

  const handleClose = () => {
    setOpenDialog(false);
  };
  return (
    <div>
      <Button
        onClick={confirmDeleting}
        variant="outlined"
        color="error"
        startIcon={<DeleteIcon />}
      >
        Delete the offer
      </Button>

      <Dialog
        open={openDialog}
        onBackdropClick={() => {
          setOpenDialog(false);
        }}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deleting offert is permament!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openAlert}
        onBackdropClick={() => {
          setOpenAlert(false);
        }}
      >
        <DialogTitle id="alert-dialog-title">
          {"This offert has active reservations!"}
        </DialogTitle>
        <DialogContentText id="alert-dialog-description">
          You cannot delete offert that has been reserved!
        </DialogContentText>
      </Dialog>
    </div>
  );
};

export default DeleteOffert;
