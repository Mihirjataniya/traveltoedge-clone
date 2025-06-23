import Footer from "@/components/Footer";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Montserrat } from "next/font/google";
import Loading from "@/components/Loading";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "Travel To Edge",
  description: "Travel To Edge turns your travel dreams into reality with curated adventures, personalized tours, and unforgettable journeys across the world.",
  icons: {
    icon: "/LOGO.png",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="s-fqZXZzhxCboLfhN4WNtXWKmt5I-6zzS5GC3DaQdPo" />
      </head>
      <body
        className={`${montserrat.className} antialiased w-full relative mx-auto flex flex-col`}
      >
        <Loading />
        <Navbar />
        <div className="">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}