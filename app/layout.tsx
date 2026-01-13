import type { Metadata } from "next";
import "./globals.css";
import AppShell from "./components/layout/AppShell";

export const metadata: Metadata = {
  title: "BillTrack Pro",
  description: "Professional Invoice Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600;700;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
      </head>
      <body className="bg-slate-900 text-slate-300 min-h-screen selection:bg-amber-500/30 selection:text-amber-200">
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
