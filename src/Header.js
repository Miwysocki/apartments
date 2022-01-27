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
import { useNavigate } from "react-router-dom";
import PlacesAutocomplete from "react-places-autocomplete";
function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { currentUserData, currentUserAvatarUrl } = useAuth();

  const [address, setAddress] = useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  async function handleLogout(e) {
    await logout();
  }
  // useEffect(() => {}, []);

  function handleSearch() {
    var inputVal = document.getElementById("searchInput").value.toLowerCase();
    if (inputVal === "") return;
    navigate("/search/" + inputVal);
    console.log(inputVal);
  }
  function handleEnter(e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }
  const handleSelect = async (value) => {
    setAddress(value);
  };

  const searchOptions = {
    types: ["(cities)"],
  };
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
        <div>
          <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
            searchOptions={searchOptions}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div>
                <div className="header_center">
                  <input
                    type="search"
                    id="searchInput"
                    onKeyDown={handleEnter}
                    {...getInputProps({ placeholder: "Type address" })}
                  ></input>
                  <SearchIcon />
                  <Button onClick={handleSearch}>Search</Button>
                </div>
                <div>
                  {loading ? <div>...loading</div> : null}

                  {suggestions.map((suggestion) => {
                    console.log(suggestion);
                    const style = {
                      backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                    };

                    return (
                      <div {...getSuggestionItemProps(suggestion, { style })}>
                        {suggestion.description}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
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
