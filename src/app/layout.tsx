import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/footer";
import { Montserrat } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Header from "@/components/header";
import Providers from "../components/SessionProvider";
import HeaderContent from "@/components/header";

export const metadata: Metadata = {
  title: "PurePalate2.0",
  description: "Generated by create next app",
};

const montserrat = Montserrat({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" sizes="any" />
      </head>
      <body className={`${montserrat.className}`}>
        <Providers>
          <main className="grid grid-cols-1 grid-rows-[100px_1fr_100px] min-h-screen">
            <HeaderContent />
            {children}
            <Toaster position="top-center" />
            <Footer />
          </main>
        </Providers>
      </body>
    </html>
  );
}



