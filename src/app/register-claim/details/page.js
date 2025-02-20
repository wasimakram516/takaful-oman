"use client";

import { useRouter } from "next/navigation";
import { Box, Typography, Button, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Header from "@/app/components/Header";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { motion } from "framer-motion";

export default function Details() {
  const router = useRouter();
  const { language } = useLanguage();

  // Translations
  const translations = {
    en: {
      title: "Details",
      policyNo: "Policy No:",
      starts: "Starts:",
      ends: "Ends:",
      name: "Name:",
      coverage: "Coverage:",
      newClaim: "NEW CLAIM",
      coverageDetails: [
        "Own Damage",
        "Personal Accident Addendum (PAB)",
        "Medical Expenses per vehicle",
        "Third Party Bodily Injury",
        "Third Party Property Damage (OD)",
        "Front Windshield Damage",
        "STF Cover",
      ],
    },
    ar: {
      title: "التفاصيل",
      policyNo: "رقم الوثيقة:",
      starts: "تبدأ:",
      ends: "تنتهي:",
      name: "الاسم:",
      coverage: "التغطية:",
      newClaim: "تقديم مطالبة",
      coverageDetails: [
        "ضرر المركبة",
        "إضافة الحادث الشخصي (PAB)",
        "النفقات الطبية لكل مركبة",
        "إصابة جسدية لطرف ثالث",
        "ضرر الممتلكات للطرف الثالث (OD)",
        "تلف الزجاج الأمامي",
        "تغطية STF",
      ],
    },
  };

  return (
    <>
      {/* Fixed Header */}
      <Header />

      {/* Back Button */}
      <IconButton
        sx={{ position: "absolute", top: 20, left: 20, color: "#333", zIndex: 999 }}
        onClick={() => router.push("/register-claim")}
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
            backgroundImage: "url('/assets/insurance-man.png')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom",
          }}
        />

        {/* Details Card */}
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
            transform: "translate(-50%, -50%)",
            border: "1px solid #6BC24A",
            zIndex: 10,
          }}
        >
          {/* Title */}
          <Typography variant="h6" fontWeight="bold" align="center" sx={{ mb: 2 }}>
            {translations[language].title}
          </Typography>

          {/* Policy Details */}
          <Typography variant="body1" fontWeight="bold" sx={{ mb: 1 }}>
            {translations[language].policyNo}{" "}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              style={{ color: "#0077B6", cursor: "pointer", fontWeight: "bold" }}
            >
              P/100/1010/2025/00009
            </motion.span>
          </Typography>
          <Typography variant="body1">
            {translations[language].starts}{" "}
            <motion.span style={{ color: "#0077B6", fontWeight: "bold" }}>
              18-2-2025
            </motion.span>{" "}
            | {translations[language].ends}{" "}
            <motion.span style={{ color: "#0077B6", fontWeight: "bold" }}>
              17-2-2026
            </motion.span>
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {translations[language].name}{" "}
            <motion.span
              style={{ color: "#0077B6", fontWeight: "bold", cursor: "pointer" }}
            >
              Mr. Ahmed Al Harthy
            </motion.span>
          </Typography>

          {/* Coverage Section */}
          <Typography variant="body1" fontWeight="bold" sx={{ mt: 2, mb: 1 }}>
            {translations[language].coverage}
          </Typography>
          <Box
            sx={{
              backgroundColor: "#EDEDED",
              padding: 2,
              borderRadius: 2,
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            {translations[language].coverageDetails.map((item, index) => (
              <Typography key={index} variant="body2" sx={{ lineHeight: 1.5 }}>
                • {item}
              </Typography>
            ))}
          </Box>

          {/* New Claim Button */}
          <Button
            variant="contained"
            fullWidth
            onClick={() => router.push("/register-claim/details/new")}
            sx={{
              mt: 3,
              borderRadius: "20px",
              fontWeight: "bold",
              textTransform: "none",
              py: 1.5,
              fontSize: "16px",
              backgroundColor: "#BFD85F",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#A4C754",
              },
            }}
          >
            {translations[language].newClaim}
          </Button>
        </Box>
      </Box>
    </>
  );
}
