"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Header from "@/app/components/Header";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { motion } from "framer-motion";

export default function ComingSoon() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { language } = useLanguage();

  // State to hold the service name
  const [service, setService] = useState("Takaful");

  // Use effect to update service only on the client-side
  useEffect(() => {
    if (searchParams.get("service")) {
      setService(searchParams.get("service"));
    }
  }, [searchParams]);

  // Translations
  const translations = {
    en: {
      title: `${service}`,
      comingSoon: "This service is coming soon.",
      back: "Back",
    },
    ar: {
      title: `${service} تكافل`,
      comingSoon: "هذه الخدمة ستتوفر قريباً.",
      back: "رجوع",
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
            backgroundImage: "url('/insurance-man.PNG')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom",
          }}
        />

        {/* "Coming Soon" Card */}
        <Box
          sx={{
            width: { xs: "90%", sm: "500px" },
            backgroundColor: "rgba(255,255,255,0.6)",
            borderRadius: 3,
            padding: 3,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            textAlign: "center",
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
            border: "1px solid #6BC24A",
          }}
        >
          {/* Title */}
          <Typography variant="h6" fontWeight="bold" color="primary">
            {translations[language].title}
          </Typography>

          {/* Coming Soon Message with Animation */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <Typography variant="body1" color="#0077B6" sx={{ mt: 2 }}>
                {translations[language].comingSoon}
              </Typography>
            </motion.div>
          </motion.div>
        </Box>
      </Box>
    </>
  );
}
