import React, { useEffect, useState, useContext } from "react";
import { Container, Grid } from "@mui/material";
import PropertyCard from "./PropertyCard";
import axios from "axios";
import BASE_URL from "../config";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Listings = () => {
  const [properties, setProperties] = useState([]);
  const userId = JSON.parse(localStorage.getItem("id"));
  const { isLoggedIn } = useContext(AuthContext);
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        {
          !isLoggedIn && Navigate("/login");
        }
        const response1 = await axios.get(`${BASE_URL}/houselistings`);
        const response2 = await axios.get(`${BASE_URL}/user/${userId}`);
        let properties = response1.data;
        const user = response2.data;
        
        properties = properties.filter(
          (property) => property.availableFor === "Sale"
        );
        
        properties = properties.map((property) => {
          return {
            ...property,
            isFavorite: user.favHouseIds.includes(property._id),
          };
        });
        setProperties(properties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <Container sx={{ paddingTop: "30px" }}>
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
