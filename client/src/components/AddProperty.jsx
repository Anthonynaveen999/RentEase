import  React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Container, StepContent } from "@mui/material";
import AddLocation from "./AddLocation";
import AddImage from "./AddImage";
import BasicDetails from "./BasicDetails";
import AdditionalDetails from "./AdditionalDetails";
import axios from "axios";
import BASE_URL from "../config";

const steps = [
  { label: "Location", description: "Address" },
  { label: "Images", description: "Upload" },
  { label: "Basics", description: "Details" },
  { label: "Additional Details", description: "Extra info" },
];

export default function AddProperty({ open, setOpen }) {
    const ownerName = JSON.parse(localStorage.getItem("name"));
    const [houseDetails, setHouseDetails] = useState({
    owner: ownerName, // Assuming you will set this value separately
    rent: 0,
    address: "",
    city: "",
    country: "",
    description: "",
    imgURL: [],
    bedroom: 0,
    bathroom: 0,
    sqFt: 0,
    contact: "",
    securityDeposit: 0,
    availableFor: "",
  });
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setHouseDetails({
        owner: ownerName,
        rent: 0,
        address: "",
        city: "",
        country: "",
        description: "",
        imgURL: [],
        bedroom: 0,
        bathroom: 0,
        sqFt: 0,
        contact: "",
        securityDeposit: 0,
        availableFor: "",
        });
    setActiveStep(0);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setHouseDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
        console.log(houseDetails);
      const response = await axios.post(`${BASE_URL}/houselistings`, houseDetails);
      console.log("House listing created:", response.data);
      // Reset the form after successful submission
      handleReset();
      setOpen(false);
    } catch (error) {
      console.error("Error creating house listing:", error);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <AddLocation houseDetails={houseDetails} handleInputChange={handleInputChange} />;
      case 1:
        return <AddImage houseDetails={houseDetails} setHouseDetails={setHouseDetails} />;
      case 2:
        return <BasicDetails houseDetails={houseDetails} handleInputChange={handleInputChange} />;
      case 3:
        return <AdditionalDetails houseDetails={houseDetails} handleInputChange={handleInputChange} />;
      default:
        return "Unknown step";
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container className="bg-white p-5 mt-10 h-4/5 overflow-scroll" maxWidth="md">
        <Box sx={{ width: "100%", padding: 5, textAlign: "center" }}>
          <Stepper activeStep={activeStep} sx={{ height: "1/2" }}>
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel>
                  <Typography variant="h6">{step.label}</Typography>
                  <Typography variant="body2">{step.description}</Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you're finished
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  pt: 2,
                }}
              >
                <Button onClick={handleReset}>Reset</Button>
                <Button onClick={handleSubmit}>Finish</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Box
                sx={{
                  mt: 5,
                  mb: 1,
                  width: "50%",
                  display: "flex-grow",
                  alignContent: "center",
                  justifyContent: "center",
                  mx: "auto",
                }}
              >
                {getStepContent(activeStep)}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  pt: 2,
                }}
              >
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Box>
      </Container>
    </Modal>
  );
}
