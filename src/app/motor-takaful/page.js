"use client";

import { useState, useEffect } from "react";
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
  Radio,
  RadioGroup,
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
  const [selectedPackage, setSelectedPackage] = useState(null);

  const [qrValue, setQrValue] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setQrValue(window.origin);
    }
  }, []);

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
      selectPackage: "Select a Package",
      total: "Total",
      securePayment: "Secure Payment",
      enterName: "Enter your name:",
      namePlaceholder: "Enter name...",
      qrMessage: "Scan to complete payment",
      close: "DONE",

      packages: [
        {
          name: "Silver",
          price: "65 OMR",
          description: "Fair prices, based on your usage and protection needs",
          benefits: [
            "Medical Expenses per vehicle (3 OMR)",
            "Third party Bodily injury (0 OMR)",
            "Third Party Property Damage (62 OMR)",
          ],
        },
        {
          name: "Gold",
          price: "67.5 OMR",
          description: "Fair prices, based on your usage and protection needs",
          benefits: [
            "Medical Expenses per vehicle (3 OMR)",
            "Third party Bodily injury (0 OMR)",
            "Third Party Property Damage (62 OMR)",
            "Personal Accident Addendum (PAB) (0 OMR)",
            "UAE Extension (0 OMR)",
            "RSA Standard (2.5 OMR)",
            "Orange Card (2 OMR)",
          ],
        },
        {
          name: "Platinum",
          price: "145 OMR",
          description: "Fair prices, based on your usage and protection needs",
          benefits: [
            "Personal Accident Addendum (PAB) (0 OMR)",
            "Medical Expenses per vehicle (3 OMR)",
            "Third party Bodily injury (0 OMR)",
            "Third Party Property Damage (62 OMR)",
            "Orange Card (2 OMR)",
            "OMAN AND GCC EXTENSION (25 OMR)",
            "Nil Excess (15 OMR)",
            "Front Windshield damage (15 OMR)",
            "STF Cover (25 OMR)",
          ],
        },
      ],
    },
    ar: {
      title: "تكافل السيارات",
      plateNumber: "أدخل رقم اللوحة...",
      licenseNumber: "أدخل رقم الرخصة...",
      mobileNumber: "رقم الهاتف...",
      agreeTerms: "أوافق على الشروط والأحكام.",
      agreeWhatsapp: "أوافق على تلقي التحديثات عبر الواتساب.",
      proceed: "متابعة",
      selectPackage: "اختر باقة",
      total: "الإجمالي",
      securePayment: "دفع آمن",
      enterName: "أدخل اسمك:",
      namePlaceholder: "أدخل الاسم...",
      qrMessage: "امسح لإتمام الدفع",
      close: "تم",

      packages: [
        {
          name: "فضي",
          price: "65 ريال",
          description: "أسعار عادلة، بناءً على استخدامك واحتياجاتك للحماية",
          benefits: [
            "المصاريف الطبية لكل مركبة (3 ريال)",
            "إصابة جسدية للطرف الثالث (0 ريال)",
            "أضرار الممتلكات للطرف الثالث (62 ريال)",
          ],
        },
        {
          name: "ذهبي",
          price: "67.5 ريال",
          description: "أسعار عادلة، بناءً على استخدامك واحتياجاتك للحماية",
          benefits: [
            "المصاريف الطبية لكل مركبة (3 ريال)",
            "إصابة جسدية للطرف الثالث (0 ريال)",
            "أضرار الممتلكات للطرف الثالث (62 ريال)",
            "إضافة الحوادث الشخصية (PAB) (0 ريال)",
            "تمديد الإمارات (0 ريال)",
            "RSA القياسي (2.5 ريال)",
            "بطاقة برتقالية (2 ريال)",
          ],
        },
        {
          name: "بلاتيني",
          price: "145 ريال",
          description: "أسعار عادلة، بناءً على استخدامك واحتياجاتك للحماية",
          benefits: [
            "إضافة الحوادث الشخصية (PAB) (0 ريال)",
            "المصاريف الطبية لكل مركبة (3 ريال)",
            "إصابة جسدية للطرف الثالث (0 ريال)",
            "أضرار الممتلكات للطرف الثالث (62 ريال)",
            "بطاقة برتقالية (2 ريال)",
            "تمديد عمان والخليج (25 ريال)",
            "الخصم الصفري (15 ريال)",
            "أضرار الزجاج الأمامي (15 ريال)",
            "تغطية STF (25 ريال)",
          ],
        },
      ],
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
                borderColor: "#6BC24A",
              },
              "&:focus-within": {
                borderColor: "#6BC24A",
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

      {/* Package Selection Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogContent sx={{ textAlign: "center", p: 4, userSelect: "none" }}>
          {/* Car Image */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Image
              src="/toyota.PNG"
              alt="Toyota Land Cruiser"
              width={300}
              height={180}
            />
          </Box>

          <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
            {translations[language].selectPackage}
          </Typography>

          {/* Responsive Package Layout */}
          <RadioGroup
            value={selectedPackage?.name || ""}
            onChange={(event) => {
              const selectedPkg = translations[language].packages.find(
                (pkg) => pkg.name === event.target.value
              );
              setSelectedPackage(selectedPkg);
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 2,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {translations[language].packages.map((pkg, index) => (
                <Box
                  key={index}
                  onClick={() => setSelectedPackage(pkg)}
                  sx={{
                    flex: { xs: "1", md: "0 1 30%" },
                    border:
                      selectedPackage?.name === pkg.name
                        ? "3px solid #6BC24A"
                        : "2px solid #ccc",
                    borderRadius: "12px",
                    p: 3,
                    textAlign: "left",
                    backgroundColor: "#F9F9F9",
                    transition: "0.3s",
                    cursor: "pointer",
                    "&:hover": { boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" },
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    position: "relative",
                  }}
                >
                  {/* Radio Button (Positioned in Top Right) */}
                  <Radio
                    value={pkg.name}
                    checked={selectedPackage?.name === pkg.name}
                    onChange={() => setSelectedPackage(pkg)}
                    sx={{ position: "absolute", top: 10, right: 10 }}
                  />

                  {/* Package Name */}
                  <Typography variant="h6" fontWeight="bold" color="primary">
                    {pkg.name}
                  </Typography>

                  {/* Description */}
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    sx={{ mb: 1 }}
                  >
                    {pkg.description}
                  </Typography>

                  {/* Price */}
                  <Typography variant="h6" fontWeight="bold">
                    {pkg.price}
                  </Typography>

                  {/* Benefits List */}
                  <Box sx={{ mt: 1 }}>
                    {pkg.benefits.map((benefit, i) => (
                      <Typography
                        key={i}
                        variant="body2"
                        sx={{ display: "flex", alignItems: "center", mt: 2 }}
                      >
                        <span
                          style={{
                            color: "green",
                            fontSize: "16px",
                            marginRight: "8px",
                          }}
                        >
                          ✓
                        </span>
                        {benefit}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          </RadioGroup>

          {/* Proceed to Payment Button (Only Enabled When a Package is Selected) */}
          <Button
            variant="contained"
            disabled={!selectedPackage}
            onClick={() => {
              setOpenDialog(false);
              setOpenQRDialog(true);
            }}
            sx={{
              mt: 3,
              borderRadius: "20px",
              fontWeight: "bold",
              py: 1.5,
              width: {xs:"100%",md:"40%"},
              backgroundColor: selectedPackage ? "primary.main" : "#ccc",
              color: "#fff",
              cursor: selectedPackage ? "pointer" : "not-allowed",
            }}
          >
            {translations[language].securePayment}
          </Button>
        </DialogContent>
      </Dialog>

      {/* QR Code Dialog */}
      <Dialog open={openQRDialog} onClose={() => setOpenQRDialog(false)}>
        <DialogContent
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 4,
            minWidth: { xs: "90%", sm: "400px" },
          }}
        >
          {/* Enter Name Section */}
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            {translations[language].enterName}
          </Typography>
          <TextField
            placeholder={translations[language].namePlaceholder}
            fullWidth
            sx={{
              mb: 3,
              "& .MuiInputBase-root": {
                borderRadius: "8px",
                backgroundColor: "rgba(0, 0, 0, 0.05)",
                "& input": { textAlign: "center" },
              },
            }}
          />

          {/* QR Code Section */}
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            {translations[language].qrMessage}
          </Typography>
          <QRCodeCanvas
            value={qrValue}
            size={200}
            style={{ marginBottom: "20px" }}
          />

          {/* Done Button */}
          <Button
            fullWidth
            variant="contained"
            onClick={() => router.push("/")}
            sx={{
              mt: 3,
              borderRadius: "8px",
              fontWeight: "bold",
              textTransform: "none",
              py: 1.5,
              backgroundColor: "#A4C754",
              "&:hover": { backgroundColor: "#88A34D" },
            }}
          >
            {translations[language].close}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MotorTakaful;
