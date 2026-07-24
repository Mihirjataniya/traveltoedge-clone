'use client'
import { Send } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import './Page1.css'
import Link from "next/link";
import Image from 'next/image';
import { heroImages } from './heroImages';

const ROTATION_INTERVAL = 10 * 60 * 1000; // 10 minutes

// initialImage is chosen on the server so the very first paint already shows the
// right picture. Picking it on the client cannot work: the browser paints the
// server HTML before React hydrates, so any client-side choice is visible as a
// swap.
const Page1 = ({ initialImage = 0 }) => {
  const [activeImage, setActiveImage] = useState(initialImage);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % heroImages.length);
    }, ROTATION_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen my-4 relative -mt-20"> {/* Add negative margin top */}
      <div className="w-full relative h-[100%] flex flex-col items-center justify-center gap-8 md:gap-12 fade-in-down overflow-hidden pt-20">
        <div className="absolute top-0 left-0 w-full h-full z-[-1]">
          {heroImages.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt=""
              fill
              priority
              sizes="100vw"
              className={`object-cover transition-opacity duration-1000 ${i === activeImage ? "opacity-100" : "opacity-0"
                }`}
            />
          ))}

          {/* Thin scrim so the white headline stays legible over any image */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
        </div>


        {/* Foreground Content - shifted down to make room for navbar */}
        {/* Spans, not divs: block elements are invalid inside a heading or
            paragraph, and the parser's auto-correction breaks hydration. */}
        <h1 className="text-white text-2xl sm:text-3xl md:text-5xl xl:text-6xl 3xl:text-8xl text-shadow-md tracking-wide text-center font-bold">
          <span className="flex flex-col gap-6 items-center">
            <span className="flex">
              {"BEYOND DESTINATIONS,".split("").map((char, i) => (
                <span key={`line1-${i}`} className="letter-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
            <span className="flex">
              {"INTO DISCOVERY".split("").map((char, i) => (
                <span key={`line2-${i}`} className="letter-fade-in" style={{ animationDelay: `${(i + 20) * 50}ms` }}>
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
          </span>
        </h1>

        <Link href={'/contact-us'} className="flex items-center justify-between gap-4 sm:gap-6 backdrop-blur-md bg-white/20 text-white border border-white/40 px-6 sm:px-8 rounded-2xl transition-all duration-300 hover:bg-white/30 hover:border-white/60 fade-in-up">
          <span className="font-semibold text-sm md:text-xl py-2 md:py-3">ENQUIRE NOW</span>
          <div className="h-6 w-[2px] bg-white opacity-50"></div>
          <div className="flex items-center justify-center">
            <Send className="h-6 w-6 sm:h-7 sm:w-7 rotate-12" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Page1;