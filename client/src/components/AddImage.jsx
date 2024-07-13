import React, { useState } from "react";
import { Box, Input } from "@mui/material";
import { Button, Alert, FileInput } from "flowbite-react";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4  } from "uuid";

const AddImage = ({ houseDetails, setHouseDetails }) => {

  const [file, setFile] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);

  const handleUploadImage = async () => {
    console.log(file);
    try {
      if (file === null) {
        setImageUploadError("Please select an image");
        return;
      }
      setImageUploadError(null);
      const imageRef = ref(storage, `images/${file.name + v4()}`);
      await uploadBytes(imageRef, file);
      const url = await getDownloadURL(imageRef);
      console.log(url);
      const updatedImgURL = [url, ...(houseDetails.imgURL || [])];
      setHouseDetails({ ...houseDetails, imgURL: updatedImgURL });
      console.log(houseDetails);
    } catch (error) {
      setImageUploadError("Image upload failed");
      console.error(error);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
        <FileInput
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <Button
          type="button"
          gradientDuoTone="purpleToBlue"
          size="sm"
          outline
          onClick={handleUploadImage}
        >
          Upload Image
        </Button>
      </div>
      {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
      {houseDetails?.imgURL[0] && (
        <img
          src={houseDetails.imgURL[0]}
          alt="upload"
          className="w-full h-72 object-cover"
        />
      )}
      {/* <Input type="file" multiple fullWidth onChange={handleFileChange} /> */}
    </Box>
  );
};

export default AddImage;
