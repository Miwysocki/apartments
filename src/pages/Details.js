import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../Header";
import { useOffert } from "../components/Offers/OffersManager";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  ImageList,
  ImageListItem,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import HotelIcon from "@mui/icons-material/Hotel";
import "../style/Basic.css";
import ProfileCard from "../components/ProfileCard";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import Wifi from "@mui/icons-material/Wifi";
import KitchenIcon from "@mui/icons-material/Kitchen";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import MakeReservationCard from "../components/Reservation/MakeReservationCard";
import { useReservation } from "../components/Reservation/ReservationManager";

const Details = () => {
  const { id } = useParams();
  const { getOffertByID, getPictureURL } = useOffert();
  const { getReviews } = useReservation();
  const [offert, setOffert] = useState();
  const [photos, setPhotos] = useState();
  const [openReviews, setOpenReviews] = useState(false);
  const [reviews, setReviews] = useState();

  useEffect(() => {
    init();
    getPhotos();
  }, []);

  useEffect(() => {
    if (offert) showReviews();
  }, [openReviews]);

  async function showReviews() {
    const reviews = await getReviews(offert.offertID);
    setReviews(reviews);
  }

  async function init() {
    const offert = await getOffertByID(id);
    setOffert(offert);
    console.log("offert:", offert);

    return offert;
  }

  async function getPhotos() {
    let photosArr = [];
    let offert = await init();
    for await (const e of offert.photosURL) {
      const url = await getPictureURL(e);
      photosArr.push(url);
    }
    setPhotos(photosArr);
  }

  const imageClick = (photo) => {
    const img = document.getElementById("selectedPhoto");
    img.setAttribute("src", photo);
  };

  return (
    <div>
      <Header />
      <br></br>
      <br></br>
      <br></br>
      <div
      // style={{
      //   backgroundImage: `url("https://htmlcolorcodes.com/assets/images/html-color-codes-color-tutorials-hero.jpg")`,
      //   backgroundSize: "cover",
      //   height: "120vh",
      // }}
      >
        {offert && (
          <div style={{ marginLeft: 160 }}>
            {" "}
            <Typography component="div" variant="h4">
              {offert.apartmentName}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {offert.country}, {offert.city}, {offert.address}
            </Typography>
          </div>
        )}

        <div>
          <div className="center">
            {photos && (
              <img
                style={{ maxHeight: 400 }}
                id="selectedPhoto"
                src={photos[0]}
                alt=""
              />
            )}
          </div>
          <div className="center">
            {" "}
            {photos && (
              <ImageList
                sx={{ height: 200 }}
                cols={photos.length}
                rowHeight={164}
              >
                {photos.map((item) => (
                  <ImageListItem key={item}>
                    <Link to="#">
                      <img
                        src={item}
                        onClick={() => imageClick(item)}
                        alt={""}
                        loading="lazy"
                        style={{
                          height: 100,
                        }}
                      />
                    </Link>
                  </ImageListItem>
                ))}
              </ImageList>
            )}
          </div>
        </div>

        {offert && (
          <div className="container">
            {/* style={{ position: "absolute", left: 200 }} */}
            <div>
              {" "}
              <h3>Informations</h3>
              <Paper elevation={3}>
                {" "}
                <Card sx={{ minWidth: 275, maxWidth: 600 }}>
                  <CardContent>
                    <div className="center">
                      <HotelIcon /> &nbsp;&nbsp;{offert.guests}&nbsp;{" · "}
                      &nbsp; &nbsp;Rooms {offert.rooms} &nbsp;&nbsp;{" · "}{" "}
                      &nbsp;&nbsp;
                      <AttachMoneyIcon />
                      {offert.price} &nbsp;&nbsp;
                      <div>
                        {" "}
                        <Rating
                          style={{ position: "relative", left: "50px" }}
                          value={offert.averageRating}
                          readOnly
                        />{" "}
                        <Link
                          style={{ marginLeft: 45 }}
                          to=""
                          onClick={() => {
                            setOpenReviews(true);
                          }}
                        >
                          {" "}
                          ({offert.reviews.length})reviews
                        </Link>
                      </div>
                      {"   "}
                    </div>

                    <Typography
                      variant="body1"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {offert.description}
                    </Typography>
                    <h3>Amenities</h3>
                    {offert.amenities[0] && (
                      <div>
                        <AcUnitIcon /> Air Conditioning
                      </div>
                    )}
                    {offert.amenities[1] && (
                      <div>
                        <Wifi /> WiFi
                      </div>
                    )}
                    {offert.amenities[2] && (
                      <div>
                        <KitchenIcon /> Kitchen
                      </div>
                    )}
                    {offert.amenities[3] && (
                      <div>
                        <LocalParkingIcon /> Parking space
                      </div>
                    )}
                  </CardContent>
                  <CardActions>
                    <IconButton aria-label="add to favorites">
                      <Checkbox
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite />}
                      />
                    </IconButton>
                  </CardActions>
                </Card>
              </Paper>
            </div>
            <div>
              {" "}
              <MakeReservationCard offert={offert} />
              <div>
                <h3>Host</h3>
                <ProfileCard userID={offert.ownerID} />
              </div>
            </div>
          </div>
        )}
      </div>

      <Dialog
        open={openReviews}
        onClose={"a"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onBackdropClick={() => {
          setOpenReviews(false);
        }}
      >
        <DialogActions>
          <Button
            onClick={() => {
              setOpenReviews(false);
            }}
            autoFocus
          >
            Close
          </Button>
        </DialogActions>
        <DialogTitle id="alert-dialog-title">{"Apartment reviews"}</DialogTitle>
        <DialogContent>
          {reviews &&
            reviews.map((rev) => (
              <div>
                <Card sx={{ minWidth: 275, maxWidth: 600 }}>
                  <Rating readOnly value={rev.rating} /> <br /> {rev.opinion}{" "}
                </Card>
                <br />
                <br />
              </div>
            ))}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Details;
