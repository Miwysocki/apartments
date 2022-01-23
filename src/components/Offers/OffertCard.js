import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Box, Skeleton } from "@mui/material";
// import { useOffert } from "../OffersManager";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const OffertCard = (props) => {
  const navigate = useNavigate();
  const offert = props.offert;
  const storage = getStorage();
  const [state, setstate] = useState();

  useEffect(() => {
    getThumbnail();
  }, []);

  function getThumbnail() {
    getDownloadURL(ref(storage, "ofertImages/" + offert.photosURL[0]))
      .then((url) => {
        setstate(url);
      })
      .catch((error) => {});
  }

  function showOffertDetails() {
    navigate("/room/" + offert.offertID);
  }

  return (
    <div>
      <CardActionArea
        onClick={() => {
          showOffertDetails();
        }}
        sx={{ maxWidth: 450 }}
      >
        {state ? (
          <Card sx={{ display: "flex", maxWidth: 450 }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography component="div" variant="h6">
                  {offert.apartmentName}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {offert.guests} guests {offert.rooms} rooms
                </Typography>
                <Typography>{offert.description}</Typography>
              </CardContent>
            </Box>
            <CardMedia
              component="img"
              sx={{ maxWidth: 250, marginLeft: 5, maxHeight: 150 }}
              image={state}
              alt="Live from space album cover"
            />
          </Card>
        ) : (
          <Skeleton variant="rectangular" width={350} height={118} />
        )}
      </CardActionArea>
      <br />
    </div>
  );
};

export default OffertCard;
