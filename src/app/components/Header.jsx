import Image from "next/image";
import { Box } from "@mui/material";
import LanguageSelector from "@/app/components/LanguageSelector";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  return (
    <>
      {/* Sticky Header (Not Fixed) */}
      <Box
        sx={{
          width: "100%",
          position: "relative",
          top: 0,
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          pt: 2,
        }}
      >
        {/* Language Selector (Top-Right) */}
        <Box sx={{ width: "100%", position:"relative"}}>
          <LanguageSelector />
        </Box>

        {/* Logo at the Center (Scalable) */}
        <Box
          onClick={() => router.push("/")}
          sx={{
            display: "flex",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <Image
            src="/logo-takaful.PNG"
            alt="Takaful Oman Logo"
            width={130}
            height={200}
            priority
            style={{
              width: "auto",
              height: "auto",
              maxWidth: "100%",
              maxHeight: "150px",
              minHeight: "80px",
              objectFit: "contain",
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Header;
