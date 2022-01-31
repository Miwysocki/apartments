import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Box, Skeleton } from "@mui/material";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  padding: 4,
}));

const OffertCard = (props) => {
  const navigate = useNavigate();
  const offert = props.offert;
  const isVertical = props.isVertical;
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

  if (isVertical) {
    return (
      <div>
        <Item>
          <div style={{ width: 250, height: 350 }}>
            {" "}
            <Link to={`/room/${offert.offertID}`}>
              <img width={250} src={state} alt="" />
            </Link>{" "}
            <p>{offert.apartmentName}</p>
            <p>{offert.city}</p>
            <p>{offert.price}$</p>
          </div>
        </Item>
      </div>
    );
  }

  return (
    <div>
      <CardActionArea
        onClick={() => {
          showOffertDetails();
        }}
        sx={{ maxWidth: 480 }}
      >
        {state ? (
          <Card sx={{ display: "flex", maxWidth: 480 }}>
            <Box
              sx={{ display: "flex", flexDirection: "column", maxHeight: 180 }}
            >
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
              alt=""
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
