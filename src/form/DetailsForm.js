import React, { Component } from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Alert from "@mui/material/Alert";

function handleNumberInput(event) {
  if (event.key === "." || event.key === "e") event.preventDefault();
  event.target.value = event.target.value.replace(/[^0-9]*/g, "");
}

export class DetailsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thumbnails: [],
      files: [],
    };
    this.handleFiles = this.handleFiles.bind(this);
  }

  handleFiles(event) {
    this.setState({
      thumbnails: [
        ...this.state.thumbnails,
        URL.createObjectURL(event.target.files[0]),
      ],
      files: [...this.state.files, event.target.files[0]],
    });

    this.props.handlePhotos(event.target.files[0]);
  }

  render() {
    const { values, handleChange } = this.props;

    return (
      <>
        {" "}
        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            Details
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              {this.state.thumbnails.map((e) => (
                <img src={e} alt="" style={{ width: 300, height: 200 }} />
              ))}
              <br></br>

              <label htmlFor="file">Photos: </label>
              <input
                id="file"
                type="file"
                name="image"
                accept="image/*"
                onChange={this.handleFiles}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="description"
                name="description"
                label="Description"
                fullWidth
                variant="outlined"
                multiline
                minRows={2}
                onChange={handleChange("description")}
                defaultValue={values.description}
              />
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                onKeyDown={(event) => handleNumberInput(event)}
                id="rooms"
                name="rooms"
                label="Rooms"
                fullWidth
                type="number"
                InputProps={{
                  inputProps: { min: 0, max: 10 },
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
                onChange={handleChange("rooms")}
                defaultValue={values.rooms}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                onKeyDown={(event) => handleNumberInput(event)}
                id="guests"
                name="guests"
                label="Possible guests"
                fullWidth
                type="number"
                InputProps={{
                  inputProps: { min: 0, max: 10 },
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
                onChange={handleChange("guests")}
                defaultValue={values.guests}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <label htmlFor="start">Offert start date: </label>
              <input
                // defaultValue={"2022-01-17"}
                type="date"
                id="start"
                name="start"
                onChange={handleChange("startDate")}
                defaultValue={values.startDate}
              ></input>
            </Grid>
            <Grid item xs={12} sm={6}>
              <label htmlFor="end">Offert end date: </label>
              <input
                // defaultValue={"2023-01-17"}
                type="date"
                id="end"
                name="end"
                onChange={handleChange("endDate")}
                defaultValue={values.endDate}
              ></input>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="filled">
                <InputLabel htmlFor="filled-adornment-amount">
                  Price per night
                </InputLabel>
                <FilledInput
                  type="number"
                  onKeyDown={(event) => handleNumberInput(event)}
                  required
                  onChange={handleChange("price")}
                  defaultValue={values.price}
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
        </React.Fragment>
      </>
    );
  }
}

export default DetailsForm;
