import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Box } from "@mui/material";
// import { useOffert } from "../OffersManager";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const OffertCard = (props) => {
  const offert = props.offert;
  const storage = getStorage();
  const [state, setstate] = useState();
  console.log(offert);
  //   const {  } = useOffert();

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

  return (
    <div>
      {/* <img id={""} src={state}></img> */}
      <CardActionArea sx={{ maxWidth: 450 }}>
        <Card sx={{ display: "flex", maxWidth: 450 }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
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
            sx={{ maxWidth: 250, marginLeft: 5, maxHeight: 200 }}
            image={state}
            alt="Live from space album cover"
          />
        </Card>
      </CardActionArea>
      <br />
    </div>
  );
};

export default OffertCard;
