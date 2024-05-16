import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Roboto_Condensed } from "next/font/google";
import Navbar from "@/components/Navbar";
import { NextUI } from "@/components/NextUI";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import OpeningHoursCTA from "@/components/OpeningHoursCTA";
import ToastProvider from "@/lib/react-toastify/ToastProvider";

const roboto = Roboto_Condensed({
  weight: ["300", "400", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "SFC Colchester - Neighbourhood Hero in Fried Chicken Delivery & Takeaway",
  description:
    "Order Colchester's best fried chicken online! Freshly prepared, halal options, speedy delivery, or collect for exclusive offers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <NextUI>
          <ClerkProvider>
            <Navbar />
            <Banner />
            <ToastProvider>{children}</ToastProvider>
            <OpeningHoursCTA />
            <Footer />
          </ClerkProvider>
        </NextUI>
      </body>
    </html>
  );
}
