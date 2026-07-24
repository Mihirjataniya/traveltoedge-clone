import React from 'react'
import "./AboutUs.css";
import Image from 'next/image';
const page = () => {
    return (
        <div className='w-full min-h-screen mt-24 px-6 md:px-10 xl:px-24'>
            {/* Section 1: Mission + Vision and Image */}
            <div className="flex flex-col md:flex-row items-center gap-12 my-6 animate-slide-in-left ">
                <div className="md:w-1/2 space-y-6">
                    <h2 className="text-3xl font-bold text-[#03435e]">Our Mission</h2>
                    <p className="text-[#03435e] leading-6.5">
                        We aim to go beyond sightseeing - where comfort and thrill are constant, and every moment feels personal. Seamless travel about the unexplored spots or already acquainted places, and you return with stories that stay with you for good.

                    </p>
                    <h2 className="text-3xl font-bold text-[#03435e] mt-6">Our Vision</h2>
                    <p className="text-[#03435e] leading-6.5">
                        To redefine travel as a discovery - where every path offers comfort, healing, and a deeper connection to the self and the world.
                        We envision travel as a gateway to wonder and innate peace.
                    </p>
                </div>
                <div className="md:w-1/2 w-full">
                    <div className="relative w-full h-[300px] overflow-hidden rounded-2xl shadow-lg">
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
                    <div className="relative w-full h-[520px] overflow-hidden rounded-2xl shadow-lg">
                        <Image
                            src="https://images.unsplash.com/photo-1454663501801-75a30ab23c6a?q=80&w=2081&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="About Us"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
                <div className="md:w-1/2 space-y-6">
                    <h2 className="text-3xl font-bold text-[#03435e]">Our Story</h2>
                    <p className="text-[#03435e] leading-7.5">
                        Travel To Edge was born on a mountain, in the middle of a storm.
                        Two boys, caught in a blizzard at high altitude, found themselves stranded with no support, no rescue, and no response. The company they registered with, had passed the buck to a smaller agency and both disappeared with zero response and rescue when their life was at stake.        <br />
                        That
                        moment of silence - cold, harsh, and unforgettable - ignited within them - an idea and a grit to be able to have the back of travellers.
                        And they call it 'Travel To Edge'. If they were ever going to be part of someone’s journey, it would be done right. Safety first. People first. Always.
                        <br />
                        What began with assisting friends plan honest, heart-led trips, grew into a travel company with passion at its core and your experience as its purpose.
                        <br />
                        Since then, we’ve helped thousands level up their travel game - with trips that are personal, playful, and packed with stories you’ll actually want to tell.
                        <br />
                        Solo trip? Family break? Honeymoon you’ll tell your grandkids about?
                        <br />
                        Your mood, our command.
                        At Travel To Edge, your journey isn’t just another booking - it’s our whole purpose.

                    </p>
                </div>
            </div>

            {/* Section 3: Text left, Image right */}
            <div className="flex flex-col md:flex-row items-center mt-12 md:gap-12 my-6 animate-slide-in-left">
                <div className="md:w-1/2 space-y-6">
                    <h2 className="text-3xl font-bold text-[#03435e]">Why Travel With Us?</h2>
                    <ul className="list-disc list-inside text-[#03435e] leading-7.5 space-y-2">
                        <li>Made For You Itineraries
                            No copy-paste plans here. Every journey is handcrafted to match your mood, pace, and travel dreams - because no two explorers are the same.
                        </li>
                        <li>We bring world-class travel know-how and blend it with authentic local insights to craft journeys that feel both seamless and soulful. For you deserve the best.
                        </li>
                        <li>Whether it’s a sudden plan change, a delayed flight, or a midnight food hunt - we’re with you, every step of the way.
                        </li>
                        <li>We handpick trusted partners, verified stays, and safe routes - so you can travel with peace of mind, no matter where you go.
                        </li>
                        <li>We know food is half the joy - so we guide you to hygienic, delicious spots that match your comfort, curiosity, and dietary needs.
                        </li>
        
                    </ul>
                </div>
                <div className="md:w-1/2 w-full">
                    {/* <div className="relative w-full h-[400px] overflow-hidden rounded-2xl shadow-lg">
                        <Image
                            src="https://images.unsplash.com/photo-1639435539606-8de0233f6dda?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="About Us"
                            fill
                            className="object-cover"
                        />
                    </div> */}
                    <ul className='list-disc list-inside text-[#03435e] leading-7.5 space-y-2'>
                    <li>From sanitized stays to hygienic transfers, we’re obsessed with cleanliness - because comfort begins with care.
                        .</li>
                        <li>Travelling with kids ? We plan with them in mind - smooth schedules, child-safe stays, fun detours, and zero stress.
                        .</li>
                        <li>Need travel insurance, emergency info, or access to local healthcare? We've got your back - with resources and contacts, just in case.
                        </li>
                        <li>No fine print. No last-minute add-ons. Just honest rates and full-on experiences.
                        </li>
                        <li>Flights, hotels, visas, insurance, transfers - we handle it all. You just show up and soak it in.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default page

