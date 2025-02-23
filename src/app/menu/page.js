"use client";

import { Box, Typography, Grid, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Header from "../components/Header";
import Image from "next/image";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { motion } from "framer-motion";

const Menu = () => {
  const router = useRouter();
  const { language } = useLanguage();

  // Translations
  const translations = {
    en: {
      selectInsurance: "Select Insurance to Start",
      comingSoon: "Coming Soon",
      startsAt: "Starts at",
      startsAtRO6: "Starts at RO 6",
    },
    ar: {
      selectInsurance: "حدد التأمين للبدء",
      comingSoon: "قريبًا",
      startsAt: "يبدأ من",
      startsAtRO6: "يبدأ من ٦ ريال",
    },
  };

  // Insurance Options (Including Translations)
  const insuranceOptions = [
    {
      id: "motor-takaful",
      title: { en: "Motor Takaful", ar: "تكافل السيارات" },
      image: "/motor-menu.PNG",
      startsAt: "36/yr",
    },
    {
      id: "travel-takaful",
      title: { en: "Travel Takaful", ar: "تكافل السفر" },
      image: "/travel-menu.PNG",
      startsAt: "RO 6",
    },
    {
      id: "health-takaful",
      title: { en: "Health Takaful", ar: "تكافل الصحة" },
      image: "/health-menu.PNG",
      startsAt: "coming-soon",
    },
    {
      id: "helpers-takaful",
      title: { en: "Helpers Takaful", ar: "تكافل العمالة المنزلية" },
      image: "/workers-menu.PNG",
      startsAt: "coming-soon",
    },
    {
      id: "register-claim",
      title: { en: "Register Claim", ar: "تسجيل مطالبة" },
      image: "/reg-claim-menu.PNG",
    },
    {
      id: "property-takaful",
      title: { en: "Property Takaful", ar: "تكافل الممتلكات" },
      image: "/property-menu.PNG",
      startsAt: "coming-soon",
    },
  ];

  // Handle Click on Insurance Cards
  const handleClick = (id, title) => {
    if (id === "motor-takaful" || id === "register-claim") {
      router.push(`/${id}`);
    } else {
      router.push(
        `/coming-soon?service=${encodeURIComponent(title[language])}`
      );
    }
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
          minHeight: "calc(100vh - 170px)",
          background: "linear-gradient(to bottom, #E3F2FD, white)",
          paddingBottom: 4,
        }}
      >
        <IconButton
          sx={{
            position: "absolute",
            top: 20,
            left: 20,
            color: "#333",
            zIndex: 999,
          }}
          onClick={() => router.push("/")}
        >
          <ArrowBackIcon />
        </IconButton>
        {/* Insurance Menu */}
        <Box
          sx={{
            width: "100%",
            maxWidth: "900px",
            backgroundColor: "#F5F9FF",
            borderRadius: 3,
            padding: { xs: 2, sm: 3 },
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            mt: { xs: 14, sm: 16 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            align="center"
            sx={{ mb: 3, fontSize: { xs: "18px", sm: "22px", md: "24px" } }}
          >
            {translations[language].selectInsurance}
          </Typography>

          <Grid container spacing={3} justifyContent="center">
            {insuranceOptions.map((option, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                key={option.id}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Box
                    onClick={() => handleClick(option.id, option.title)}
                    sx={{
                      position: "relative",
                      cursor: "pointer",
                      transition: "transform 0.2s ease-in-out",
                      "&:hover": { transform: "scale(1.05)" },
                      width: { xs: "240px", sm: "250px", md: "260px" },
                      height: { xs: "240px", sm: "250px", md: "260px" },
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 2,
                      borderRadius: "16px",
                      backgroundColor: "#fff",
                      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.15)",
                    }}
                  >
                    {/* Starts At Badge (Top Right) */}
                    {option.startsAt && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: -10,
                          right: 10,
                          backgroundColor: "primary.main",
                          color: "#fff",
                          px: 1.5,
                          py: 0.5,
                          borderRadius: "8px",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      >
                        {option.startsAt === "RO 6"
                          ? translations[language].startsAtRO6
                          : option.startsAt === "coming-soon"
                          ? translations[language].comingSoon
                          : `${translations[language].startsAt} ${option.startsAt}`}
                      </Box>
                    )}

                    {/* Insurance Image */}
                    <Image
                      src={option.image}
                      alt={option.title[language]}
                      width={180}
                      height={180}
                      priority
                      unoptimized
                      sx={{
                        width: "180px",
                        height: "180px",
                        borderRadius: "12px",
                        objectFit: "cover",
                      }}
                    />

                    {/* Title Below Image */}
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      sx={{ fontSize: { xs: "14px", sm: "16px" }, mt: 1 }}
                    >
                      {option.title[language]}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Menu;
