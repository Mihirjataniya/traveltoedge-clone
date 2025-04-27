import React from 'react'
import { InfiniteMovingCards } from "@/components/ui/InfiniteMovingCards";

const Page4 = () => {
    const testimonials = [
        {
            quote:
                "Travel to Edge turned my random vacation idea into a beautiful journey. Every destination felt like a hidden gem, and I came back with stories for a lifetime.",
            name: "Nikita Sharma",
            rating: 5,
        },
        {
            quote:
                "As someone who hates planning, this was a dream. Everything was organized—transfers, stays, local guides. I just showed up and soaked it all in.",
            name: "Karan Sethi",
            rating: 4.5,
        },
        {
            quote:
                "We booked a last-minute trip and didn’t expect much, but Travel to Edge truly overdelivered. Especially loved how they included local experiences I wouldn’t have found myself.",
            name: "Lana Rodrigues",
            rating: 4.5,
        },
        {
            quote:
                "We celebrated our anniversary in the hills, and it was unforgettable. From the scenic stay to surprise dinner setups—it felt like the trip was designed just for us.",
            name: "Dev & Aisha",
            rating: 5,
        },
        {
            quote:
                "Backpacking through the Northeast was on my bucket list, but I had no clue where to start. Travel to Edge crafted a route that felt both adventurous and safe. Absolutely recommend!",
            name: "Jay Verma",
            rating: 4.5,
        },
        {
            quote:
                "The best part? Zero stress. Everything was pre-arranged and smooth. It gave me space to actually enjoy the places rather than figuring things out on the go.",
            name: "Meenal Ghosh",
            rating: 4,
        },
        {
            quote:
                "What stood out the most was their customer support. I had a small issue with a booking, and they handled it within minutes. That kind of service is rare.",
            name: "Rohan D’Souza",
            rating: 4.5,
        },
    ];
    return (
        <div className="my-16 flex items-center w-full px-6 md:px-10 xl:px-24">
            <div className="w-full">
                <div className="mb-6">
                    <h2 className="text-xl md:text-3xl font-bold text-[#004B67]">Why Travelers Love Us</h2>
                </div>
                <div className="rounded-md px-6 flex flex-col antialiased items-center justify-center relative overflow-hidden">
                    <InfiniteMovingCards
                        items={testimonials}
                        direction="right"
                        speed="fast"
                    />
                </div>
            </div>
        </div>
    )
}

export default Page4
