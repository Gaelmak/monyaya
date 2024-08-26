import "./globals.css";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { AuthProvider } from "./auth-provider";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MonYaya",
  description: "%s | MonYaya",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <AuthProvider>
        <body className={poppins.className}>{children}</body>
      </AuthProvider>
    </html>
  );
}
