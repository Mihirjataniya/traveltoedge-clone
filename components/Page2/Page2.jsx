"use client";
import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { Plane, Hotel, Map, Navigation } from "lucide-react";
import { motion, useInView, useAnimation } from "framer-motion";
import Link from 'next/link';

const Page2 = () => {
    const stats = [
        { number: 150, label: "Flight Destinations", icon: <Plane className="w-6 h-6" /> },
        { number: 250, label: "Hotels", icon: <Hotel className="w-6 h-6" /> },
        { number: 80, label: "Elite Transportation", icon: <Navigation className="w-6 h-6" /> },
        { number: 40, label: "Dream places", icon: <Map className="w-6 h-6" /> }
    ];

    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
    const mainControls = useAnimation();
    const [displayedHeading, setDisplayedHeading] = useState("");
    const [displayedParagraph, setDisplayedParagraph] = useState("");
    const fullHeading = "Plan your perfect trip";
    const fullParagraph = "Are you looking for an adventurous travel, or just carrying your work alongside you while you travel and explore new places, then your perfect trip is one with us. Travel To Edge helps you search flights & places, book your most convenient hotels/places at your comfort while we help you discover the world.";

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
        <div ref={sectionRef} className="manual-height md:max-h-[800px] flex items-center mt-14 md:mt-28 w-full">
            <div className="w-full ">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-10">

                    {/* Desktop Image */}
                    <div className="hidden lg:block relative w-[574px] aspect-[1/1] rounded-3xl overflow-hidden">
                        <Image
                            src="/Page2WebImage.png"
                            alt="Mountain vista"
                            fill
                            className="object-contain w-full h-full"
                        />
                    </div>

                    {/* Content */}
                    <motion.div
                        className="space-y-4 lg:w-1/2 text-[#03435e]"
                        initial="hidden"
                        animate={mainControls}
                        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5 } } }}
                    >
                        <h1 className="text-3xl font-bold mb-6">{displayedHeading}</h1>
                        <p className="text-md leading-relaxed">{displayedParagraph}</p>

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
                        <Link href={'/'}>
                            <motion.button
                                className="mt-4 px-4 py-2 md:mt-8 md:px-8 md:py-4 bg-[#03435e] text-white rounded-2xl font-semibold hover:bg-white hover:text-[#03435e] transition-transform hover:scale-105 active:scale-95"
                                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                            >
                                Start Planning Now
                            </motion.button>
                        </Link>

                    </motion.div>

                    {/* Mobile Image */}
                    <div className="md:hidden relative w-full max-w-[400px] aspect-[1/1] rounded-3xl overflow-hidden">
                        <Image
                            src="/Page2WebImage.png"
                            alt="Mountain vista"
                            fill
                            className="object-contain object-center w-full h-full"
                        />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page2;
