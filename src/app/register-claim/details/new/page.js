"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  FormControl,
  InputAdornment,
  FormLabel,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Header from "@/app/components/Header";
import { useLanguage } from "@/app/contexts/LanguageContext";
import Image from "next/image";

export default function SubmitClaim() {
  const router = useRouter();
  const { language } = useLanguage();
  const [step, setStep] = useState(1);
  const fileInputRef = useRef(null);

  const [uploadedImages, setUploadedImages] = useState({
    mulkiyaFront: false,
    mulkiyaBack: false,
    licenseFront: false,
    licenseBack: false,
  });

  const mulkiyaFrontRef = useRef(null);
  const mulkiyaBackRef = useRef(null);
  const licenseFrontRef = useRef(null);
  const licenseBackRef = useRef(null);

  // Translations
  const translations = {
    en: {
      title: "Submit Claim",
      next1: "NEXT (1/3)",
      next2: "NEXT (2/3)",
      finalize: "FINALIZE (3/3)",
      accidentDetails: "Accident Details",
      date: "Date",
      time: "Time",
      platePrefix: "AA",
      garage: "Garage",
      locationPlaceholder: "----------------------",
      garagePlaceholder: "Workshop name...",
      yes: "Yes",
      no: "No",
      location: "Location",
      cause: "Cause of Accident?",
      accidentSketch: "Accident Sketch",
      damageSketch: "Damage Sketch",
      vehicleDamage: "Vehicle Damage",
      plateNumber: "Your car plate number...",
      repairArea: "Preferred Repair Area",
      locationGarage: "Garage",
      towing: "Do you need towing?",
      mulkiyaFront: "Mulkiya (Front)",
      mulkiyaBack: "Mulkiya (Back)",
      licenseFront: "License (Front)",
      licenseBack: "License (Back)",
      documentsUpload: "Documents Upload",
      mulkiya: "Mulkiya (Ownership)",
      license: "Driving License",
      upload: "Upload...",
    },
    ar: {
      title: "تقديم مطالبة",
      next1: "(1/3) التالي",
      next2: "(2/3) التالي",
      finalize: "(3/3) إنهاء",
      accidentDetails: "تفاصيل الحادث",
      date: "التاريخ",
      time: "الوقت",
      platePrefix: "AA",
      garage: "الورشة",
      locationPlaceholder: "----------------------",
      garagePlaceholder: "اسم الورشة...",
      yes: "نعم",
      no: "لا",
      location: "الموقع",
      cause: "سبب الحادث؟",
      accidentSketch: "رسم الحادث",
      damageSketch: "رسم الأضرار",
      vehicleDamage: "أضرار السيارة",
      plateNumber: "رقم لوحة السيارة...",
      repairArea: "منطقة الإصلاح المفضلة",
      locationGarage: "الورشة",
      towing: "هل تحتاج إلى سحب؟",
      mulkiyaFront: "ملكية السيارة (الأمامية)",
      mulkiyaBack: "ملكية السيارة (الخلفية)",
      licenseFront: "رخصة القيادة (الأمامية)",
      licenseBack: "رخصة القيادة (الخلفية)",
      documentsUpload: "تحميل المستندات",
      mulkiya: "ملكية السيارة",
      license: "رخصة القيادة",
      upload: "رفع...",
    },
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFileUpload = (event, type) => {
    if (event.target.files.length > 0) {
      setUploadedImages((prev) => ({ ...prev, [type]: true }));
    }
  };

  return (
    <>
      <Header />

      <IconButton
        sx={{
          position: "absolute",
          top: 20,
          left: 20,
          color: "#333",
          zIndex: 999,
        }}
        onClick={() => router.push("/register-claim/details")}
      >
        <ArrowBackIcon />
      </IconButton>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          minHeight: "calc(100vh - 240px)",
          px: 3,
          background: "linear-gradient(to bottom, #E3F2FD, white)",
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: { xs: "35%", sm: "40%" },
            backgroundImage: "url('/insurance-man.png')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom",
          }}
        />

        <Box
          sx={{
            width: { xs: "90%", sm: "500px" },
            backgroundColor: "rgba(255,255,255,0.6)",
            borderRadius: 3,
            padding: 3,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
            textAlign: "left",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
            maxHeight: "80%",
            overflowY: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 1,
              position: "relative",
            }}
          >
            <IconButton
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                color: "#333",
                zIndex: 9999,
              }}
              onClick={handlePrev}
            >
              <ArrowBackIcon />
            </IconButton>
            {[1, 2, 3].map((num) => (
              <Box
                key={num}
                sx={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  backgroundColor: step >= num ? "#BFD85F" : "#E3F2FD",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  color: step >= num ? "#fff" : "#333",
                }}
              >
                {num}
              </Box>
            ))}
          </Box>

          {/* Step 1: Accident Details */}
          {step === 1 && (
            <>
              {/* Section Title */}
              <Typography
                variant="h6"
                fontWeight="bold"
                align="center"
                color="primary"
                sx={{ mt: 2 }}
              >
                {translations[language].accidentDetails}
              </Typography>

              {/* Date, Time, Location Inputs */}
              <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                  <Typography fontWeight="bold" fontSize="14px">
                    {translations[language].date}
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="dd/mm/yyyy"
                    size="small"
                    sx={{ backgroundColor: "#fff" }}
                  />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                  <Typography fontWeight="bold" fontSize="14px">
                    {translations[language].time}
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="hour:minute"
                    size="small"
                    sx={{ backgroundColor: "#fff" }}
                  />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                  <Typography fontWeight="bold" fontSize="14px">
                    {translations[language].location}
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="📍"
                    size="small"
                    sx={{ backgroundColor: "#fff" }}
                  />
                </Box>
              </Box>

              {/* Cause of Accident */}
              <Typography
                variant="body1"
                fontWeight="bold"
                align="center"
                color="primary"
                sx={{ mt: 2 }}
              >
                {translations[language].cause}
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 1,
                  mt: 1,
                }}
              >
                {[
                  "Overspeed",
                  "Negligence",
                  "Fatigue",
                  "Overtaking",
                  "Weather",
                  "Sudden Halt",
                  "Theft",
                  "Drunk",
                  "Other...",
                ].map((cause, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        sx={{
                          color: "#6BC24A",
                          "&.Mui-checked": { color: "#6BC24A" },
                        }}
                      />
                    }
                    label={<Typography fontSize="14px">{cause}</Typography>}
                  />
                ))}
              </Box>

              {/* Accident & Damage Sketch */}
              {[
                {
                  title: translations[language].accidentSketch,
                  image: "/RegClaim/sketchAccident.png",
                },
                {
                  title: translations[language].damageSketch,
                  image: "/RegClaim/sketchDamage.png",
                },
              ].map((item, index) => (
                <Box key={index} sx={{ mt: 2, textAlign: "center" }}>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    align="center"
                    color="primary"
                  >
                    {item.title}
                  </Typography>
                  <Box
                    sx={{
                      width: "100%",
                      height: "150px",
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      border: "2px dashed #999",
                      mt: 1,
                      position: "relative",
                    }}
                  >
                    {/* Upload Icon */}
                    <IconButton
                      sx={{
                        position: "absolute",
                        bottom: 5,
                        right: 5,
                        backgroundColor: "#fff",
                      }}
                    >
                      <Image
                        src="/RegClaim/upload.png"
                        width={20}
                        height={20}
                        alt="Upload"
                      />
                    </IconButton>
                  </Box>
                </Box>
              ))}

              {/* Next Button */}
              <Button
                fullWidth
                onClick={handleNext}
                sx={{
                  mt: 2,
                  backgroundColor: "#BFD85F",
                  color: "#fff",
                  fontWeight: "bold",
                  textTransform: "none",
                  borderRadius: "8px",
                  "&:hover": { backgroundColor: "#A4C754" },
                }}
              >
                {translations[language].next1}
              </Button>
            </>
          )}

          {/* Step 2: Vehicle Damage */}
          {step === 2 && (
            <>
              {/* Section Title */}
              <Typography
                variant="h6"
                fontWeight="bold"
                align="center"
                color="primary"
                sx={{ mt: 2 }}
              >
                {translations[language].vehicleDamage}
              </Typography>

              {/* Plate Number Input */}
              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <TextField
                  fullWidth
                  placeholder={translations[language].plateNumber}
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {translations[language].platePrefix}
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              {/* Preferred Repair Area */}
              <Typography
                variant="body1"
                fontWeight="bold"
                align="center"
                color="primary"
                sx={{ mt: 3 }}
              >
                {translations[language].repairArea}
              </Typography>

              <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                {/* Location Field */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    width: "50%",
                  }}
                >
                  <Typography variant="subtitle2" fontWeight="bold">
                    {translations[language].location}
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder={translations[language].locationPlaceholder}
                    sx={{ backgroundColor: "#fff" }}
                  />
                </Box>

                {/* Garage Field */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    width: "50%",
                  }}
                >
                  <Typography variant="subtitle2" fontWeight="bold">
                    {translations[language].garage}
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder={translations[language].garagePlaceholder}
                    sx={{ backgroundColor: "#fff" }}
                  />
                </Box>
              </Box>

              {/* Towing Question */}
              <Typography
                variant="body1"
                fontWeight="bold"
                align="center"
                sx={{ mt: 3 }}
              >
                {translations[language].towing}{" "}
                <span style={{ color: "red" }}>*</span>
              </Typography>

              <FormControl
                component="fieldset"
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  mt: 1,
                }}
              >
                <RadioGroup
                  row
                  sx={{ justifyContent: "center", width: "100%" }}
                >
                  <FormControlLabel
                    value="yes"
                    control={
                      <Radio
                        sx={{
                          color: "#6BC24A",
                          "&.Mui-checked": { color: "#6BC24A" },
                        }}
                      />
                    }
                    label={
                      <Typography fontSize="14px">
                        {translations[language].yes}
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    value="no"
                    control={
                      <Radio
                        sx={{
                          color: "#6BC24A",
                          "&.Mui-checked": { color: "#6BC24A" },
                        }}
                      />
                    }
                    label={
                      <Typography fontSize="14px">
                        {translations[language].no}
                      </Typography>
                    }
                  />
                </RadioGroup>
              </FormControl>

              {/* Next Button */}
              <Button
                fullWidth
                onClick={handleNext}
                sx={{
                  mt: 3,
                  backgroundColor: "#BFD85F",
                  color: "#fff",
                  fontWeight: "bold",
                  textTransform: "none",
                  borderRadius: "8px",
                  "&:hover": { backgroundColor: "#A4C754" },
                }}
              >
                {translations[language].next2}
              </Button>
            </>
          )}

          {/* Step 3: Documents Upload */}
          {step === 3 && (
            <>
              <Typography
                variant="h6"
                fontWeight="bold"
                align="center"
                sx={{ mt: 2 }}
              >
                {translations[language].documentsUpload}
              </Typography>

              {/* Mulkiya (Ownership) */}
              <Typography
                variant="body1"
                fontWeight="bold"
                color="primary"
                sx={{ mt: 2 }}
              >
                {translations[language].mulkiya}
              </Typography>

              {/* Mulkiya Front */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mt: 1,
                }}
              >
                <Typography variant="body2" fontWeight="bold">
                  {translations[language].mulkiyaFront}
                </Typography>
                <input
                  type="file"
                  ref={mulkiyaFrontRef}
                  onChange={(e) => handleFileUpload(e, "mulkiyaFront")}
                  style={{ display: "none" }}
                />
                <Button
                  variant="outlined"
                  onClick={() => mulkiyaFrontRef.current.click()}
                  sx={{ textTransform: "none", mt: 1 }}
                >
                  {translations[language].upload}
                </Button>
                <Image
                  src={
                    uploadedImages.mulkiyaFront
                      ? "/RegClaim/Mulkiya.png"
                      : "/RegClaim/upload.png"
                  }
                  width={250}
                  height={150}
                  alt="Mulkiya Front"
                  style={{
                    objectFit: "contain",
                  }}
                />
              </Box>

              {/* Mulkiya Back */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <Typography variant="body2" fontWeight="bold">
                  {translations[language].mulkiyaBack}
                </Typography>
                <input
                  type="file"
                  ref={mulkiyaBackRef}
                  onChange={(e) => handleFileUpload(e, "mulkiyaBack")}
                  style={{ display: "none" }}
                />
                <Button
                  variant="outlined"
                  onClick={() => mulkiyaBackRef.current.click()}
                  sx={{ textTransform: "none", mt: 1 }}
                >
                  {translations[language].upload}
                </Button>
                <Image
                  src={
                    uploadedImages.mulkiyaBack
                      ? "/RegClaim/Mulkiya.png"
                      : "/RegClaim/upload.png"
                  }
                  width={250}
                  height={150}
                  alt="Mulkiya Back"
                  style={{
                    objectFit: "contain",
                  }}
                />
              </Box>

              {/* Driving License */}
              <Typography
                variant="body1"
                fontWeight="bold"
                color="primary"
                sx={{ mt: 3 }}
              >
                {translations[language].license}
              </Typography>

              {/* License Front */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mt: 1,
                }}
              >
                <Typography variant="body2" fontWeight="bold">
                  {translations[language].licenseFront}
                </Typography>
                <input
                  type="file"
                  ref={licenseFrontRef}
                  onChange={(e) => handleFileUpload(e, "licenseFront")}
                  style={{ display: "none" }}
                />
                <Button
                  variant="outlined"
                  onClick={() => licenseFrontRef.current.click()}
                  sx={{ textTransform: "none", mt: 1 }}
                >
                  {translations[language].upload}
                </Button>
                <Image
                  src={
                    uploadedImages.licenseFront
                      ? "/RegClaim/License.png"
                      : "/RegClaim/upload.png"
                  }
                  width={250}
                  height={150}
                  alt="License Front"
                  style={{
                    objectFit: "contain",
                  }}
                />
              </Box>

              {/* License Back */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <Typography variant="body2" fontWeight="bold">
                  {translations[language].licenseBack}
                </Typography>
                <input
                  type="file"
                  ref={licenseBackRef}
                  onChange={(e) => handleFileUpload(e, "licenseBack")}
                  style={{ display: "none" }}
                />
                <Button
                  variant="outlined"
                  onClick={() => licenseBackRef.current.click()}
                  sx={{ textTransform: "none", mt: 1 }}
                >
                  {translations[language].upload}
                </Button>
                <Image
                  src={
                    uploadedImages.licenseBack
                      ? "/RegClaim/License.png"
                      : "/RegClaim/upload.png"
                  }
                  width={250}
                  height={150}
                  alt="License Back"
                  style={{
                    objectFit: "contain",
                  }}
                />
              </Box>

              {/* Finalize Button */}
              <Button
                fullWidth
                sx={{
                  mt: 3,
                  backgroundColor: "#BFD85F",
                  color: "#fff",
                  fontWeight: "bold",
                  textTransform: "none",
                  borderRadius: "8px",
                  "&:hover": { backgroundColor: "#A4C754" },
                }}
              >
                {translations[language].finalize}
              </Button>
            </>
          )}
        </Box>
      </Box>
    </>
  );
}
