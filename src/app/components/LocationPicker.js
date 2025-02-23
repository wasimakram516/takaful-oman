"use client";

import { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Box, Dialog, DialogTitle, DialogContent, Button, Typography } from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const LocationPicker = ({ selectedLocation, setSelectedLocation }) => {
  const [openMapDialog, setOpenMapDialog] = useState(false);

  const handleMapClick = (event) => {
    setSelectedLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <Typography fontWeight="bold" fontSize="14px">
        Location
      </Typography>

      {/* Clickable Box to Open Google Maps */}
      <Box
        onClick={() => setOpenMapDialog(true)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "8px",
          backgroundColor: "#fff",
          cursor: "pointer",
        }}
      >
        <Typography>
          {selectedLocation
            ? `📍 ${selectedLocation.lat.toFixed(5)}, ${selectedLocation.lng.toFixed(5)}`
            : "📍 Select Location"}
        </Typography>
        <RoomIcon sx={{ color: "#6BC24A" }} />
      </Box>

      {/* Google Maps Dialog */}
      <Dialog open={openMapDialog} onClose={() => setOpenMapDialog(false)} fullWidth maxWidth="md">
        <DialogTitle>Select Location</DialogTitle>
        <DialogContent sx={{ height: "400px" }}>
          <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              center={selectedLocation || { lat: 23.5859, lng: 58.4059 }} // Default: Oman
              zoom={12}
              onClick={handleMapClick}
            >
              {selectedLocation && <Marker position={selectedLocation} />}
            </GoogleMap>
          </LoadScript>
        </DialogContent>
        <Button
          onClick={() => setOpenMapDialog(false)}
          sx={{
            m: 2,
            backgroundColor: "primary.main",
            color: "#fff",
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: "8px",
            "&:hover": { backgroundColor: "#A4C754" },
          }}
        >
          Confirm Location
        </Button>
      </Dialog>
    </Box>
  );
};

export default LocationPicker;
