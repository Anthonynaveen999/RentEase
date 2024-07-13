import React from "react";
import { Box, TextField } from "@mui/material";

const AddLocation = ({ houseDetails, handleInputChange }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField label="Country" name="country" variant="outlined" fullWidth value={houseDetails.country} onChange={handleInputChange} />
      <TextField label="City" name="city" variant="outlined" fullWidth value={houseDetails.city} onChange={handleInputChange} />
      <TextField label="Address" name="address" variant="outlined" fullWidth value={houseDetails.address} onChange={handleInputChange} />
    </Box>
  );
};

export default AddLocation;
