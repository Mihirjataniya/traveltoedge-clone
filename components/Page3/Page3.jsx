"use client"
import React, { useRef } from 'react'
import Image from "next/image"
import { MapPin, ArrowUpRight, MoveRight, MoveLeft } from "lucide-react"
import { motion, useInView, useAnimation } from "framer-motion"

const Page3 = () => {
    const tourPackages = [
        {
            id: 1,
            name: "Rann of Kutch",
            location: "Gujarat",
            price: "₹ 10,999",
            image: "/kutch.png ",
        },
        {
            id: 2,
            name: "Taj Mahal",
            location: "Uttar Pradesh",
            price: "₹ 7999",
            image: "/Tajmahal.jpg",
        },
        {
            id: 3,
            name: "Goa",
            location: "Goa",
            price: "₹ 8999",
            image: "/goa.jpg",
        },
        {
            id: 4,
            name: "Jaipur",
            location: "Rajasthan",
            price: "₹ 11,999",
            image: "/jaipur.jpg",
        },
        {
            id: 5,
            name: "Darjeeling",
            location: "West Bengal",
            price: "₹ 9999",
            image: "/darjiling.jpg",
        },
    ]

    const containerRef = useRef(null)

    const scroll = (direction) => {
        const container = containerRef.current
        if (container) {
            const scrollAmount = container.offsetWidth * 0.6
            container.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" })
        }
    }

    return (
        <div className="manual-height md:max-h-[800px] my-4 flex items-center w-full">
            <div className="w-full">
                <div className="mb-6">
                    <h2 className="text-3xl font-bold text-[#004B67]">Discover your Dream Destination</h2>
                </div>

                <div className="overflow-hidden">
                    <div
                        ref={containerRef}
                        className="flex gap-4 overflow-x-auto scroll-smooth px-2 no-scrollbar py-3"
                    >
                        {tourPackages.map((tour, index) => (
                            <RevealOnScroll key={tour.id} index={index}>
                                <TourCard {...tour} />
                            </RevealOnScroll>
                        ))}
                    </div>

                    <div className="hidden md:flex justify-end mt-6 gap-2">
                        <button
                            onClick={() => scroll("left")}
                            className="h-10 w-10 rounded-full cursor-pointer text-[#03435e] bg-white border border-[#03435e] flex items-center justify-center transition"
                        >
                            <MoveLeft />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="h-10 w-10 rounded-full cursor-pointer text-[#03435e] bg-white border border-[#03435e] flex items-center justify-center transition"
                        >
                            <MoveRight />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page3


// Card Wrapper with Scroll-Based Animation
function RevealOnScroll({ children, index }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "0px 200px" })
    const controls = useAnimation()

    React.useEffect(() => {
        if (isInView) {
            controls.start("visible")
        }
    }, [isInView, controls])

    return (
        <motion.div
            ref={ref}
            className="flex-shrink-0 w-[90%] sm:w-[48%] lg:w-[30%] xl:w-[20%]"
            initial="hidden"
            animate={controls}
            transition={{ duration: 1, delay: index * 0.3 }}
            variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
            }}
        >
            {children}
        </motion.div>
    )
}


function TourCard({ name, location, price, image }) {
    return (
        <div className="overflow-hidden rounded-2xl bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)] transition-all hover:shadow-[0_5px_15px_rgba(0,0,0,0.1)]">
            <div className="relative h-44 overflow-hidden rounded-t-2xl">
                <Image
                    src={image || "/placeholder.svg"}
                    alt={name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            <div className="p-5">
                <h3 className="text-xl font-bold text-[#004B67]">{name}</h3>
                <div className="flex items-center mt-1 mb-4">
                    <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-500">{location}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-[#004B67]">{price}</span>
                    <button className="w-10 h-10 rounded-full bg-[#004B67] flex items-center justify-center text-white hover:bg-[#003B57] transition-colors">
                        <ArrowUpRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    )
}
