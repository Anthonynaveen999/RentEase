import React from "react";
import { Box, TextField } from "@mui/material";

const BasicDetails = ({ houseDetails, handleInputChange }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        label="Rent per Month"
        name="rent"
        variant="outlined"
        fullWidth
        value={houseDetails.rent}
        onChange={handleInputChange}
      />
      <TextField
        label="Security Deposit"
        name="securityDeposit"
        variant="outlined"
        fullWidth
        value={houseDetails.securityDeposit}
        onChange={handleInputChange}
      />
      <TextField
        label="Description"
        name="description"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={houseDetails.description}
        onChange={handleInputChange}
      />
      <TextField
        label="Contact"
        name="contact"
        variant="outlined"
        fullWidth
        value={houseDetails.contact}
        onChange={handleInputChange}
      />
    </Box>
  );
};

export default BasicDetails;
