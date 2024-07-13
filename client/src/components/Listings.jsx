import React, { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import PropertyCard from "./PropertyCard";
import axios from "axios";
import BASE_URL from "../config";

const Listings = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/houselistings`);
        console.log(response.data);
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <Container>
      <Grid container spacing={3}>
        {properties.map((property) => (
          <Grid item xs={12} md={6} lg={4} key={property._id}>
            <PropertyCard property={property} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Listings;
