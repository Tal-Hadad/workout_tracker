import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/footer/Footer";
import AuthProvider from "./components/auth/AuthProvider/AuthProvider";
import LoginButton from "./components/auth/LoginButton/LoginButton";
import ServiceWorkerRegister from "./components/pwa/ServiceWorkerRegister/ServiceWorkerRegister";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WorkoutTracker",
  description: "Professional Workout Tracker",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "WorkoutTracker",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=account_circle,add_2,arrow_drop_down,arrow_drop_up,calendar_today,close,delete,edit,exercise,filter_alt,history,timer"
          precedence="default"
        />
      </head>
      <body>
        <AuthProvider>
          <ServiceWorkerRegister />
          <LoginButton />

          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
