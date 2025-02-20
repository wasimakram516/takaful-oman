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
  DialogContent,
  IconButton
} from "@mui/material";
import { useRouter } from "next/navigation";
import Header from "@/app/components/Header";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { useLanguage } from "@/app/contexts/LanguageContext";
import Image from "next/image";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const MotorTakaful = () => {
  const router = useRouter();
  const { language } = useLanguage();
  const [openDialog, setOpenDialog] = useState(false);

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
    },
  };

  return (
    <>
      {/* Fixed Header */}
      <Header />

      {/* Back Button */}
      <IconButton
        sx={{ position: "absolute", top: 20, left: 20, color: "#333", zIndex:999 }}
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
          minHeight: "calc(100vh - 240px)",
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
            backgroundImage: "url('/assets/motor-bg.png')",
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
            textAlign: "left",
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            border: "1px solid #6BC24A",
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
          <TextField
            fullWidth
            placeholder={translations[language].plateNumber}
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">AAA</InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            placeholder={translations[language].licenseNumber}
            sx={{ mb: 2 }}
          />
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
                  WebkitAppearance: "none", // Use camelCase
                  margin: 0,
                },
                "&[type=number]": {
                  MozAppearance: "textfield", // Use camelCase
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
              backgroundColor:"primary.main",
              color:"#fff",
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
          <Box sx={{ mt: { lg: "150px" } }}>
            {/* Car Image */}
            <Box
              sx={{ display: "flex", justifyContent: "center", width: "100%" }}
            >
              <Image
                src="/assets/toyota-land-cruiser.png"
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
              backgroundColor:"primary.main",
              color:"#fff",
            }}
          >
            <CreditCardIcon
              sx={{ mr: 1, fontSize: { xs: "20px", sm: "24px" } }}
            />
            {translations[language].securePayment}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MotorTakaful;
