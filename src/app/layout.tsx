import "./globals.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { AuthProvider } from "./auth-provider";

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
    <html lang="fr" className="notranslate">
      <AuthProvider>
        <body className={GeistSans.className}>{children}</body>
      </AuthProvider>
    </html>
  );
}
