import "./globals.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import ContextProvider from "@/components/context-provider";
import Script from "next/script";
import CSPostHogProvider from "@/app/posthog-provider";
import dynamic from "next/dynamic";

const PostHogPageView = dynamic(() => import("@/app/posthog-pageview"), {
  ssr: false,
});

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
      <CSPostHogProvider>
        <body className={GeistSans.className}>
          <PostHogPageView />
          <ContextProvider>{children}</ContextProvider>
          <Script
            src="https://static.elfsight.com/platform/platform.js"
            strategy="afterInteractive"
          ></Script>
          <div
            className="elfsight-app-1ff6155e-2a0d-4340-889f-65685215b028"
            data-elfsight-app-lazy
          ></div>
        </body>
      </CSPostHogProvider>
    </html>
  );
}
