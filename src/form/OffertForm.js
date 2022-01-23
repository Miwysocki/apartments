import React, { Component } from "react";
import AddressForm from "./AddressForm";
import DetailsForm from "./DetailsForm";
import Confirm from "./Confirm";
import Header from "../Header";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import Copyright from "../components/Copyright";
import Alert from "@mui/material/Alert";
import OffersUpload from "../components/OfferUpload";

export class OffertForm extends Component {
  state = {
    step: 1,
    apartmentName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    description: "",
    rooms: null,
    guests: null,
    price: null,
    photos: [],
    startDate: "",
    endDate: "",
    amenities: [false, false, false, false],
    error: false,
  };

  nextStep = async () => {
    const { step } = this.state;

    if (this.validate()) {
      this.setState({
        step: step + 1,
        error: false,
      });
    } else {
      this.setState({
        error: true,
      });
    }
  };

  validate = () => {
    const {
      step,
      apartmentName,
      address,
      city,
      country,
      zip,
      description,
      guests,
      price,
      rooms,
      startDate,
      endDate,
    } = this.state;
    switch (step) {
      case 1:
        if (apartmentName && address && city && country && zip) return true;
        break;
      case 2:
        if (description && guests && price && rooms && startDate && endDate)
          return true;
        break;
      case 3:
        if (apartmentName && address && city && country && zip) return true;
        break;

      default:
        break;
    }
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
  };

  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
    console.log(this.state.amenities + " no tuu");
    console.log(e.target.value + " ee targ");
  };

  handlePhotos = (input) => {
    let files = [...this.state.photos, input];
    this.setState({ photos: files });
  };

  handleAmenities = (input) => {
    console.log("hand " + input);
    let am = this.state.amenities;
    am[input] = !am[input];

    this.setState({ amenities: am });
    console.log("am  " + am);
  };

  getStepContent(step, values) {
    switch (step) {
      case 1:
        return (
          <>
            <AddressForm
              nextStep={this.nextStep}
              handleChange={this.handleChange}
              values={values}
            />
          </>
        );
      case 2:
        return (
          <>
            {" "}
            <DetailsForm
              nextStep={this.nextStep}
              prevStep={this.prevStep}
              handleChange={this.handleChange}
              handlePhotos={this.handlePhotos}
              handleAmenities={this.handleAmenities}
              values={values}
            />
          </>
        );
      case 3:
        return (
          <>
            {" "}
            <Confirm
              nextStep={this.nextStep}
              prevStep={this.prevStep}
              values={values}
            />
          </>
        );

      default:
    }
  }

  render() {
    const { step } = this.state;
    const {
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
    } = this.state;
    const values = {
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
    };
    const theme = createTheme({
      palette: {
        primary: {
          main: red[500],
        },
      },
    });

    const steps = ["Main info", "Details", "Review"];

    return (
      <>
        <Header />

        <ThemeProvider theme={theme}>
          {step}
          <br></br>a{steps.length}
          <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper
              variant="outlined"
              sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
            >
              <Typography component="h1" variant="h4" align="center">
                Add place
              </Typography>
              {this.state.error && (
                <Alert severity="error">Please fill out the fields!</Alert>
              )}

              <Stepper activeStep={step - 1} sx={{ pt: 3, pb: 5 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <React.Fragment>
                {step === steps.length + 1 ? (
                  <React.Fragment>
                    <OffersUpload offert={this.state} />
                    <Typography variant="h5" gutterBottom>
                      Your offert has been uploaded.
                    </Typography>
                    <Typography variant="subtitle1"></Typography>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {this.getStepContent(step, values)}
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      {step !== 1 && (
                        <Button
                          onClick={() => {
                            this.prevStep();
                          }}
                          sx={{ mt: 3, ml: 1 }}
                        >
                          Back
                        </Button>
                      )}

                      <Button
                        variant="contained"
                        onClick={() => {
                          this.nextStep();
                        }}
                        sx={{ mt: 3, ml: 1 }}
                      >
                        {step === steps.length ? "Confirm" : "Next"}
                      </Button>
                    </Box>
                  </React.Fragment>
                )}
              </React.Fragment>
            </Paper>
            <Copyright />
          </Container>
        </ThemeProvider>
      </>
    );
  }
}

export default OffertForm;
