import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useOffert } from "./Offers/OffersManager";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import Email from "@mui/icons-material/Email";

export default function ProfileCard(props) {
  const { userID, myProfile } = props;
  const [userData, setUserData] = useState();
  const [avatar, setavatar] = useState();
  const { getAvatar, getUserDetails } = useOffert();
  useEffect(() => {
    init();
  }, []);

  async function init() {
    setavatar(await getAvatar(userID));
    setUserData(await getUserDetails(userID));
  }

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          id="myimg"
          height="140"
          image={
            avatar
              ? avatar
              : "https://mui.com/static/images/cards/contemplative-reptile.jpg"
          }
          alt="avatar"
        />
        {userData && (
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {userData.firstName + " " + userData.lastName}
            </Typography>
            <Typography variant="body2">
              City : {userData.city} <br></br>
              Description : {userData.description}
              <br />
              <PhoneIcon />
              {"\u00A0"}
              {"\u00A0"} {userData.phone}
              <br />
              <Email />
              {"\u00A0"} {userData.email}
            </Typography>
          </CardContent>
        )}
        {myProfile && (
          <CardActions>
            <Link to="/updateProfile" style={{ textDecoration: "none" }}>
              <Button size="small">Update Profile</Button>
            </Link>
          </CardActions>
        )}
      </Card>
    </>
  );
}
