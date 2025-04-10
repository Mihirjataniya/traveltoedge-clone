'use client'
import SearchableDropdown from "@/components/ui/SearchableDropDown";
import { useState } from "react";
import data from "@/data/globe.json";
import Globe from "@/components/ui/DynamicGLobe";
import GlobeDemo from "@/components/ui/DynamicGLobe";

export default function TravelForm() {
    const [selectedDestination, setSelectedDestination] = useState("");
    const [showOtherInput, setShowOtherInput] = useState(false);
    const [otherLocation, setOtherLocation] = useState("");

    const destinations = [
        "Manali - Kasol", "Triund", "Serene Chopta", "Jibhi - Jalori", "Kheerganga Trek",
        "Spiti Valley", "Manali-Jispa", "Bali", "Hampta Pass", "Valley of Flowers", "Pin Parvati",
        "Kasol Grahan", "Sar Pass", "Bhrigu Lake", "Ladhak", "Meghalaya", "Bhutan", "Vietnam",
        "Dubai", "Thailand", "Other"
    ];


    return (
        <div className="w-full manual-height md:max-h-[800px] flex flex-col items-center justify-center md:flex-row mt-16 md:mt-24 xl:gap-4">
            {/* Left Side Placeholder */}
            <div className="w-full hidden md:w-1/2 h-[600px] md:flex items-center justify-center ">
                <div className="relative w-full h-full">
                    <GlobeDemo />
                </div>
            </div>

            {/* Right Side Form */}
            <div className="lg:w-1/2 w-full p-4">
                <h2 className="text-2xl font-bold text-[#03435e] mb-6">Your Dream Trip Starts Here</h2>
                <form className="space-y-9">
                    <div className="flex flex-col gap-2">
                        <label className="block text-[#03435e] font-semibold mb-1 italic">Name</label>
                        <input
                            type="text"
                            className="w-full bg-white text-[#03435e] border-0 border-b-2 border-[#03435e] focus:outline-none focus:ring-0 focus:border-[#03435e] placeholder:text-gray-300 italic"
                            placeholder="Jhon Doe"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="block text-[#03435e] font-semibold mb-1 italic">Phone</label>
                            <input
                                type="tel"
                                className="w-full bg-white text-[#03435e] border-0 border-b-2 border-[#03435e] focus:outline-none focus:ring-0 focus:border-[#03435e] placeholder:text-gray-300 italic"
                                placeholder="+911234567890"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="block text-[#03435e] font-semibold mb-1 italic">Email</label>
                            <input
                                type="email"
                                className="w-full bg-white text-[#03435e] border-0 border-b-2 border-[#03435e] focus:outline-none focus:ring-0 focus:border-[#03435e] placeholder:text-gray-300 italic"
                                placeholder="jhondoe@gmail.com"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="block text-[#03435e] font-semibold mb-1 italic">Travel Destination</label>
                        <SearchableDropdown
                            value={selectedDestination}
                            onChange={(value) => {
                                setSelectedDestination(value);
                                setShowOtherInput(value === "Other");
                            }}
                            options={destinations}
                        />
                    </div>


                    {showOtherInput && (
                        <div className="flex flex-col gap-2">
                            <label className="block text-[#03435e] font-semibold mb-1 italic">Enter Destination</label>
                            <input
                                type="text"
                                value={otherLocation}
                                onChange={(e) => setOtherLocation(e.target.value)}
                                className="w-full bg-white text-[#03435e] border-0 border-b-2 border-[#03435e] focus:outline-none focus:ring-0 focus:border-[#03435e] placeholder:text-gray-300 italic"
                                placeholder="Your travel destination"
                            />
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="block text-[#03435e] font-semibold mb-1 italic">Travel Date</label>
                            <input
                                type="date"
                                className="w-full bg-white text-[#03435e] border-0 border-b-2 border-[#03435e] focus:outline-none focus:ring-0 focus:border-[#03435e] placeholder:text-gray-300 italic"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="block text-[#03435e] font-semibold mb-1 italic">No. of Travellers</label>
                            <input
                                type="number"
                                className="w-full bg-white text-[#03435e] border-0 border-b-2 border-[#03435e] focus:outline-none focus:ring-0 focus:border-[#03435e] placeholder:text-gray-300 italic"
                                placeholder="5"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        onSubmit={(e) => {
                            e.preventDefault()
                        }}
                        className="w-full mt-6 bg-[#03435e] text-white py-2 px-4 rounded hover:bg-[#022c3f] transition"
                    >
                        Submit
                    </button>
                </form>
            </div>

            <div className="flex md:w-1/2 w-full md:hidden items-center justify-center ">
                <GlobeDemo />
            </div>
        </div>
    );
}
