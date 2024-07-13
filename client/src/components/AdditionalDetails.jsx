import React from "react";
import { Box, TextField } from "@mui/material";

const AdditionalDetails = ({ houseDetails, handleInputChange }) => {
  
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        label="Number of Bathrooms"
        name="bathroom"
        variant="outlined"
        fullWidth
        value={houseDetails.bathroom}
        onChange={handleInputChange}
      />
      <TextField
        label="Number of Bedrooms"
        name="bedroom"
        variant="outlined"
        fullWidth
        value={houseDetails.bedroom}
        onChange={handleInputChange}
      />
      <TextField
        label="Available For"
        name="availableFor"
        variant="outlined"
        fullWidth
        value={houseDetails.availableFor}
        onChange={handleInputChange}
      />
      <TextField
        label="Square Feet"
        name="sqFt"
        variant="outlined"
        fullWidth
        value={houseDetails.sqFt}
        onChange={handleInputChange}
      />
    </Box>
  );
};

export default AdditionalDetails;
