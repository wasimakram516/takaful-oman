"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Header from "@/app/components/Header";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { useLanguage } from "@/app/contexts/LanguageContext";
import Image from "next/image";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { QRCodeCanvas } from "qrcode.react";

const MotorTakaful = () => {
  const router = useRouter();
  const { language } = useLanguage();
  const [openDialog, setOpenDialog] = useState(false);
  const [openQRDialog, setOpenQRDialog] = useState(false);
  const [platePrefix, setPlatePrefix] = useState("AA");

  // Translations
  const translations = {
    en: {
      title: "Motor Takaful",
      plateNumber: "Enter plate number...",
      licenseNumber: "Enter license number...",
      mobileNumber: "Mobile number...",
      agreeTerms: "I agree to the terms and conditions.",
      agreeWhatsapp: "I agree to receive updates on WhatsApp.",
      proceed: "Proceed",
      modalTitle: "2020 - Toyota Land Cruiser",
      policy1: "Comprehensive insurance policy text line 1",
      policy2: "Comprehensive insurance policy text line 2",
      policy3: "Comprehensive insurance policy text line 3",
      policy4: "Comprehensive insurance policy text line 4",
      policy5: "Comprehensive insurance policy text line 5",
      policy6: "Comprehensive insurance policy text line 6",
      total: "Total",
      securePayment: "Secure Payment",

      qrMessage: "Scan this QR code to proceed with payment",
      close: "Close",
    },
    ar: {
      title: "تكافل السيارات",
      plateNumber: "أدخل رقم اللوحة...",
      licenseNumber: "أدخل رقم الرخصة...",
      mobileNumber: "رقم الهاتف...",
      agreeTerms: "أوافق على الشروط والأحكام.",
      agreeWhatsapp: "أوافق على تلقي التحديثات عبر الواتساب.",
      proceed: "متابعة",
      modalTitle: "٢٠٢٠ - تويوتا لاند كروزر",
      policy1: "نص بوليصة التأمين الشاملة 1",
      policy2: "نص بوليصة التأمين الشاملة 2",
      policy3: "نص بوليصة التأمين الشاملة 3",
      policy4: "نص بوليصة التأمين الشاملة 4",
      policy5: "نص بوليصة التأمين الشاملة 5",
      policy6: "نص بوليصة التأمين الشاملة 6",
      total: "الإجمالي",
      securePayment: "دفع آمن",

      qrMessage: "امسح رمز الاستجابة السريعة للمتابعة والدفع",
      close: "إغلاق",
    },
  };

  const handlePayment = () => {
    setOpenQRDialog(true);
  };
  return (
    <>
      {/* Fixed Header */}
      <Header />

      {/* Back Button */}
      <IconButton
        sx={{
          position: "absolute",
          top: 20,
          left: 20,
          color: "#333",
          zIndex: 999,
        }}
        onClick={() => router.push("/menu")}
      >
        <ArrowBackIcon />
      </IconButton>

      {/* Page Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          minHeight: "calc(100vh - 170px)",
          px: 3,
          position: "relative",
          background: "linear-gradient(to bottom, #E3F2FD, white)",
          borderRadius: 2,
        }}
      >
        {/* Background Image (Fixed at Bottom) */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            width: "100%",
            height: { xs: "35%", sm: "40%" },
            backgroundImage: "url('/motor-bg.PNG')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom",
          }}
        />

        {/* Form Container */}
        <Box
          sx={{
            width: { xs: "90%", sm: "600px" },
            backgroundColor: "rgba(255,255,255,0.6)",
            borderRadius: 3,
            padding: 3,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
            border: "1px solid #6BC24A",
            textAlign: "left",
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            zIndex: 10,
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            align="center"
            sx={{ mb: 2 }}
          >
            {translations[language].title}
          </Typography>

          {/* Form Fields */}
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
          {/* Mobile Number Field */}
          <TextField
            fullWidth
            type="number"
            placeholder={translations[language].mobileNumber}
            sx={{
              mb: 2,
              "& .MuiInputBase-input": {
                // Hide spinners for number input
                "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
                  WebkitAppearance: "none",
                  margin: 0,
                },
                "&[type=number]": {
                  MozAppearance: "textfield",
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box
                    sx={{
                      py: 0.5,
                      borderRadius: "4px",
                      fontWeight: "bold",
                    }}
                  >
                    +968
                  </Box>
                </InputAdornment>
              ),
            }}
          />

          {/* Checkboxes */}
          <FormControlLabel
            control={<Checkbox />}
            label={
              <Typography variant="caption">
                {translations[language].agreeTerms}
              </Typography>
            }
          />
          <FormControlLabel
            control={<Checkbox />}
            label={
              <Typography variant="caption">
                {translations[language].agreeWhatsapp}
              </Typography>
            }
          />

          {/* Proceed Button - Opens Dialog */}
          <Button
            variant="contained"
            fullWidth
            onClick={() => setOpenDialog(true)}
            sx={{
              mt: 2,
              borderRadius: "20px",
              fontWeight: "bold",
              textTransform: "none",
              backgroundColor: "primary.main",
              color: "#fff",
              py: 1.5,
            }}
          >
            {translations[language].proceed}
          </Button>
        </Box>
      </Box>

      {/* DIALOG */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="md"
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: 3,
            p: 3,
            textAlign: "center",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          },
        }}
      >
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            overflow: "auto",
          }}
        >
          <Box sx={{ mt: "150px" }}>
            {/* Car Image */}
            <Box
              sx={{ display: "flex", justifyContent: "center", width: "100%" }}
            >
              <Image
                src="/toyota.PNG"
                alt="Toyota Land Cruiser"
                width={300}
                height={180}
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </Box>
            {/* Title */}
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ my: 2, fontSize: { xs: "16px", sm: "18px", md: "20px" } }}
            >
              {translations[language].modalTitle}
            </Typography>
          </Box>
          {/* Policy List with Table Styling */}
          <Box
            sx={{
              textAlign: "left",
              px: { xs: 1, sm: 2 },
              borderRadius: "8px",
              mt: 2,
              width: "100%",
            }}
          >
            {[
              "policy1",
              "policy2",
              "policy3",
              "policy4",
              "policy5",
              "policy6",
            ].map((key, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: { xs: 1, sm: 1.5 },
                  borderBottom: index !== 5 ? "1px solid #000" : "none",
                  fontSize: { xs: "14px", sm: "16px" },
                }}
              >
                <Typography variant="body2">
                  {translations[language][key]}
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  {[80, 10, 5, 15, 10, 20][index]}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Total Amount with Border */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
              px: { xs: 1, sm: 2 },
              borderTop: "1px solid #000",
              pt: 1,
              fontSize: { xs: "14px", sm: "16px" },
            }}
          >
            <Typography variant="body2" fontWeight="bold">
              {translations[language].total}
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              125
            </Typography>
          </Box>

          {/* Secure Payment Button with Card Icon */}
          <Button
            variant="contained"
            onClick={handlePayment}
            fullWidth
            sx={{
              mt: 3,
              borderRadius: "20px",
              fontWeight: "bold",
              textTransform: "none",
              py: 1.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: { xs: "14px", sm: "16px" },
              backgroundColor: "primary.main",
              color: "#fff",
            }}
          >
            <CreditCardIcon
              sx={{ mr: 1, fontSize: { xs: "20px", sm: "24px" } }}
            />
            {translations[language].securePayment}
          </Button>
        </DialogContent>
      </Dialog>
      {/* QR Code Dialog */}
      <Dialog open={openQRDialog} onClose={() => setOpenQRDialog(false)}>
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
          <QRCodeCanvas value={window.origin} size={250} />
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
  );
};

export default MotorTakaful;
