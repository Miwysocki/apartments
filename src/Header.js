import "./style/Header.css";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function Header() {
  const { currentUser, logout } = useAuth();
  const { currentUserData, currentUserAvatarUrl } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  async function handleLogout(e) {
    await logout();
  }
  useEffect(() => {}, []);

  return (
    <>
      {" "}
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

          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            Menu
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem component={Link} to={"/host-place"}>
              Host place
            </MenuItem>
            <MenuItem component={Link} to={"/my-profile"}>
              My Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>

          <IconButton>
            <Link to="/my-profile" style={{ textDecoration: "none" }}>
              <Avatar id="avatar" src={currentUserAvatarUrl}>
                {currentUserData &&
                  currentUserData.firstName[0] + currentUserData.lastName[0]}
              </Avatar>
            </Link>
          </IconButton>
          {/* {currentUser && (
            <Link to="/" onClick={handleLogout}>
              Log out
            </Link>
          )} */}
        </div>
      </div>
    </>
  );
}

export default Header;
