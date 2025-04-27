"use client"
import React, { useEffect, useRef, useState } from 'react'
import Image from "next/image"
import { MapPin, ArrowUpRight, MoveRight, MoveLeft } from "lucide-react"
import { motion, useInView, useAnimation } from "framer-motion"
import Link from 'next/link'
import axios from 'axios'

const Page3 = () => {
    const [tourPackages, setTourPackages] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    // Fetch tour packages from the API
    useEffect(() => {
        const fetchTourPackages = async () => {
            try {
                setIsLoading(true)
                const response = await axios.get('/api/get-tours?isTopTour=true')
                setTourPackages(response.data.tours)
                setIsLoading(false)
            } catch (err) {
                console.error('Error fetching tour packages:', err)
                setError('Failed to load tour packages')
                setIsLoading(false)
            }
        }

        fetchTourPackages()
    }, [])

    const containerRef = useRef(null)

    const scroll = (direction) => {
        const container = containerRef.current
        if (container) {
            const scrollAmount = container.offsetWidth * 0.6
            container.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" })
        }
    }

    // Show loading state
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 md:px-10 xl:px-24">
                {[1, 2, 3].map((item) => (
                    <div key={item} className="bg-white rounded-xl overflow-hidden shadow-lg h-[400px] animate-pulse">
                        <div className="h-48 bg-gray-200"></div>
                        <div className="p-5 space-y-3">
                            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            <div className="h-10 bg-gray-200 rounded w-full mt-6"></div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="my-16 flex items-center w-full px-6 md:px-10 xl:px-24">
            <div className="w-full">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl md:text-3xl font-bold text-[#004B67]">Discover your Dream Destination</h2>
                    <Link className='bg-[#03435E] text-white text-nowrap px-3 md:px-6 py-2 rounded-xl' href={'/tours'}>See all</Link>
                </div>

                <div className="overflow-hidden">
                    <div
                        ref={containerRef}
                        className="flex gap-4 items-stretch overflow-x-auto scroll-smooth px-2 no-scrollbar py-3"
                    >
                        {tourPackages.length > 0 ? (
                            tourPackages.map((tour, index) => (
                                <RevealOnScroll key={tour._id} index={index}>
                                    <TourCard
                                        id={tour._id}
                                        name={tour.title}
                                        location={tour.location}
                                        price={`₹ ${tour.price.toLocaleString()}`}
                                        image={tour.image}
                                        itinerary={tour.itinerary}
                                    />
                                </RevealOnScroll>
                            ))
                        ) : (
                            <div className="w-full text-center py-8 text-gray-500">No tour packages available</div>
                        )}
                    </div>

                    {tourPackages.length > 3 && (
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
                    )}
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
            className="flex-shrink-0 w-64 sm:w-64 md:w-72 lg:w-80"
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

function TourCard({ id, name, location, price, image, itinerary }) {
    return (

        <div className="overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-lg transition-all h-full flex flex-col">
            <div className="relative h-44 w-full overflow-hidden">
                <Image
                    src={image || "/placeholder.svg"}
                    alt={name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-[#004B67] line-clamp-1">{name}</h3>
                <div className="flex items-center mt-1 mb-4">
                    <MapPin className="w-4 h-4 text-gray-400 mr-1 flex-shrink-0" />
                    <span className="text-sm text-gray-500 line-clamp-1">{location}</span>
                </div>
                <div className="flex items-center justify-between mt-auto">
                    <span className="text-lg font-bold text-[#004B67]">{price}</span>
                    <a target='_blank' href={itinerary} className="w-10 h-10 rounded-full bg-[#004B67] flex items-center justify-center text-white hover:bg-[#003B57] transition-colors flex-shrink-0">
                        <ArrowUpRight className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </div>

    )
}