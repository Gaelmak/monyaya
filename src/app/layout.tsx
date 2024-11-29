import "./globals.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import ContextProvider from "@/components/context-provider";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Monyaya",
  description: "%s | Monyaya",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={GeistSans.className}>
        <ContextProvider>{children}</ContextProvider>
        <Script
          src="https://static.elfsight.com/platform/platform.js"
          strategy="afterInteractive"
        ></Script>
        <div
          className="elfsight-app-bbc42db3-5562-4490-a0e6-566aa2664599"
          data-elfsight-app-lazy
        ></div>
      </body>
    </html>
  );
}
