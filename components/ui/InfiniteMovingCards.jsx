"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Star, StarHalf, Star as StarEmpty } from "lucide-react";
import { motion, useInView } from "framer-motion";

export const InfiniteMovingCards = ({
    items,
    direction = "left",
    speed = "fast",
    pauseOnHover = true,
    className
}) => {
    const containerRef = useRef(null);
    const scrollerRef = useRef(null);
    const [start, setStart] = useState(false);

    // 👇 this is for the in-view animation trigger
    const inViewRef = useRef(null);
    const isInView = useInView(inViewRef, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) addAnimation();
    }, [isInView]);

    function addAnimation() {
        if (containerRef.current && scrollerRef.current) {
            const scrollerContent = Array.from(scrollerRef.current.children);
            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                scrollerRef.current.appendChild(duplicatedItem);
            });
            getDirection();
            getSpeed();
            setStart(true);
        }
    }

    const getDirection = () => {
        if (containerRef.current) {
            containerRef.current.style.setProperty(
                "--animation-direction",
                direction === "left" ? "forwards" : "reverse"
            );
        }
    };

    const getSpeed = () => {
        if (containerRef.current) {
            const duration =
                speed === "fast" ? "30s" : speed === "normal" ? "40s" : "80s";
            containerRef.current.style.setProperty("--animation-duration", duration);
        }
    };

    return (
        <motion.div
            ref={(el) => {
                inViewRef.current = el;
                containerRef.current = el;
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
            className={cn(
                "scroller relative z-20 max-w-[1300px] overflow-hidden",
                className
            )}
        >
            <ul
                ref={scrollerRef}
                className={cn(
                    "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
                    start && "animate-scroll",
                    pauseOnHover && "hover:[animation-play-state:paused]"
                )}
            >
                {items.map((item) => (
                    <div key={item.name} className="p-[2px] h-48 md:h-64 rounded-2xl bg-gradient-to-r from-[#03435e] to-[#3c7a89]">
                        <li
                            className="relative w-[350px] h-full max-w-full shrink-0 rounded-2xl border border-b-0 border-zinc-200 bg-white px-4 md:px-8 py-6 md:w-[450px]"
                            key={item.name}
                        >
                            <blockquote>
                                <div
                                    aria-hidden="true"
                                    className="user-select-none pointer-events-none absolute -top-0.5 -left-0.5 -z-1 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
                                ></div>
                                <span className="relative z-20 text-xs md:text-sm leading-[1.6] font-normal text-[#03435E]">
                                    {item.quote}
                                </span>
                                <div className=" absolute bottom-5  w-full z-20 flex flex-row items-center">
                                    <span className="flex flex-col gap-1">
                                        <span className="text-xs md:text-sm leading-[1.6] font-normal text-[#03435E]">
                                            {item.name}
                                        </span>
                                        <StarRating rating={item.rating} />
                                    </span>
                                </div>
                            </blockquote>
                        </li>
                    </div>
                ))}
            </ul>
        </motion.div>
    );
};

const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
        <div className="flex items-center gap-[1px]">
            {[...Array(fullStars)].map((_, i) => (
                <Star key={`full-${i}`} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            ))}
            {halfStar && (
                <StarHalf className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            )}
            {[...Array(emptyStars)].map((_, i) => (
                <StarEmpty key={`empty-${i}`} className="w-4 h-4 text-yellow-300" />
            ))}
        </div>
    );
};
