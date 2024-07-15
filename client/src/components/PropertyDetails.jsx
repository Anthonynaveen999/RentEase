import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, CardMedia, Typography, Container, CardContent, Card, Avatar } from "@mui/material";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import Phone from "@mui/icons-material/Phone";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BASE_URL from "../config";

const PropertyDetails = () => {
  const { houseId } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/houselistings/${houseId}`
        );
        setProperty(response.data);
      } catch (error) {
        console.error("Error fetching property details:", error);
      }
    };

    fetchPropertyDetails();
  }, [houseId]);

  if (!property) {
    return <Typography>Loading...</Typography>;
  }

  

  return (
    <Container sx={{ marginTop: 4 }}>
      <Card elevation={6} sx={{ padding: 4 }}>
        <CardMedia
          component="img"
          height="400"
          image={property.imgURL[0]}
          alt="Property image"
          sx={{ borderRadius: 2, marginBottom: 2 }}
        />
        <CardContent>
          {/* <div
            className="flex py-2 pl-2  rounded-md"
            style={{ backgroundColor: "#f6c492" }}
          >
            <PersonIcon sx={{ marginRight: 1 }} />
            <Typography variant="body1">{property.owner}</Typography>
          </div> */}
          {/* <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
            <PersonIcon sx={{ marginRight: 1 }} />
            <Typography variant="body1">{property.owner}</Typography> */}
          {/* </Box> */}
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
            <LocationOnIcon sx={{ marginRight: 1 }} />
            <Typography variant="body1">
              {property.address}, {property.city}, {property.country}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
            <Phone sx={{ marginRight: 1 }} />
            <Typography variant="body1">{property.contact}</Typography>
          </Box>
          <Typography variant="h5" component="div" gutterBottom>
            Overview
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <BedIcon sx={{ marginRight: 1 }} />
              <Typography variant="body1">
                {property.bedroom} Bedroom
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <BathtubIcon sx={{ marginRight: 1 }} />
              <Typography variant="body1">
                {property.bathroom} Bathroom
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <SquareFootIcon sx={{ marginRight: 1 }} />
              <Typography variant="body1">{property.sqFt} Sq. Ft.</Typography>
            </Box>
          </Box>
          <Typography variant="h5" component="div" gutterBottom>
            Rent Details
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 2,
            }}
          >
            <Typography variant="h6">Monthly Rent:</Typography>
            <Typography variant="h6">₹ {property.rent}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">Security Deposit:</Typography>
            <Typography variant="h6">₹ {property.securityDeposit}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PropertyDetails;