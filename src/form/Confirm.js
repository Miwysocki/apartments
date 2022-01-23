import React, { Component } from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { List, ListItem, ListItemText } from "@mui/material";
import Button from "@mui/material/Button";

export class Confirm extends Component {
  render() {
    const { values, handleChange } = this.props;
    const {
      values: {
        apartmentName,
        address,
        city,
        country,
        state,
        zip,
        description,
        guests,
        price,
        rooms,
        photos,
        startDate,
        endDate,
        amenities,
      },
    } = this.props;
    function getAmenites() {
      let s = "";
      if (amenities[0]) {
        s += "Air condiioning ";
      }
      if (amenities[1]) {
        s += " WiFi ";
      }
      if (amenities[2]) {
        s += " Kitchen ";
      }
      if (amenities[3]) {
        s += " Parking space ";
      }
      return s;
    }

    return (
      <>
        {" "}
        <List>
          <ListItem>
            <ListItemText primary="Apartment name" secondary={apartmentName} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Address" secondary={address} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Country" secondary={country} />
          </ListItem>
          <ListItem>
            <ListItemText primary="City" secondary={city} />
          </ListItem>
          <ListItem>
            <ListItemText primary="State/Region" secondary={state} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Postal code" secondary={zip} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Description" secondary={description} />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Number of possible guests"
              secondary={guests}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="Price per night" secondary={price} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Rooms" secondary={rooms} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Offert start date" secondary={startDate} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Offert end date" secondary={endDate} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Amenities" secondary={getAmenites()} />
          </ListItem>
        </List>
      </>
    );
  }
}

export default Confirm;
