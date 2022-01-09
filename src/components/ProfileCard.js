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
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export default function ProfileCard() {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState();

  useEffect(() => {
    getUserDetails();
    getAvatar();
  }, []);

  async function getUserDetails() {
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let user = docSnap.data();
      setUserData(user);
    }
  }

  async function getAvatar() {
    const storage = getStorage();
    const pathReference = ref(
      storage,
      "profileImages/" + currentUser.uid + "_avatar.jpg"
    );

    getDownloadURL(ref(storage, pathReference))
      .then((url) => {
        const img = document.getElementById("myimg");
        img.setAttribute("src", url);
      })
      .catch((error) => {
        // Handle any errors
      });
  }

  return (
    <>
      {" "}
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          id="myimg"
          height="140"
          image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {userData && userData.firstName + " " + userData.lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            City : {userData && userData.city} <br></br>
            Description : {userData && userData.description}
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
