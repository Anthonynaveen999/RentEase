import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, Box, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import BASE_URL from "../config";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AddProperty from "./AddProperty";

const PropertyCard = ({ property }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const [isFavorite, setIsFavorite] = useState(property.isFavorite);
  const [modalOpen, setModalOpen] = useState(false);
  const userId = JSON.parse(localStorage.getItem('id'));
  const Navigate = useNavigate();
  const toggleFavorite = async (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    try {
      if (!isFavorite) {
        await axios.post(`${BASE_URL}/user/addFavorite`, { userId, houseId: property._id });
      } else {
        await axios.post(`${BASE_URL}/user/removeFavorite`, { userId, houseId: property._id });
      }
    } catch (error) {
      console.error('Error updating favorite:', error);
    }
  };

  const handleCardClick = () => {
    Navigate(`/property/${property._id}`);
  };

  const handleEdit = (event) => {
    event.stopPropagation();
    if (isLoggedIn === true) {
      setModalOpen(true);
    } else {
      alert("Please login to add a property");
    }
  };

  const handleDelete = async (event) => {
    event.stopPropagation();
    try {
      await axios.delete(`${BASE_URL}/houselistings/${property._id}`);
      // Refresh property list after deletion
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  return (
    <Card
      elevation={4}
      sx={{ display: "flex-col", position: "relative", marginBottom: 2 }}
      onClick={handleCardClick}
    >
      <AddProperty open={modalOpen} setOpen={setModalOpen} property={property}/>
      <Box sx={{ position: "absolute", display: 'flex', flexDirection: 'column' , right: "0", pl: 1, pb: 1 }}>
        <IconButton onClick={toggleFavorite}>
          {isFavorite ? (
            <FavoriteIcon htmlColor="red" />
          ) : (
            <FavoriteBorderIcon htmlColor="white" />
          )}
        </IconButton>
        {property?.owner === userId && (
          <>
            <IconButton onClick={handleEdit}>
              <EditIcon htmlColor="white" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteIcon htmlColor="white" />
            </IconButton>
          </>
        )}
      </Box>
      {property?.imgURL?.length >= 1 && (
        <CardMedia
          component="img"
          sx={{ width: "100%", height: 200, objectFit: "cover" }}
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
            {property.availableFor}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 1,
            }}
          >
            <div className="flex-col justify-center items-center">
              <Typography variant="h6" component="div">
                ₹ {property.rent}
              </Typography>
              <span style={{ fontSize: "0.9rem" }}> per month</span>
            </div>
            <div className="flex-col justify-center items-center">
              <Typography variant="h6" component="div">
                ₹ {property.securityDeposit}
              </Typography>
              <span style={{ fontSize: "0.9rem" }}> Security Deposit</span>
            </div>
            <div className="flex-col justify-center items-center">
              <Typography variant="h6" component="div">
                {property.sqFt}
              </Typography>
              <span style={{ fontSize: "0.9rem" }}> Sq. Ft.</span>
            </div>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

export default PropertyCard;
