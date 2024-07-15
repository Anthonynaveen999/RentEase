import React, { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import PropertyCard from "./PropertyCard";
import axios from "axios";
import BASE_URL from "../config";

const Favorites = () => {
  const [properties, setProperties] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const userId = JSON.parse(localStorage.getItem('id'));
  console.log(userId);
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.post(`${BASE_URL}/user/favorites`, {
          userId,
        });
        const properties = response.data;
        const favorites = properties.map((property) => {
          return {
            ...property,
            isFavorite: true,
          };
        });
        setProperties(favorites);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, [properties]);

  return (
    <Container sx={{ paddingTop: "30px" }}>
      <Grid container spacing={3}>
        {properties.map((property) => (
          <Grid item xs={12} md={6} lg={4} key={property._id}>
            <PropertyCard property={property}/>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Favorites;
