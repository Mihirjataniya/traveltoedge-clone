import { Send, Play } from 'lucide-react';
import React from 'react';
import './Page1.css'
import Link from "next/link";
import Image from 'next/image';

const Page1 = () => {
  const text = "EXPLORE THE THRILL".split("");

  return (
    <div className=" manual-height max-h-[800px] my-4">
      <div className="w-full hero-component h-64 md:h-[68%] max-h-[800px] rounded-4xl flex flex-col items-center justify-center gap-8 md:gap-12 fade-in-down">
        <p className="text-white text-[27px] md:text-5xl xl:text-8xl tracking-wide text-nowrap font-bold text-center">
          {text.map((char, i) => (
            <span key={i} className="letter-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </p>
        <Link href={'/contact-us'} className="flex items-center justify-between gap-4 sm:gap-6 backdrop-blur-md bg-white/20 text-white border border-white/40 px-6 sm:px-8 rounded-2xl transition-all duration-300 hover:bg-white/30 hover:border-white/60 fade-in-up">
          <span className="font-semibold text-sm md:text-xl py-2 md:py-3">ENQUIRE NOW</span>
          <div className="h-6 w-[2px] bg-white opacity-50"></div>
          <div className="flex items-center justify-center">
            <Send className="h-6 w-6 sm:h-7 sm:w-7 rotate-12" />
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 mt-3">
        {/* Card 1: Slide from left */}
        <div
          className="md:col-span-3 relative w-full h-[100px] md:h-[200px] rounded-3xl overflow-hidden group cursor-pointer slide-in-left fade-in-up"
          style={{ animationDelay: '600ms' }}
        >
          <Image
            src="/Mountain-night.jpg"
            alt="Mountain vista"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-md rounded-full p-4 shadow-lg hover:scale-110 transition-transform">
              <Play className="h-8 w-8 text-white group-hover:text-[#003B4A]" />
            </div>
          </div>
        </div>

        {/* Text Block: Slide from right */}
        <div
          className="md:col-span-6 bg-[#03435e] text-white p-4 md:p-10 rounded-3xl max-h-[100px] md:max-h-[200px] flex items-center slide-in-right fade-in-up"
          style={{ animationDelay: '800ms' }}
        >
          <p className="text-xs md:text-base xl:text-xl leading-relaxed">
            Discover new horizons and explore the world like never before. From serene beaches to towering peaks, every journey is an adventure, every moment a memory. Let your travels begin ✈️🌍
          </p>
        </div>

        {/* Card 3: Slide from left */}
        <div
          className="md:col-span-3 relative h-[100px] md:h-[200px] rounded-3xl overflow-hidden slide-in-left fade-in-up"
          style={{ animationDelay: '1000ms' }}
        >
          <Image
            src="/Beach.jpg"
            alt="Beach with people"
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
      </div>

    </div>
  );
};

export default Page1;