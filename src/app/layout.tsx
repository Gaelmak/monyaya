import './globals.css';
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import ContextProvider from '@/components/context-provider';

export const metadata: Metadata = {
  title: 'MonYaya',
  description: '%s | MonYaya',
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
      </body>
    </html>
  );
}
