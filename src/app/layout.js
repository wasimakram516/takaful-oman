import ThemeRegistry from "@/styles/ThemeRegistry";
import { LanguageProvider } from "./contexts/LanguageContext";
import "@/styles/global.css";
import { Nunito, Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const nunito = Nunito({
  weight: ["300", "400", "600"],
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata = {
  title: "Takaful Oman",
  description: "Get the best deal for your insurance.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${nunito.variable}`}>
        {/* Wrap everything inside LanguageProvider */}
        <LanguageProvider>
          <ThemeRegistry>{children}</ThemeRegistry>
        </LanguageProvider>
      </body>
    </html>
  );
}
