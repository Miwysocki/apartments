import React, { useState } from "react";
import "./style/Header.css";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import db from "./firebase";
import { doc, getDoc } from "firebase/firestore";

function Header() {
  const { currentUser, logout } = useAuth();
  const [initials, setInitials] = useState("");

  async function handleLogout(e) {
    await logout();
  }

  async function getInitials() {
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let user = docSnap.data();
      let initials = user.firstName[0] + user.lastName[0];
      setInitials(initials);
    }
  }
  getInitials();

  return (
    <div className="header">
      <Link to="/">
        {" "}
        <img
          className="header_icon"
          src="https://cdn-icons-png.flaticon.com/512/25/25694.png"
          alt=""
        />
      </Link>

      <div className="header_center">
        <input type="text"></input>
        <SearchIcon />
      </div>
      <div className="header_right">
        {currentUser ? (
          currentUser.email
        ) : (
          <p style={{ marginRight: "10px" }}>
            <Link className="link" to="/log-in">
              Log in
            </Link>{" "}
            <Link className="link" to="/sign-up">
              Sign up
            </Link>{" "}
          </p>
        )}
        <IconButton>
          <Link to="/my-profile" style={{ textDecoration: "none" }}>
            <Avatar>{initials}</Avatar>
          </Link>
        </IconButton>
        {currentUser && (
          <Link to="/" onClick={handleLogout}>
            Log out
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
