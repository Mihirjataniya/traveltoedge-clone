'use client'
import { Send } from 'lucide-react';
import React from 'react';
import './Page1.css'
import Link from "next/link";
import Image from 'next/image';

const Page1 = () => {
  const text = "BEYOND DESTINATIONS, INTO DISCOVERY".split("");

  return (
    <div className="h-screen max-h-[800px] my-4 relative -mt-20"> {/* Add negative margin top */}
      <div className="w-full relative h-[100%] max-h-[800px] flex flex-col items-center justify-center gap-8 md:gap-12 fade-in-down overflow-hidden pt-20">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="https://images.unsplash.com/photo-1617380613434-7495e9b45dfb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
          onCanPlayThrough={(e) => {
            e.target.play().catch(error => {
              console.log("Playback failed:", error);
            });
          }}
        >
          <source src="https://res.cloudinary.com/dpc5gwlvv/video/upload/q_auto:best,f_auto/v1745754455/IMG_1358_trwqei.mp4" type="video/mp4" />
          <source src="https://res.cloudinary.com/dpc5gwlvv/video/upload/q_auto:best,f_auto,f_webm/v1745754455/IMG_1358_trwqei.mp4" type="video/webm" />
          Your browser does not support the video tag.
        </video>


        {/* Foreground Content - shifted down to make room for navbar */}
        <p className="text-white text-2xl sm:text-3xl md:text-5xl xl:text-6xl text-shadow-md tracking-wide text-center font-bold">
          <div className="flex flex-col items-center">
            <div className="flex">
              {"BEYOND DESTINATIONS,".split("").map((char, i) => (
                <span key={`line1-${i}`} className="letter-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
            <div className="flex">
              {"INTO DISCOVERY".split("").map((char, i) => (
                <span key={`line2-${i}`} className="letter-fade-in" style={{ animationDelay: `${(i + 20) * 50}ms` }}>
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
          </div>

        </p>

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