import React from "react";
import { Card, CardContent, CardMedia, Typography, Box, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useState } from "react";

const PropertyCard = ({ property }) => {
    console.log(property);
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <Card sx={{ display: "flex", marginBottom: 2 }}>
      {property?.imgURL?.length >= 1 && (
        <CardMedia
          component="img"
          sx={{ width: 160 }}
          image={property?.imgURL[0]}
          alt="Property image"
        />
      )}

      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h6">
            {property.description}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {property.city}, {property.country}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            component="div"
          >
            Boys, Girls, Family
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 1,
            }}
          >
            <Typography variant="subtitle1" component="div">
              ₹ {property.rent} Rent/month
            </Typography>
            <Typography variant="subtitle1" component="div">
              ₹ {property.securityDeposit} Security Deposit
            </Typography>
            <Typography variant="subtitle1" component="div">
              {property.sqFt} sq.ft Area
            </Typography>
          </Box>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <IconButton onClick={toggleFavorite}>
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
};

export default PropertyCard;
