"use client";

import { useState, useRef, useEffect } from "react";
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
  MenuItem,
  Select,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Header from "@/app/components/Header";
import { useLanguage } from "@/app/contexts/LanguageContext";
import Image from "next/image";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { QRCodeCanvas } from "qrcode.react";

export default function SubmitClaim() {
  const router = useRouter();
  const { language } = useLanguage();
  const [step, setStep] = useState(1);
  const [openQRDialog, setOpenQRDialog] = useState(false);
  const [platePrefix, setPlatePrefix] = useState("AA");
  const [qrValue, setQrValue] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setQrValue(window.origin);
    }
  }, []);

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

      // Cause of Accident Checkboxes
      overspeed: "Overspeed",
      negligence: "Negligence",
      fatigue: "Fatigue",
      overtaking: "Overtaking",
      weather: "Weather",
      suddenHalt: "Sudden Halt",
      theft: "Theft",
      drunk: "Drunk",
      other: "Other...",

      qrMessage: "Scan this QR code to proceed with payment",
      close: "Close",
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

      // Cause of Accident Checkboxes
      overspeed: "السرعة الزائدة",
      negligence: "الإهمال",
      fatigue: "التعب",
      overtaking: "التجاوز",
      weather: "الطقس",
      suddenHalt: "التوقف المفاجئ",
      theft: "السرقة",
      drunk: "القيادة تحت تأثير الكحول",
      other: "أخرى...",

      qrMessage: "امسح رمز الاستجابة السريعة للمتابعة والدفع",
      close: "إغلاق",
    },
  };

  const SketchCanvas = ({ title, backgroundImage }) => {
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      // Set canvas size based on container
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;

      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#000";
      ctxRef.current = ctx;
    }, []);

    // Normalize the touch/mouse positions to avoid offset
    const getCanvasCoordinates = (event) => {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();

      let clientX, clientY;

      if (event.touches) {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
      } else {
        clientX = event.clientX;
        clientY = event.clientY;
      }

      return {
        x: ((clientX - rect.left) / rect.width) * canvas.width,
        y: ((clientY - rect.top) / rect.height) * canvas.height,
      };
    };

    const startDrawing = (event) => {
      const { x, y } = getCanvasCoordinates(event);
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(x, y);
      setIsDrawing(true);
    };

    const draw = (event) => {
      if (!isDrawing) return;
      const { x, y } = getCanvasCoordinates(event);
      ctxRef.current.lineTo(x, y);
      ctxRef.current.stroke();
    };

    const stopDrawing = () => {
      ctxRef.current.closePath();
      setIsDrawing(false);
    };

    const clearCanvas = () => {
      const canvas = canvasRef.current;
      ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
    };

    return (
      <Box sx={{ mt: 2, textAlign: "center" }}>
        <Typography
          variant="body1"
          fontWeight="bold"
          align="center"
          color="primary"
        >
          {title}
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "150px",
            border: "2px dashed #999",
            position: "relative",
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundColor: "#fff",
          }}
        >
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            style={{
              width: "100%",
              height: "100%",
              touchAction: "none",
              display: "block",
            }}
          />
          {/* Clear Button */}
          <IconButton
            sx={{
              position: "absolute",
              bottom: 5,
              right: 5,
              backgroundColor: "#fff",
            }}
            onClick={clearCanvas}
          >
            <RestartAltIcon sx={{ color: "#6BC24A" }} />
          </IconButton>
        </Box>
      </Box>
    );
  };
  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFileUpload = (event, type) => {
    if (event.target.files.length > 0) {
      setUploadedImages((prev) => ({
        ...prev,
        [type]: event.target.files[0].name,
      }));
    }
  };

  const handleFinalize = () => {
    setOpenQRDialog(true);
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
          minHeight: "calc(100vh - 170px)",
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
            backgroundImage: "url('/insurance-man.PNG')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom",
          }}
        />

        <Box
          sx={{
            width: { xs: "90%", sm: "500px" },
            backgroundColor: "rgba(255,255,255,0.9)",
            borderRadius: 3,
            padding: 3,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
            border: "1px solid #6BC24A",
            textAlign: "left",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
            maxHeight: "90%",
            overflowY: "auto",
            userSelect: "none",
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
                    type="date"
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
                    type="time"
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
                  "overspeed",
                  "negligence",
                  "fatigue",
                  "overtaking",
                  "weather",
                  "suddenHalt",
                  "theft",
                  "drunk",
                  "other",
                ].map((causeKey, index) => (
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
                    label={
                      <Typography fontSize="14px">
                        {translations[language][causeKey]}
                      </Typography>
                    }
                  />
                ))}
              </Box>

              {/* Accident Sketch - Drawable */}
              <SketchCanvas
                title={translations[language].accidentSketch}
                backgroundImage="/accident.PNG"
              />

              {/* Damage Sketch - Drawable */}
              <SketchCanvas
                title={translations[language].damageSketch}
                backgroundImage="/damage.PNG"
              />

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
              <Box
                sx={{
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "12px",
                  border: "1px solid #ccc",
                  padding: "8px",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    borderColor: "#6BC24A", // Match MUI TextField hover effect
                  },
                  "&:focus-within": {
                    borderColor: "#6BC24A", // Same as focused text field
                    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                {/* Dropdown for Plate Prefix */}
                <FormControl sx={{ minWidth: 70 }}>
                  <Select
                    value={platePrefix}
                    onChange={(e) => setPlatePrefix(e.target.value)}
                    displayEmpty
                    variant="standard"
                    sx={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      backgroundColor: "transparent",
                      "&:before": { borderBottom: "none" },
                      "&:after": { borderBottom: "none" },
                      "& .MuiSelect-icon": { color: "#6BC24A" },
                    }}
                  >
                    <MenuItem value="A">A</MenuItem>
                    <MenuItem value="B">B</MenuItem>
                    <MenuItem value="D">D</MenuItem>
                    <MenuItem value="H">H</MenuItem>
                    <MenuItem value="AA">AA</MenuItem>
                  </Select>
                </FormControl>

                {/* Plate Number Input */}
                <TextField
                  fullWidth
                  type="number"
                  placeholder={translations[language].plateNumber}
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    "& .MuiInputBase-input": {
                      fontSize: "16px",
                      padding: "8px",
                      backgroundColor: "transparent",
                      "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button":
                        {
                          WebkitAppearance: "none",
                          margin: 0,
                        },
                      "&[type=number]": {
                        MozAppearance: "textfield",
                      },
                    },
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

              {/* Mulkiya (Ownership) Section */}
              <Typography
                variant="body1"
                fontWeight="bold"
                color="primary"
                sx={{ mt: 2, textAlign: "center", textDecoration: "underline" }}
              >
                {translations[language].mulkiya}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mt: 1,
                  gap: 2,
                }}
              >
                {/* Mulkiya Reference Image + Upload Inputs */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    width: "100%",
                  }}
                >
                  <Image
                    src="/Mulkiya.PNG"
                    width={200}
                    height={120}
                    alt="Mulkiya Sample"
                    style={{ objectFit: "contain", borderRadius: "5px" }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      flex: 1,
                    }}
                  >
                    <Typography variant="body2" fontWeight="bold" color="error">
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
                      sx={{ textTransform: "none" }}
                    >
                      {translations[language].upload}
                    </Button>
                    {uploadedImages.mulkiyaFront && (
                      <Typography
                        variant="body2"
                        sx={{ color: "#4CAF50", mt: 1 }}
                      >
                        {uploadedImages.mulkiyaFront}
                      </Typography>
                    )}

                    <Typography variant="body2" fontWeight="bold" color="error">
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
                      sx={{ textTransform: "none" }}
                    >
                      {translations[language].upload}
                    </Button>
                    {uploadedImages.mulkiyaBack && (
                      <Typography
                        variant="body2"
                        sx={{ color: "#4CAF50", mt: 1 }}
                      >
                        {uploadedImages.mulkiyaBack}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box>

              {/* Driving License Section */}
              <Typography
                variant="body1"
                fontWeight="bold"
                color="primary"
                sx={{ mt: 3, textAlign: "center", textDecoration: "underline" }}
              >
                {translations[language].license}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mt: 1,
                  gap: 2,
                }}
              >
                {/* License Reference Image + Upload Inputs */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    width: "100%",
                  }}
                >
                  <Image
                    src="/License.PNG"
                    width={200}
                    height={120}
                    alt="License Sample"
                    style={{ objectFit: "contain", borderRadius: "5px" }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      flex: 1,
                    }}
                  >
                    <Typography variant="body2" fontWeight="bold" color="error">
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
                      sx={{ textTransform: "none" }}
                    >
                      {translations[language].upload}
                    </Button>
                    {uploadedImages.licenseFront && (
                      <Typography
                        variant="body2"
                        sx={{ color: "#4CAF50", mt: 1 }}
                      >
                        {uploadedImages.licenseFront}
                      </Typography>
                    )}

                    <Typography variant="body2" fontWeight="bold" color="error">
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
                      sx={{ textTransform: "none" }}
                    >
                      {translations[language].upload}
                    </Button>
                    {uploadedImages.licenseBack && (
                      <Typography
                        variant="body2"
                        sx={{ color: "#4CAF50", mt: 1 }}
                      >
                        {uploadedImages.licenseBack}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box>

              {/* Finalize Button */}
              <Button
                fullWidth
                onClick={handleFinalize}
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

              {/* QR Code Dialog */}
              <Dialog
                open={openQRDialog}
                onClose={() => setOpenQRDialog(false)}
              >
                <DialogTitle
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body1">
                    {translations[language].qrMessage}
                  </Typography>
                </DialogTitle>
                <DialogContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    pb: 3,
                  }}
                >
                  <QRCodeCanvas value={qrValue} size={250} />
                  <Button
                    sx={{
                      mt: 3,
                      backgroundColor: "primary.main",
                      color: "#fff",
                      fontWeight: "bold",
                      textTransform: "none",
                      borderRadius: "8px",
                      "&:hover": { backgroundColor: "#A4C754" },
                    }}
                    onClick={() => router.push("/")}
                  >
                    {translations[language].close}
                  </Button>
                </DialogContent>
              </Dialog>
            </>
          )}
        </Box>
      </Box>
    </>
  );
}
