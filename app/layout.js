import Footer from "@/components/Footer";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Montserrat } from "next/font/google";
import Loading from "@/components/Loading";
import Script from 'next/script';
import TravelChatbot from "@/components/Chatbot";

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
        <Script
          id="gtm-head"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-PTXZPFGS');
          `,
          }}
        />
      </head>
      <body
        className={`${montserrat.className} antialiased w-full relative mx-auto flex flex-col`}
      >
        <Loading />
        <Navbar />
        <div className="">
          {children}
        </div>
        <TravelChatbot />
        <Footer />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PTXZPFGS"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
      </body>
    </html>
  );
}