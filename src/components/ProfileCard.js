import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import db from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function ProfileCard() {
  const { currentUser, currentUserAvatarUrl, currentUserData } = useAuth();
  const [userData, setUserData] = useState();
  useEffect(() => {
    getUserDetails();
  }, []);

  async function getUserDetails() {
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let user = docSnap.data();
      setUserData(user);
    }
  }

  return (
    <>
      {" "}
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          id="myimg"
          height="140"
          image={
            currentUserAvatarUrl
              ? currentUserAvatarUrl
              : "https://mui.com/static/images/cards/contemplative-reptile.jpg"
          }
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {currentUserData &&
              currentUserData.firstName + " " + currentUserData.lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            City : {currentUserData.city} <br></br>
            Description : {currentUserData && currentUserData.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Link to="/updateProfile" style={{ textDecoration: "none" }}>
            <Button size="small">Update Profile</Button>
          </Link>
        </CardActions>
      </Card>
    </>
  );
}
