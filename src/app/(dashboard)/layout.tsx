"use client";
import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { ScrollToTop } from "@/providers/ScrollToTop";
import { useSession } from "next-auth/react";
import LoadingSpinner from "@/components/loading/LoadingSpinner";

const manrope = Manrope({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <html lang="en">
        <body className={`${manrope.className} layout`}>
          <LoadingSpinner overlay message="Yükleniyor..." /> 
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className={`${manrope.className} layout`}>
        <ScrollToTop />
        <Header />
        <main className="content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
