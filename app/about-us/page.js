import React from 'react'
import "./AboutUs.css";
import Image from 'next/image';
const page = () => {
    return (
        <div className='w-full min-h-screen mt-24'>
            {/* Section 1: Mission + Vision and Image */}
            <div className="flex flex-col md:flex-row items-center gap-12 my-6 animate-slide-in-left ">
                <div className="md:w-1/2 space-y-6">
                    <h2 className="text-3xl font-bold text-[#03435e]">Our Mission</h2>
                    <p className="text-[#03435e] leading-6.5">
                        At Travel To Edge, our mission is to craft personalized and meaningful travel experiences that inspire every explorer. We aim to make travel accessible, stress-free, and full of discovery, so our clients can focus on creating beautiful memories while we handle every detail with care and expertise.
                    </p>
                    <h2 className="text-3xl font-bold text-[#03435e] mt-6">Our Vision</h2>
                    <p className="text-[#03435e] leading-6.5">
                        Our vision is to become a globally recognized and trusted travel partner that redefines the way people explore the world. We strive t   o offer unforgettable journeys that are rooted in authenticity, comfort, and thoughtful planning. Through innovation, integrity, and a passion for travel, we want to connect people to new cultures, experiences, and moments that leave a lasting impact.
                    </p>
                </div>
                <div className="md:w-1/2 w-full">
                    <div className="relative w-full h-[400px] overflow-hidden rounded-2xl shadow-lg">
                        <Image
                            src="https://images.unsplash.com/photo-1593285942976-70dbd769a590?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="About Us"
                            fill
                            className="object-cover"
                        />
                    </div>

                </div>
            </div>

            {/* Section 2: Image left, Story right */}
            <div className="flex flex-col-reverse md:flex-row items-center gap-12 my-6 animate-slide-in-right">
                <div className="md:w-1/2 w-full">
                    <div className="relative w-full h-[400px] overflow-hidden rounded-2xl shadow-lg">
                        <Image
                            src="https://images.unsplash.com/photo-1600208537475-6cdbf234ca5d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="About Us"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
                <div className="md:w-1/2 space-y-6">
                    <h2 className="text-3xl font-bold text-[#03435e]">Our Story</h2>
                    <p className="text-[#03435e] leading-6.5">
                        Travel To Edge began as a dream shared by a close-knit group of passionate adventure-seekers who craved more from travel than just cookie-cutter itineraries and tourist checklists. We believed that travel should be something deeply personal — a way to connect with new cultures, chase unforgettable moments, and find joy in the unexpected. What started as casual trip planning for friends quickly evolved into something bigger: a trusted travel agency built on passion, creativity, and care. Over the years, we’ve helped thousands of travelers move beyond the ordinary, crafting journeys that reflect their unique dreams, needs, and personalities. Whether it’s a solo escape, a family vacation, or a once-in-a-lifetime honeymoon, our goal remains the same — to make every trip feel effortless, inspiring, and truly unforgettable. Because at Travel To Edge, your journey is our purpose.
                    </p>
                </div>
            </div>

            {/* Section 3: Text left, Image right */}
            <div className="flex flex-col    md:flex-row items-center gap-12 my-6 animate-slide-in-left">
                <div className="md:w-1/2 space-y-6">
                    <h2 className="text-3xl font-bold text-[#03435e]">Why Travel With Us?</h2>
                    <ul className="list-disc list-inside text-[#03435e] leading-6.5 space-y-2">
                        <li>🎯 Customized Travel Plans – Every journey we create is unique, built around your goals, preferences, and travel style.</li>
                        <li>🌍 Local & Global Expertise – Our team blends insider local knowledge with global experience to craft truly authentic trips</li>
                        <li>📞 24/7 Assistance – We stay connected with you from start to finish, offering real-time help and peace of mind while you travel</li>
                        <li>🌄 Diverse Destinations – From iconic landmarks to hidden gems, we help you explore both popular spots and lesser-known treasures</li>
                        <li>💵 Honest Pricing – No hidden charges or surprises — just fair, transparent prices with full value in return.
                        </li>
                        <li>🧭 End-to-End Travel Solutions – We handle everything from flights and stays to visas and insurance, so you can travel worry-free.</li>
                    </ul>
                </div>
                <div className="md:w-1/2 w-full">
                    <div className="relative w-full h-[400px] overflow-hidden rounded-2xl shadow-lg">
                        <Image
                            src="https://images.unsplash.com/photo-1639435539606-8de0233f6dda?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="About Us"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page

