import React from "react";
import Header from "../Header";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import db from "../firebase";

const theme = createTheme();

export default function UpdateProfile() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const { currentUser } = useAuth();
  const usersRef = doc(db, "users", currentUser.uid);

  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let city = data.get("city");
    let description = data.get("description");
    let phone = data.get("phone");
    let email = data.get("email");

    let changes = {};
    if (city) changes.city = city;
    if (description) changes.description = description;
    if (phone) changes.phone = phone;
    if (email) changes.email = email;
    try {
      await updateDoc(usersRef, changes);
      uploadPicture();
      navigate("/my-profile");
    } catch {
      setErrorMessage("Failed to update");
    }
  }

  function onImageChange() {}

  async function uploadPicture() {
    let picUrl = currentUser.uid + "_avatar.jpg";
    const storage = getStorage();
    const profilePicImagesRef = ref(storage, "profileImages/" + picUrl);
    const selectedFile = document.getElementById("file").files[0];

    if (selectedFile) {
      uploadBytes(profilePicImagesRef, selectedFile).then((snapshot) => {
        console.log("Uploaded a blob or file!");
      });
    }
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <AccountCircleIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Update your informations
            </Typography>
            <Typography variant="subtitle">
              If you don't want to change - leave blank
            </Typography>
            <h3 id="message" style={{ color: "red" }}>
              {errorMessage}
            </h3>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                fullWidth
                id="city"
                label="City"
                name="city"
                autoComplete="city"
                autoFocus
              />
              <TextField
                margin="normal"
                fullWidth
                id="description"
                label="My description"
                name="description"
                autoComplete="description"
                autoFocus
              />
              <TextField
                margin="normal"
                fullWidth
                id="phone"
                label="Phone number"
                name="phone"
                autoComplete="phone"
                autoFocus
              />
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <label htmlFor="profilePicture">Profile picture: </label>
              <input
                id="file"
                type="file"
                name="profilePicture"
                accept="image/*"
                onChange={onImageChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Update
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
