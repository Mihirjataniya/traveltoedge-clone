"use client";
import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { Plane, Hotel, Map, Navigation, Mountain } from "lucide-react";
import { motion, useInView, useAnimation } from "framer-motion";
import Link from 'next/link';

const Page2 = () => {
    const stats = [
        { number: 150, label: "Destinations", icon: <Mountain className="w-6 h-6" /> },
        { number: 250, label: "Hotels", icon: <Hotel className="w-6 h-6" /> },
        { number: 80, label: "Elite Transportation", icon: <Navigation className="w-6 h-6" /> },
        { number: 40, label: "Dream places", icon: <Map className="w-6 h-6" /> }
    ];

    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
    const mainControls = useAnimation();
    const [displayedHeading, setDisplayedHeading] = useState("");
    const [displayedParagraph, setDisplayedParagraph] = useState("");
    const fullHeading = "Shape Your Journey, Awaken Your Spirit";
    const fullParagraph = "At Travel To Edge, we believe every journey is a mirror - reflecting dreams you've dared, and places your heart has longed for. Whether you chase the rush of distant skies or carry your world gently into new landscapes, we walk beside you - weaving comfort, wonder, and belonging into every mile.";

    const paragraphWords = fullParagraph.split(' ');
    const [counterValues, setCounterValues] = useState(stats.map(() => 0));

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
            setDisplayedHeading(fullHeading);
            const duration = 2000;
            const interval = 20;
            const steps = duration / interval;
            let currentStep = 0;
            const animationInterval = setInterval(() => {
                currentStep++;
                const progress = currentStep / steps;
                if (currentStep >= steps) {
                    setDisplayedParagraph(fullParagraph);
                    setCounterValues(stats.map(stat => stat.number));
                    clearInterval(animationInterval);
                } else {
                    setDisplayedParagraph(paragraphWords.slice(0, Math.floor(paragraphWords.length * progress)).join(' '));
                    setCounterValues(stats.map(stat => Math.floor(stat.number * progress)));
                }
            }, interval);
        }
    }, [isInView, mainControls]);

    return (
        <div ref={sectionRef} className="max-w-[1800px] mx-auto flex items-center py-16 md:py-24 w-full px-6 md:px-10 xl:px-24">
            <div className="w-full ">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-10">

                    {/* Desktop Image */}
                    <div className="hidden lg:block relative w-full lg:w-[52%] xl:w-[55%] max-w-[860px] aspect-[3/2] rounded-3xl overflow-hidden">
                        <Image
                            src="https://res.cloudinary.com/dpc5gwlvv/image/upload/f_auto,q_auto/v1784968735/traveltoedge/new_creative.png"
                            alt="Mountain vista"
                            fill
                            sizes="(min-width: 1280px) 55vw, 52vw"
                            priority
                            className="object-contain object-center w-full h-full"
                        />
                    </div>

                    {/* Content */}
                    <motion.div
                        className="space-y-4 lg:w-[45%] xl:w-[42%] text-[#03435e]"
                        initial="hidden"
                        animate={mainControls}
                        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5 } } }}
                    >
                        <h1 className="text-xl md:text-3xl font-bold mb-6">{displayedHeading}</h1>
                        <p className="text-sm md:text-base leading-relaxed">{displayedParagraph}</p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-3 md:gap-6 mt-6">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-white p-3 md:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center space-x-4"
                                    variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } } }}
                                >
                                    <div className="p-2 bg-blue-100 rounded-lg text-[#03435e]">
                                        {stat.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-lg md:text-2xl font-bold text-[#03435e]">{counterValues[index]}+</h3>
                                        <p className="text-xs md:text-sm text-gray-400 opacity-80">{stat.label}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Button */}
                        <Link href={'/tours'}>
                            <motion.button
                                className="mt-4 px-4 py-2 md:mt-8 md:px-8 md:py-4 bg-[#03435e] text-white rounded-2xl font-semibold hover:bg-white hover:text-[#03435e] transition-transform hover:scale-105 active:scale-95"
                                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                            >
                                Start Planning Now
                            </motion.button>
                        </Link>

                    </motion.div>

                    {/* Mobile Image */}
                    {/* overflow-x-clip: the image is scaled up past this box to
                        crop the PNG's baked-in white margin, and on a full-bleed
                        container that horizontal spill becomes document-wide
                        sideways scroll. `clip` (not `hidden`) keeps the vertical
                        spill visible instead of forcing a scroll container. */}
                    <div className="lg:hidden relative w-[calc(100%+3rem)] -mx-6 overflow-x-clip sm:w-full sm:mx-0 sm:max-w-[680px] aspect-[3/2]">
                        <Image
                            src="https://res.cloudinary.com/dpc5gwlvv/image/upload/f_auto,q_auto/v1784968735/traveltoedge/new_creative.png"
                            alt="Mountain vista"
                            fill
                            sizes="(min-width: 640px) 680px, 100vw"
                            className="object-contain object-center w-full h-full scale-[1.12]"
                        />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page2;
