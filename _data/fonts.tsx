import localFont from "next/font/local";

export const useMont = localFont({
  src: "../assets/fonts/montserrat-latin-wght-normal.woff2",
  variable: "--font-montserrat",
  weight: "100 900",
  display: "swap",
});
