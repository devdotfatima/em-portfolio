import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { PrimeReactProvider } from "primereact/api";

import "primereact/resources/themes/lara-light-cyan/theme.css";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Emelina",
  description:
    "A showcase of stunning photography by Emelina. Explore captivating landscapes, portraits, and more.",

  keywords: ["photography", "portfolio", "photographer", "art", "gallery"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <PrimeReactProvider>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <body className={inter.className}>{children}</body>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </PrimeReactProvider>
    </html>
  );
}
