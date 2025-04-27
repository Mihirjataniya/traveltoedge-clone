import { Send, Play } from "lucide-react"
import "./NewPage1.css"
import Link from "next/link"
import Image from "next/image"

const NewPage1 = () => {
    const text = "BEYOND DESTINATIONS, INTO DISCOVERY".split("")

    return (
        <div className="manual-height max-h-[900px] my-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">

                {/* Left Section */}
                <div className="md:col-span-8 flex flex-col gap-4">
                    {/* Hero Section */}
                    <div className="w-full hero-component h-56 sm:h-64 md:h-[400px] xl:h-[400px] rounded-4xl flex flex-col items-center justify-center gap-6 md:gap-10 fade-in-down">
                        <p className="text-white text-2xl sm:text-3xl lg:text-4xl xl:text-6xl text-shadow-md tracking-wide text-center font-bold">
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
                        <Link
                            href="/contact-us"
                            className="flex items-center justify-between gap-3 sm:gap-4 backdrop-blur-md bg-white/20 text-white border border-white/40 px-4 sm:px-6 md:px-8 rounded-2xl hover:bg-white/30 hover:border-white/60 transition-all duration-300 fade-in-up"
                        >
                            <span className="font-semibold text-xs sm:text-sm md:text-xl py-2 md:py-3">ENQUIRE NOW</span>
                            <div className="h-5 w-[1px] sm:h-6 sm:w-[2px] bg-white opacity-50"></div>
                            <Send className="h-5 w-5 sm:h-6 sm:w-6 rotate-12" />
                        </Link>
                    </div>

                    {/* Bottom Grid */}
                    <div className="hidden md:grid grid-cols-1 md:grid-cols-1 gap-4 md:gap-6">
                        {/* Video Card */}
                        {/* <div
                            className="relative w-full h-40 sm:h-48 md:h-56 rounded-3xl overflow-hidden group cursor-pointer slide-in-left fade-in-up"
                            style={{ animationDelay: "500ms" }}
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1519681393784-d120267933ba"
                                alt="Mountain vista at night"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-white/20 backdrop-blur-md rounded-full p-3 sm:p-4 shadow-lg hover:scale-110 transition-transform">
                                    <Play className="h-6 w-6 sm:h-8 sm:w-8 text-white group-hover:text-[#003B4A]" />
                                </div>
                            </div>
                        </div> */}

                        {/* Text Block */}
                        <div
                            className="bg-[#03435e] text-white p-3 sm:p-4 md:p-6 rounded-3xl h-40 sm:h-48 md:h-56 flex items-center slide-in-right fade-in-up w-full"
                            style={{ animationDelay: "600ms" }}
                        >
                            <p className="text-xs sm:text-sm lg:text-lg leading-relaxed">
                                Discover new horizons and explore the world like never before.
                                Step beyond the familiar and embark on journeys that awaken your spirit and ignite your sense of wonder. From the serene beauty of sun-kissed beaches to the majestic heights of towering mountain peaks, every destination offers a story waiting to be lived. Wander through vibrant cities, lose yourself in the charm of remote villages, and savor the diverse cultures, flavors, and experiences that make our world so extraordinary. ✈️🌍
                            </p>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-4 h-full">
                    <div
                        className="relative w-full h-96 sm:h-[500px] md:h-[640px] rounded-3xl overflow-hidden fade-in-right"
                        style={{ animationDelay: "700ms" }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-[#03435e]/60 to-[#03435e]/80"></div>

                        {/* Instagram Content */}
                        <div className="relative h-full w-full flex flex-col justify-between p-3 sm:p-4">
                            {/* Header */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="h-8 w-8 bg-white flex items-center sm:h-9 sm:w-9 rounded-full overflow-hidden">
                                        <Image
                                            src="/LOGO.png"
                                            alt="Profile"
                                            width={36}
                                            height={36}
                                            className="object-contain"
                                        />
                                    </div>
                                    <span className="text-white font-medium text-xs sm:text-sm">traveltoedge_</span>
                                </div>
                                <div className="text-white text-lg">•••</div>
                            </div>

                            {/* Reel Video/Image */}
                            <div className="relative w-full flex-1 my-4 overflow-hidden rounded-xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7"
                                    alt="Travel reel"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                                    <p className="text-white text-xs sm:text-sm">
                                        Experience the magic of sunrise over the mountains. #travel #adventure
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default NewPage1

// Separate small icons (for clarity)
const HeartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
)

const CommentIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
)

const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
    </svg>
)
