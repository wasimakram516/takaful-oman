"use client";

import { useState, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Header from "@/app/components/Header";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLanguage } from "@/app/contexts/LanguageContext";

const RegisterClaim = () => {
  const router = useRouter();
  const { language } = useLanguage();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const otpInputRefs = useRef([]);

  // Handle OTP Input
  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to the next input if a digit is entered
    if (value && index < otp.length - 1) {
      otpInputRefs.current[index + 1].focus();
    }
  };

  // Open OTP Dialog
  const handleLogin = () => {
    if (phoneNumber.length >= 8) {
      setOtpDialogOpen(true);
    } else {
      alert("Please enter a valid phone number.");
    }
  };

  // Confirm OTP & Proceed
  const handleOtpConfirm = () => {
    if (otp.join("").length === 4) {
      setOtpDialogOpen(false);
      router.push("/register-claim/details");
    } else {
      alert("Please enter a valid 4-digit OTP.");
    }
  };

  // Translations
  const translations = {
    en: {
      title: "Register Claim",
      mobileNumber: "Mobile number...",
      enterOtp: "Enter OTP",
      login: "LOGIN",
      confirmOtp: "CONFIRM OTP",
      invalidPhone: "Please enter a valid phone number.",
      invalidOtp: "Please enter a valid 4-digit OTP.",
    },
    ar: {
      title: "تسجيل مطالبة",
      mobileNumber: "رقم الهاتف...",
      enterOtp: "أدخل رمز OTP",
      login: "تسجيل الدخول",
      confirmOtp: "تأكيد OTP",
      invalidPhone: "الرجاء إدخال رقم هاتف صالح.",
      invalidOtp: "الرجاء إدخال رمز OTP مكون من 4 أرقام.",
    },
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
        {/* Background Image */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            width: "100%",
            height: { xs: "35%", sm: "40%" },
            backgroundImage: "url('/claim-bg.PNG')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom",
          }}
        />

        {/* Form Container */}
        <Box
          sx={{
            width: { xs: "90%", sm: "400px" },
            backgroundColor: "rgba(255,255,255,0.9)",
            borderRadius: 3,
            padding: 3,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
            border: "1px solid #6BC24A",
            userSelect: "none",
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

          {/* Mobile Number Field */}
          <TextField
            fullWidth
            type="number"
            placeholder={translations[language].mobileNumber}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            sx={{
              mb: 2,
              "& .MuiInputBase-input": {
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
                      px: 1.5,
                      py: 0.5,
                      fontWeight: "bold",
                    }}
                  >
                    +968
                  </Box>
                </InputAdornment>
              ),
            }}
          />

          {/* Login Button */}
          <Button
            variant="contained"
            fullWidth
            onClick={handleLogin}
            sx={{
              mt: 2,
              borderRadius: "20px",
              fontWeight: "bold",
              textTransform: "none",
              py: 1.5,
              fontSize: "16px",
              backgroundColor: "primary.main",
              color: "#fff",
            }}
          >
            {translations[language].login}
          </Button>
        </Box>
      </Box>

      {/* OTP Dialog */}
      <Dialog open={otpDialogOpen} onClose={() => setOtpDialogOpen(false)}>
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
          {translations[language].enterOtp}
        </DialogTitle>
        <DialogContent
          sx={{ display: "flex", justifyContent: "center", gap: 1.5 }}
        >
          {otp.map((digit, index) => (
            <TextField
              key={index}
              value={digit}
              type="number"
              onChange={(e) => handleOtpChange(index, e.target.value)}
              inputRef={(ref) => (otpInputRefs.current[index] = ref)}
              sx={{
                width: "60px",
                "& .MuiInputBase-input": {
                  textAlign: "center",
                  fontSize: "18px",
                  fontWeight: "bold",
                  // Hide spinners for number input
                  "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button":
                    {
                      WebkitAppearance: "none", // Use camelCase
                      margin: 0,
                    },
                  "&[type=number]": {
                    MozAppearance: "textfield", // Use camelCase
                  },
                },
              }}
              inputProps={{ maxLength: 1 }}
            />
          ))}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button
            onClick={handleOtpConfirm}
            variant="contained"
            sx={{
              borderRadius: "20px",
              fontWeight: "bold",
              textTransform: "none",
              py: 1,
              fontSize: "14px",
              backgroundColor: "primary.main",
              color: "#fff",
            }}
          >
            {translations[language].confirmOtp}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RegisterClaim;
