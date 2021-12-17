import React from "react";
import "./style/Header.css";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <img
        className="header_icon"
        src="https://cdn-icons-png.flaticon.com/512/25/25694.png"
        alt=""
      />
      <div className="header_center">
        <input type="text"></input>
        <SearchIcon />
      </div>
      <div className="header_right">
        <p style={{ marginRight: "10px" }}>
          <Link className="link" to="/log-in">
            Log in
          </Link>{" "}
          <Link className="link" to="/sign-up">
            Sign up
          </Link>{" "}
        </p>
        <IconButton onClick={() => console.log("hi")}>
          <Avatar></Avatar>
        </IconButton>
      </div>
    </div>
  );
}

export default Header;
