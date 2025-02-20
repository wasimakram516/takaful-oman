"use client";

import { useState, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Header from "@/app/components/Header";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLanguage } from "@/app/contexts/LanguageContext";

const RegisterClaim = () => {
  const router = useRouter();
  const { language } = useLanguage();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const otpInputRefs = useRef([]);

  // Handle OTP Change
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

  // Translations
  const translations = {
    en: {
      title: "Register Claim",
      mobileNumber: "Mobile number...",
      enterOtp: "Enter OTP:",
      login: "LOGIN",
    },
    ar: {
      title: "تسجيل مطالبة",
      mobileNumber: "رقم الهاتف...",
      enterOtp: "أدخل رمز OTP:",
      login: "تسجيل الدخول",
    },
  };

  return (
    <>
      {/* Fixed Header */}
      <Header />

      {/* Back Button */}
      <IconButton
        sx={{ position: "absolute", top: 20, left: 20, color: "#333", zIndex: 999 }}
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
            backgroundImage: "url('/assets/RegClaim/claim-bg.png')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom",
          }}
        />

        {/* Form Container */}
        <Box
          sx={{
            width: { xs: "90%", sm: "500px" },
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
                      px: 1.5,
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

          {/* OTP Input Fields */}
          <Typography
            variant="body1"
            fontWeight="bold"
            align="center"
            sx={{ mt: 2, mb: 1 }}
          >
            {translations[language].enterOtp}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 1.5,
              mb: 3,
            }}
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
                    "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
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
          </Box>

          {/* Login Button */}
          <Button
            variant="contained"
            fullWidth
            onClick={()=>router.push("register-claim/details")}
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
    </>
  );
};

export default RegisterClaim;