import React from "react";
import { Box, Input } from "@mui/material";

const AddImage = ({ houseDetails, handleFileChange }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Input type="file" multiple fullWidth onChange={handleFileChange} />
    </Box>
  );
};

export default AddImage;
