import React, { Component } from "react";
import FormUserDetails from "./FormUserDetails";
import DetailsForm from "./DetailsForm";
import Confirm from "./Confirm";
import Success from "./Success";
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

export class UserForm extends Component {
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
    validation: false,
    error: false,
  };

  nextStep = () => {
    const { step } = this.state;
    // let validation = validate
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

    if (step === 3) {
      console.log("state:", this.state);
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
    if (step === 1) {
      if (apartmentName && address && city && country && zip) return true;
    } else if (step === 2) {
      if (description && guests && price && rooms && startDate && endDate)
        return true;
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
  };

  handlePhotos = (input) => {
    let files = [...this.state.photos, input];
    this.setState({ photos: files });
  };

  getStepContent(step, values) {
    switch (step) {
      case 1:
        return (
          <>
            <FormUserDetails
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
      case 4:
        return <Success />;
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
                    <Typography variant="h5" gutterBottom>
                      Thank you for your order.
                    </Typography>
                    <Typography variant="subtitle1">
                      Your order number is #2001539. We have emailed your order
                      confirmation, and will send you an update when your order
                      has shipped.
                    </Typography>
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

export default UserForm;
