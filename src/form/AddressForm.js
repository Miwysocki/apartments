import React, { Component } from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

export class AddressForm extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values, handleChange } = this.props;
    return (
      <>
        {" "}
        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            Apartment address
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="apartmentName"
                name="apartmentName"
                label="apartment name"
                fullWidth
                variant="standard"
                onChange={handleChange("apartmentName")}
                defaultValue={values.apartmentName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="address1"
                name="address1"
                label="Address line 1"
                fullWidth
                autoComplete="shipping address-line1"
                onChange={handleChange("address")}
                variant="standard"
                defaultValue={values.address}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="address2"
                name="address2"
                label="Address line 2"
                fullWidth
                autoComplete="shipping address-line2"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="city"
                name="city"
                label="City"
                fullWidth
                autoComplete="shipping address-level2"
                onChange={handleChange("city")}
                variant="standard"
                defaultValue={values.city}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="state"
                name="state"
                label="State/Province/Region"
                onChange={handleChange("state")}
                fullWidth
                variant="standard"
                defaultValue={values.state}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="zip"
                name="zip"
                label="Zip / Postal code"
                fullWidth
                autoComplete="shipping postal-code"
                onChange={handleChange("zip")}
                variant="standard"
                defaultValue={values.zip}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="country"
                name="country"
                label="Country"
                fullWidth
                autoComplete="shipping country"
                onChange={handleChange("country")}
                variant="standard"
                defaultValue={values.country}
              />
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
        </React.Fragment>
      </>
    );
  }
}

export default AddressForm;
