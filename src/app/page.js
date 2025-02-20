"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Typography, Button, Box } from "@mui/material";
import { motion } from "framer-motion";
import { QRCodeCanvas } from "qrcode.react";
import { useRouter } from "next/navigation";
import Header from "./components/Header";
import { useLanguage } from "@/app/contexts/LanguageContext";

export default function Home() {
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState(600);
  const [currentURL, setCurrentURL] = useState("");
  const { language } = useLanguage();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(windowWidth);
    }
  }, []);

  // Detects the page URL for QR code generation
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentURL(window.location.origin);
    }
  }, []);

  // Translations
  const translations = {
    en: {
      welcome: "Welcome to Takaful Oman",
      subtitle: "Get the best deal for your insurance",
      insuranceBtn: "Online Insurance",
      takesTime: "Takes only 2 minutes!",
      downloadText: "Download Our",
      mobileApp: "Mobile App",
    },
    ar: {
      welcome: "مرحبًا بكم في تكافل عمان",
      subtitle: "احصل على أفضل صفقة للتأمين",
      insuranceBtn: "التأمين عبر الإنترنت",
      takesTime: "يستغرق دقيقتين فقط!",
      downloadText: "قم بتنزيل",
      mobileApp: "التطبيق",
    },
  };

  return (
    <>
      {/* Header */}
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          height: "calc(100vh - 240px)",
          background: "linear-gradient(to bottom, #E3F2FD, white)",
          position: "relative",
          paddingBottom: "50px",
          overflow: "hidden",
        }}
      >
        {/* Main Content (Always Centered) */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "calc(100vh - 250px)", // Adjusted for header height
            flexGrow: 1, // Keeps it centered even when there's extra space
            px: { xs: 2, sm: 4 }, // Responsive padding
          }}
        >
          {/* Heading & Subheading */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              color="primary"
              sx={{
                mb: { xs: 1, sm: 2 },
                fontSize: { xs: "24px", sm: "32px", md: "40px" },
              }}
            >
              {translations[language].welcome}
            </Typography>
            <Typography
              variant="h6"
              color="textSecondary"
              sx={{
                mt: { xs: 1, sm: 2 },
                fontSize: { xs: "16px", sm: "20px", md: "24px" },
              }}
            >
              {translations[language].subtitle}
            </Typography>
          </motion.div>

          {/* Online Insurance Button */}
          <motion.div
            transition={{ duration: 0.2 }}
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push("/menu")}
              sx={{
                display: "flex",
                alignItems: "center",
                borderRadius: { xs: "20px", sm: "30px" },
                fontSize: { xs: "14px", sm: "18px", md: "22px" },
                fontWeight: "bold",
                py: { xs: 1.5, sm: 2 },
                px: { xs: 3, sm: 5 },
                textTransform: "none",
                backgroundColor: "primary.main",
                color: "#fff",
                mt: { xs: 3, sm: 4 },
              }}
            >
              {translations[language].insuranceBtn}
              <Image
                src="/arrow1.PNG"
                alt="Arrow Icon"
                width={24}
                height={24}
                style={{ marginLeft: 8 }}
              />
            </Button>
          </motion.div>

          {/* "Takes only 2 minutes" text */}
          <Typography
            variant="h6"
            color="textSecondary"
            sx={{ mt: { xs: 3, sm: 4 }, fontSize: { xs: "14px", sm: "18px" } }}
          >
            {translations[language].takesTime}
          </Typography>
        </Box>

        {/* QR Code & App Download (Always at Bottom Left) */}
        <Box
          sx={{
            position: "absolute",
            bottom: 20,
            left: 16,
            display: "flex",
            alignItems: "center",
            width: "auto",
          }}
        >
          {/* QR Code */}
          <Box sx={{ mr: { xs: 1, sm: 2 } }}>
            <QRCodeCanvas
              value={currentURL}
              size={windowWidth > 600 ? 90 : 80}
            />
          </Box>

          {/* Android & iPhone Icons */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography
              variant="caption"
              fontWeight="bold"
              color="textSecondary"
              sx={{ fontSize: { xs: "12px", sm: "14px" } }}
            >
              {translations[language].downloadText}
              <br />
              <span style={{ color: "#000", fontWeight: "bold" }}>
                {translations[language].mobileApp}
              </span>
            </Typography>
            <Box sx={{ display: "flex", gap: { xs: 1, sm: 2 } }}>
              <Image
                src="/android.PNG"
                alt="Android Icon"
                width={windowWidth > 600 ? 40 : 32}
                height={windowWidth > 600 ? 40 : 32}
              />
              <Image
                src="/iphone.PNG"
                alt="iPhone Icon"
                width={windowWidth > 600 ? 40 : 32}
                height={windowWidth > 600 ? 40 : 32}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
